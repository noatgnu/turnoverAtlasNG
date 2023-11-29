import {Component, Input} from '@angular/core';
import {WebService} from "../web.service";
import {DataFrame, IDataFrame, ISeries, Series} from "data-forge";
import {MSData} from "../msdata";
import {FormBuilder} from "@angular/forms";
import {Modelling} from "../modelling-data";
import {ToastService} from "../toast.service";
import {SequenceCoverage} from "../sequence-coverage";
import {AccountsService} from "../accounts.service";
import {HttpEventType} from "@angular/common/http";
import {Settings} from "../settings";
import {Router} from "@angular/router";

@Component({
  selector: 'app-protein-view',
  templateUrl: './protein-view.component.html',
  styleUrls: ['./protein-view.component.scss']
})
export class ProteinViewComponent {
  protein: string = ""
  df: IDataFrame<number, MSData> = new DataFrame()

  private _filteredDF: IDataFrame<number, MSData> = new DataFrame()

  set filteredData(value: IDataFrame<number, MSData>) {
    this._filteredDF = value
  }

  get filteredData(): IDataFrame<number, MSData> {
    return this._filteredDF
  }

  msDataProgress: number = 0
  downloading: boolean = false
  modellingData: IDataFrame<number, Modelling> = new DataFrame()
  //modellingDataGroup: ISeries<number, IDataFrame<number, Modelling>> = new Series()
  modellingDataGroup: ISeries<number, IDataFrame<number, MSData>> = new Series()
  coverageData: SequenceCoverage|undefined = undefined

  activeId: number = 1
  filterDFMap: {[key: string]: IDataFrame<number, MSData>} = {}

  ready: boolean = false
  @Input() set proteinGroup(value: string) {
    this.initialize(value).then(() => {
      this.web.getMSData(this.protein).subscribe((data) => {
        this.msDataProgress = 0
        if (data.type === HttpEventType.DownloadProgress) {

          this.downloading = true
          if (data.total) {
            this.msDataProgress = Math.round(100 * data.loaded / data.total)
          } else {
            // convert to megabytes
            this.msDataProgress = Math.round(data.loaded / 1048576)
          }

        } else if (data.type === HttpEventType.Response) {
          this.web.settings.currentProteinGroup = this.protein
          this.toastService.show("TAU Data retrieval", "Data retrieved successfully")
          this.downloading = false
          if (data.body) {
            this.accounts.addHistory(this.protein)
            this.df = new DataFrame(data.body)
          }
        }
      })
      for (const i of value.split(",")) {

        this.web.getCoverageData(i, false).subscribe((data) => {
          this.coverageData = data
          console.log(data)
        })
      }
    })
  }



  page: number = 1

  constructor(public web: WebService, private fb: FormBuilder, private toastService: ToastService, private accounts: AccountsService, private route: Router) {

  }

  handlerFilterDFUpdate(value: IDataFrame<number, MSData>) {
    this.ready = false
    this.filteredData = value

    const ids: number[] = value.getSeries("id").bake().toArray()
    const days: number[] = []
    for (const s of this.web.settings.selectedSamples) {
      if (!days.includes(this.web.settings.sampleMap[s].Days)) {
        days.push(this.web.settings.sampleMap[s].Days)
      }
    }

    if (days.length > 0 && ids.length > 0) {

      this.toastService.show("Data formating", "Grouping data by tissue")
      const nonNull = this.filteredData.where((row) => {
        return row.tau_model !== null
      }).bake()
      this.modellingDataGroup = nonNull.groupBy((row) => {
        return row.Tissue
      }).bake()
      this.web.settings.minimumHalfLife = nonNull.getSeries("HalfLife_POI").min()
      this.web.settings.maximumHalfLife = nonNull.getSeries("HalfLife_POI").max()
      // this.web.postModellingDataMass(ids, days).subscribe((data) => {
      //   this.modellingData = new DataFrame(data)
      //   this.modellingDataGroup = this.modellingData.groupBy((row) => {
      //     return row.Tissue
      //   }).bake()
      //   console.log(this.modellingData)
      // })
    }
    if (this.web.settings.filters.length > 0) {
      for (const filter of this.web.settings.filters) {
        this.filterDFMap[filter.id] = this.updateFilterDFMap(filter)
      }
    }

    this.ready = true
  }

  async initialize(value: any) {
    const data = value.split("&")
    this.protein = data[0]
    if (data.length === 2) {
      const settings = await this.web.getSettingsByID(parseInt(data[1])).toPromise()
      this.web.settings.import(settings.details)
      this.toastService.show("Session load", "Session loaded successfully")
    }
  }

  handleSubFilter(filter: any) {
    let f = JSON.parse(JSON.stringify(filter))
    f = this.web.settings.addFilter(f)
    this.filterDFMap[f.id] = this.updateFilterDFMap(f)
  }

  updateFilterDFMap(filter: any) {
    let filterDF = this.filteredData.where((row) => {
      return row.Tissue !== null
    })
    if (filter.tissues.length > 0) {
      filterDF = filterDF.where((row) => {
        return filter.tissues.includes(row.Tissue)
      })
    }
    if (filter.engines.length > 0) {
      filterDF = filterDF.where((row:MSData) => {
        return filter.engines.includes(row.Engine)
      })
    }
    if (filter.sequences.length >0) {
      filterDF = filterDF.where((row:MSData) => {
        return filter.sequences.includes(row.Stripped_Sequence)
      })
    }
    filterDF = filterDF.bake()
    return filterDF
  }

  removeFilter(id: string) {
    this.ready = false
    // reorganize the filter index
    this.web.settings.removeFilter(id)
    delete this.filterDFMap[id]
    this.ready = true
    console.log(this.web.settings.filters)
    console.log(this.filterDFMap)
  }

}
