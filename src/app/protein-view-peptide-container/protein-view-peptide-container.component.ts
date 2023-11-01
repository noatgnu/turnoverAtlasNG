import {Component, Input} from '@angular/core';
import {MSData} from "../msdata";

@Component({
  selector: 'app-protein-view-peptide-container',
  templateUrl: './protein-view-peptide-container.component.html',
  styleUrls: ['./protein-view-peptide-container.component.sass']
})
export class ProteinViewPeptideContainerComponent {
  private _data: MSData|undefined = undefined
  @Input() set data(value: MSData) {
    this._data = value
  }

  get data(): MSData|undefined {
    return this._data
  }

  constructor() { }
}