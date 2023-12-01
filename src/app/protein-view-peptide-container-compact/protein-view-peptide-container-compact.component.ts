import {Component, Input} from '@angular/core';
import {MSData} from "../msdata";
import {WebService} from "../web.service";

@Component({
  selector: 'app-protein-view-peptide-container-compact',
  templateUrl: './protein-view-peptide-container-compact.component.html',
  styleUrls: ['./protein-view-peptide-container-compact.component.scss']
})
export class ProteinViewPeptideContainerCompactComponent {
  private _data: MSData|undefined = undefined
  @Input() set data(value: MSData) {
    this._data = value
  }

  get data(): MSData|undefined {
    return this._data
  }

  constructor(public web: WebService) { }

  addToSelection() {
    if (this.data) {
      this.web.setOperationColor(this.data.Precursor_Id)
      if (!this.web.settings.searchMap[this.data.id]) {
        this.web.settings.searchMap[this.data.id] = []
      }
      if (!this.web.settings.searchMap[this.data.id].includes(this.data.Precursor_Id)) {
        this.web.settings.searchMap[this.data.id].push(this.data.Precursor_Id)
      }
      this.web.selectionHandler([this.data.id])
    }
  }
}
