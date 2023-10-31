import { Component, Input } from '@angular/core';
import {WebService} from "../web.service";
import {DataFrame, IDataFrame, ISeries, Series} from "data-forge";
import {MSData, MSDataValues} from "../msdata";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Modelling} from "../modelling-data";

@Component({
  selector: 'app-protein-view',
  templateUrl: './protein-view.component.html',
  styleUrls: ['./protein-view.component.sass']
})
export class ProteinViewComponent {
  protein: string = ""
  df: IDataFrame<number, MSData> = new DataFrame()

  private _filteredDF: IDataFrame<number, MSData> = new DataFrame()

  set filteredData(value: IDataFrame<number, MSData>) {
    this._filteredDF = value
    const ids: number[] = value.getSeries("id").bake().toArray()
    const days: number[] = []
    for (const s of this.web.selectedSamples) {
      if (!days.includes(this.web.sampleMap[s].Days)) {
        days.push(this.web.sampleMap[s].Days)
      }
    }

    this.web.postModellingDataMass(ids, days).subscribe((data) => {
      this.modellingData = new DataFrame(data)
      // groupby tissue and engine
      this.modellingDataGroup = this.modellingData.groupBy((row) => {
        return row.Tissue
      }).bake()
    })
  }

  get filteredData(): IDataFrame<number, MSData> {
    return this._filteredDF
  }

  modellingData: IDataFrame<number, Modelling> = new DataFrame()
  modellingDataGroup: ISeries<number, IDataFrame<number, Modelling>> = new Series()
  @Input() set proteinGroup(value: string) {
    this.protein = value
    this.web.getMSData(this.protein).subscribe((data) => {
      this.df = new DataFrame(data)

    })
  }



  page: number = 1

  constructor(public web: WebService, private fb: FormBuilder) {

  }

  handlerFilterDFUpdate(value: IDataFrame<number, MSData>) {
    this.filteredData = value
  }
}
