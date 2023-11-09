import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, of, Subject, tap} from "rxjs";
import {AccessionMap, AccessionMapQuery} from "./accession-map";
import {Sample, SampleQuery} from "./sample";
import {MSData, MSDataQuery} from "./msdata";
import {Modelling, ModelParameters, ModelParametersQuery} from "./modelling-data";
import {ToastService} from "./toast.service";
import {DataFrame, IDataFrame} from "data-forge";
import {Settings} from "./settings";
import {SequenceCoverage} from "./sequence-coverage";

@Injectable({
  providedIn: 'root'
})
export class WebService {
  settings: Settings = new Settings()
  baseUrl = "http://localhost:8000"

  redrawSubject: Subject<boolean> = new Subject<boolean>()
  modelParameters: ModelParameters[] = []
  selectionSubject: Subject<boolean> = new Subject<boolean>()
  restoreSubject: Subject<boolean> = new Subject<boolean>()
  filteredDF: IDataFrame<number, MSData> = new DataFrame()

  constructor(private http: HttpClient, private toastService: ToastService) { }

  searchProtein(proteinGroup: string, distinct: boolean = true) {
    if (proteinGroup === "") {
      return of([])
    }

    const params: any =  {Protein_Group: proteinGroup}
    if (distinct) {
      params["distinct"] = "Protein_Group"
    }

    return this.http.get<AccessionMapQuery>(`${this.baseUrl}/api/accessionmap/get_distinct/`, {params:params}).pipe(
      map((data: AccessionMapQuery) => {return data.results.map((d: AccessionMap) => d.Protein_Group)})
    )
  }

  typeAheadSearchTerm(term: string, searchType: string="Protein_Group", distinct: boolean = true) {
    if (term === "") {
      return of([])
    }
    let params: any = {}

    if (searchType === "Protein_Group") {
      params =  {Protein_Group: term}
      if (distinct) {
        params["distinct"] = "Protein_Group"
      }
    } else if (searchType === "Genes") {
      params =  {Genes: term}
      if (distinct) {
        params["distinct"] = "Genes"
      }
    } else {
      return of([])
    }
    return this.http.get<string[]>(`${this.baseUrl}/api/accessionmap/get_distinct/`, {params:params})
  }

  getSampleMetadata() {
    return this.http.get<SampleQuery>(`${this.baseUrl}/api/samplegroupmetadata/`, {responseType: 'json', observe: 'body', params: {page_size: "60"}}).pipe(
      map((data: SampleQuery) => {return data.results})
    )
  }

  getMSData(proteinGroup: string) {
    this.toastService.show("Loading", "Loading MS data of " + proteinGroup)
    return this.http.get<MSData[]>(`${this.baseUrl}/api/turnoverdata/get_all_from_queryset/`, {responseType: 'json', observe: 'body', params: {Protein_Group: proteinGroup}}).pipe(tap((data: MSData[]) => {
      this.toastService.show("Success", "Successfully retrieved MS data of " + proteinGroup)
    }),
      map((data: MSData[]) => {return data})
    )
  }

  postModellingData(tissue: string, engine: string, tau_POI: number, tau_POI_upper_bound: number, tau_POI_lower_bound: number, data: number[]|undefined = []) {
    return this.http.post<any>(`${this.baseUrl}/api/modelling/`, {Tissue: tissue, Engine: engine, Data: data, tau_POI: tau_POI, tau_POI_upper_bound: tau_POI_upper_bound, tau_POI_lower_bound: tau_POI_lower_bound}, {responseType: 'json', observe: 'body'})
  }

  postModellingDataMass(ids: number[], data: number[]|undefined = []) {
    return this.http.post<Modelling[]>(`${this.baseUrl}/api/turnoverdata/get_modelling_data/`, {Data: data, ids: ids}, {responseType: 'json', observe: 'body'})
  }

  getAllModelParameters() {
    return this.http.get<ModelParametersQuery>(`${this.baseUrl}/api/modelparameters/`, {responseType: 'json', observe: 'body', params: {page_size: 100000}}).pipe(
      map((data: ModelParametersQuery) => {return data.results})
    )
  }

  selectionHandler(ids: number[]) {
    const idsAdd = ids.filter((id) => {
      return !this.settings.selectedMSDataID.includes(id)
    })
    if (idsAdd.length > 0) {
      this.settings.selectedMSDataID.push(...idsAdd)
    }
    // const idsRemove = ids.filter((id) => {
    //   return this.selectedMSDataID.includes(id)
    // })
    //
    // if (idsRemove.length > 0) {
    //   this.selectedMSDataID = this.selectedMSDataID.filter((id) => {
    //     return !idsRemove.includes(id)
    //   })
    // }
    // if (idsAdd.length > 0 || idsRemove.length > 0) {
    //
    // }
    this.selectionSubject.next(true)
    this.redrawSubject.next(true)
  }

  setOperationColor(precursorID: string, color: string = "") {
    if (color === "") {
      if (!(precursorID in this.settings.colorMap)) {
        this.settings.colorMap[precursorID] = this.settings.defaultColorList[this.settings.currentColorPosition]
        this.settings.currentColorPosition += 1
        if (this.settings.currentColorPosition >= this.settings.defaultColorList.length) {
          this.settings.currentColorPosition = 0
        }
      }
    } else {
      this.settings.colorMap[precursorID] = color
    }
  }

  removeSearchOperation(operation: string) {
    this.settings.searchOperations = this.settings.searchOperations.filter((op) => {
      return op !== operation
    })
    delete this.settings.colorMap[operation]
    for (const i in this.settings.searchMap) {
      this.settings.searchMap[i] = this.settings.searchMap[i].filter((op: string) => {
        return op !== operation
      })
      if (this.settings.searchMap[i].length === 0) {
        delete this.settings.searchMap[i]
        this.settings.selectedMSDataID = this.settings.selectedMSDataID.filter((id: number) => {
          return id !== parseInt(i)
        })
      }
    }
  }

  mergeSearchOperations(operations: string[], color: string="", newOperationName: string = "", removeOld: boolean = true) {
    if (operations.length > 1) {
      if (newOperationName === "") {
        newOperationName = operations.join("_")
      }
      this.settings.searchOperations.push(newOperationName)
      for (const i in this.settings.searchMap) {
        let found = false
        for (const j of operations) {
            if (this.settings.searchMap[i].includes(j)) {
              found = true
              break
            }
        }
        if (found) {
            if (removeOld) {
                this.settings.searchMap[i] = this.settings.searchMap[i].filter((op: string) => {
                return !operations.includes(op)
                })
            }
            this.settings.searchMap[i].push(newOperationName)
        }
      }
      this.setOperationColor(newOperationName, color)
    }
    if (removeOld) {
      for (const i of operations) {
        delete this.settings.colorMap[i]
      }
    }
  }

  getCoverageData(proteinGroup: string, valid_tau: boolean = true) {
    return this.http.get<SequenceCoverage>(`${this.baseUrl}/api/proteinsequence/get_coverage/`, {responseType: 'json', observe: 'body', params: {AccessionID: proteinGroup, valid_tau: valid_tau}}).pipe()
  }

  getExactAccFromGene(gene: string) {
    return this.http.get<string[]>(`${this.baseUrl}/api/accessionmap/get_exact_accession_id_from_genes/`, {responseType: 'json', observe: 'body', params: {genes: gene}})
  }
}
