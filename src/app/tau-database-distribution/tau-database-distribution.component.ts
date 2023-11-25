import { Component } from '@angular/core';
import {WebService} from "../web.service";
import {DataFrame, IDataFrame, ISeries, Series} from "data-forge";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-tau-database-distribution',
  templateUrl: './tau-database-distribution.component.html',
  styleUrls: ['./tau-database-distribution.component.scss']
})
export class TauDatabaseDistributionComponent {
  histograms: IDataFrame<number, {Tissue: string, Engine: string, value: number[], bins: number[]}> = new DataFrame()

  overallHistogram: {Tissue: string, Engine: string, value: number[], bins: number[]} = {Tissue: '', Engine: '', value: [], bins: []}

  groupByHistograms: ISeries<number, IDataFrame<number, {Tissue: string, Engine: string, value: number[], bins: number[]}>> = new Series()
  tissueList: string[] = []

  useHighesttoggleMap: {[key: string]: boolean} = {}

  form = this.fb.group({
    Tissue: new FormControl<string[]>([])
  })

  constructor(public web: WebService, private fb: FormBuilder) {
    this.web.getHistogram().subscribe((data: any) => {
      this.overallHistogram = data[0]
      this.web.largestHistogramValue = Math.max(...this.overallHistogram.value)
      this.histograms = new DataFrame(data.slice(1))
      this.groupByHistograms = this.histograms.groupBy(row => row.Tissue)
      this.tissueList = this.histograms.getSeries("Tissue").distinct().toArray()
      for (const tissue of this.tissueList) {
        this.useHighesttoggleMap[tissue] = true
      }
      this.form.controls.Tissue.setValue(this.tissueList)
    })
  }

}
