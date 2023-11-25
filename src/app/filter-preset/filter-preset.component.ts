import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {WebService} from "../web.service";

@Component({
  selector: 'app-filter-preset',
  templateUrl: './filter-preset.component.html',
  styleUrls: ['./filter-preset.component.scss']
})
export class FilterPresetComponent {
  private _tissues: string[] = []
  private _engines: string[] = []
  private _sequences: string[] = []
  @Input() set tissues(value: string[]) {
    this._tissues = value
  }
  get tissues(): string[] {
    return this._tissues
  }

  @Input() set engines(value: string[]) {
    this._engines = value
  }
  get engines(): string[] {
    return this._engines
  }

  @Input() set sequences(value: string[]) {
    this._sequences = value
  }
  get sequences(): string[] {
    return this._sequences
  }

  form = this.fb.group({
    tissues: new FormControl<string[]>([]),
    engines: new FormControl<string[]>([]),
    sequences: new FormControl<string[]>([]),
    filterName: new FormControl<string>(''),
  })

  selectedSequences: string[] = []
  @Output() filterOutput: EventEmitter<any> = new EventEmitter<any>()
  constructor(private fb: FormBuilder, private web: WebService) {

  }

  addSequence() {
    if (this.form.controls['sequences'].value) {
      for (const s of this.form.controls['sequences'].value) {
        if (!this.selectedSequences.includes(s)) {
          this.selectedSequences.push(s)
        }
      }
    }
  }

  removeFromSelectedList(sequence: string) {
    this.selectedSequences = this.selectedSequences.filter((s) => {
      return s !== sequence
    })
  }

  applyFilter(){
    // @ts-ignore
    if (this.form.value.sequences.length > 0|| this.form.value.tissues.length > 0 || this.form.value.engines.length > 0) {
      this.filterOutput.emit(this.form.value)
      console.log(this.form.value)
    }
  }
  resetFilter() {
    this.form.controls['tissues'].setValue([])
    this.form.controls['engines'].setValue([])
    this.form.controls['sequences'].setValue([])
    this.selectedSequences = []
  }
}
