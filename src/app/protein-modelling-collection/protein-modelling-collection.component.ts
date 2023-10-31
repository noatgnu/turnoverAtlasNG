import {Component, Input} from '@angular/core';
import {IDataFrame, ISeries, Series} from "data-forge";
import {Modelling} from "../modelling-data";

@Component({
  selector: 'app-protein-modelling-collection',
  templateUrl: './protein-modelling-collection.component.html',
  styleUrls: ['./protein-modelling-collection.component.sass']
})
export class ProteinModellingCollectionComponent {
  private _data: ISeries<number, IDataFrame<number, Modelling>> = new Series()
  @Input() set data(value: ISeries<number, IDataFrame<number, Modelling>>) {
    this._data = value
    const tissues: string[] = []
    this._data.forEach((df) => {
      tissues.push(df.first().Tissue)
    })
    this.tissues = tissues
    this.selectedTissues = [...tissues]
    this.updateGroupData()
  }

  get data(): ISeries<number, IDataFrame<number, Modelling>> {
    return this._data
  }

  tissues: string[] = []

  selectedTissues: string[] = []

  iscollapse: boolean = true
  groupData: ISeries<number, IDataFrame<number, Modelling>> = new Series()
  constructor() {

  }

  updateGroupData() {
    this.groupData = this.data.where((df) => {
      return this.selectedTissues.includes(df.first().Tissue)
    }).bake()
  }
}
