import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, of, Subject, tap} from "rxjs";
import {AccessionMap, AccessionMapQuery} from "./accession-map";
import {Sample, SampleQuery} from "./sample";
import {MSData, MSDataQuery} from "./msdata";
import {Modelling, ModelParameters, ModelParametersQuery} from "./modelling-data";
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class WebService {
  selectedMSDataID: number[] = []
  sampleMap: {[key: string]: Sample} = {}
  baseUrl = "http://localhost:8000"
  selectedSamples: string[] = []
  defaultColorList: string[] = [
    "#fd7f6f",
    "#7eb0d5",
    "#b2e061",
    "#bd7ebe",
    "#ffb55a",
    "#ffee65",
    "#beb9db",
    "#fdcce5",
    "#8bd3c7",
  ]
  currentColorPosition: number = 0



  colorMap: any = {}

  redrawSubject: Subject<boolean> = new Subject<boolean>()
  modelParameters: ModelParameters[] = []
  selectionSubject: Subject<boolean> = new Subject<boolean>()

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
      return !this.selectedMSDataID.includes(id)
    })
    const idsRemove = ids.filter((id) => {
      return this.selectedMSDataID.includes(id)
    })
    if (idsAdd.length > 0) {
      this.selectedMSDataID.push(...idsAdd)
    }
    if (idsRemove.length > 0) {
      this.selectedMSDataID = this.selectedMSDataID.filter((id) => {
        return !idsRemove.includes(id)
      })
    }
    if (idsAdd.length > 0 || idsRemove.length > 0) {
      this.selectionSubject.next(true)
      this.redrawSubject.next(true)
    }
  }

  setPrecurorIDColor(precursorID: string, color: string = "") {
    if (color === "") {
      if (!(precursorID in this.colorMap)) {
        this.colorMap[precursorID] = this.defaultColorList[this.currentColorPosition]
        this.currentColorPosition += 1
        if (this.currentColorPosition >= this.defaultColorList.length) {
          this.currentColorPosition = 0
        }
      }
    } else {
      this.colorMap[precursorID] = color
    }
  }
}
