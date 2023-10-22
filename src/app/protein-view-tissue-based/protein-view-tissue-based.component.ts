import {Component, Input} from '@angular/core';
import {MSData} from "../msdata";
import {DataFrame, IDataFrame, ISeries, Series} from "data-forge";

@Component({
  selector: 'app-protein-view-tissue-based',
  templateUrl: './protein-view-tissue-based.component.html',
  styleUrls: ['./protein-view-tissue-based.component.sass']
})
export class ProteinViewTissueBasedComponent {
  iscollapse = false
  private _data: IDataFrame<number, MSData> = new DataFrame()
  groupData: ISeries<number, IDataFrame<number, MSData>> = new Series()
  @Input() set data (values: IDataFrame<number, MSData>) {
    this._data = values
    this.groupData = this._data.groupBy(row => row.Tissue).bake()
  }

  get data(): IDataFrame<number, MSData> {
    return this._data
  }

  constructor() { }
}
