import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-variant-selector',
  templateUrl: './variant-selector.component.html',
  styleUrls: ['./variant-selector.component.scss']
})
export class VariantSelectorComponent {
  private _data: string[] = []
  @Input() set data(value: string[]) {
    this._data = value
    this.selectedData = value[0]
    if (this._data.length == 1) {
      this.selectedData = this._data[0]
    }
  }
  selectedData: string = ""
  get data(): string[] {
    return this._data
  }
  constructor(private modal: NgbActiveModal) {
  }
  submit() {
    console.log("navigate to " + this.selectedData)
    this.modal.close(this.selectedData)
  }

  cancel() {
    this.modal.dismiss()
  }
}
