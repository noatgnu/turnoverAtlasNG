import {Component, Input} from '@angular/core';
import {MSData} from "../msdata";
import {WebService} from "../web.service";

@Component({
  selector: 'app-protein-view-peptide-container',
  templateUrl: './protein-view-peptide-container.component.html',
  styleUrls: ['./protein-view-peptide-container.component.scss']
})
export class ProteinViewPeptideContainerComponent {
  private _data: MSData|undefined = undefined
  @Input() set data(value: MSData) {
    this._data = value
  }

  get data(): MSData|undefined {
    return this._data
  }

  constructor(public web: WebService) { }
}
