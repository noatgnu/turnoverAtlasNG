import {Component, Input} from '@angular/core';
import {DataFrame, IDataFrame, ISeries, Series} from "data-forge";
import {MSData} from "../msdata";
import {WebService} from "../web.service";

@Component({
  selector: 'app-protein-tau-collection',
  templateUrl: './protein-tau-collection.component.html',
  styleUrls: ['./protein-tau-collection.component.scss']
})
export class ProteinTauCollectionComponent {
  private _data: IDataFrame<number, MSData> = new DataFrame()
  iscollapse: boolean = true
  activeId: any= 1
  includeInvalid: boolean = false
  @Input() set data(value : IDataFrame<number, MSData>) {
    this._data = value
    this.tissueGroupData = this._data.groupBy(row => row.Tissue).bake()
  }

  get data(): IDataFrame<number, MSData> {
    return this._data
  }
  tissueGroupData: ISeries<number, IDataFrame<number, MSData>> = new Series()
  combinedPlot: boolean = true
  constructor(public web: WebService) {
  }

  updatePlot() {
    this.web.redrawSubject.next(true)
  }
}
