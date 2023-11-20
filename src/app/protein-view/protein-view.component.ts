import { Component, Input } from '@angular/core';
import {WebService} from "../web.service";
import {DataFrame, IDataFrame, ISeries, Series} from "data-forge";
import {MSData, MSDataValues} from "../msdata";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Modelling} from "../modelling-data";
import {ToastService} from "../toast.service";
import {SequenceCoverage} from "../sequence-coverage";
import {AccountsService} from "../accounts.service";

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

  modellingData: IDataFrame<number, Modelling> = new DataFrame()
  //modellingDataGroup: ISeries<number, IDataFrame<number, Modelling>> = new Series()
  modellingDataGroup: ISeries<number, IDataFrame<number, MSData>> = new Series()
  coverageData: SequenceCoverage|undefined = undefined
  @Input() set proteinGroup(value: string) {
    this.protein = value
    this.web.getMSData(this.protein).subscribe((data) => {
      this.accounts.addHistory(this.protein)
      this.df = new DataFrame(data)
      console.log(this.df)
    })
    for (const i of value.split(",")) {

      this.web.getCoverageData(i).subscribe((data) => {
        this.coverageData = data
      })
    }
  }



  page: number = 1

  constructor(public web: WebService, private fb: FormBuilder, private toastService: ToastService, private accounts: AccountsService) {

  }

  handlerFilterDFUpdate(value: IDataFrame<number, MSData>) {
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
      this.modellingDataGroup = this.filteredData.where((row) => {
        return row.tau_model !== null
      }).groupBy((row) => {
        return row.Tissue
      }).bake()

      // this.web.postModellingDataMass(ids, days).subscribe((data) => {
      //   this.modellingData = new DataFrame(data)
      //   this.modellingDataGroup = this.modellingData.groupBy((row) => {
      //     return row.Tissue
      //   }).bake()
      //   console.log(this.modellingData)
      // })
    }

  }
}
