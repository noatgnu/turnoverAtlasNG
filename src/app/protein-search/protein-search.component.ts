import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DataFrame, IDataFrame} from "data-forge";
import {MSData, MSDataValues} from "../msdata";
import {WebService} from "../web.service";

@Component({
  selector: 'app-protein-search',
  templateUrl: './protein-search.component.html',
  styleUrls: ['./protein-search.component.sass']
})
export class ProteinSearchComponent {
  tissues: string[] = []
  engines: string[] = []
  samples: string[] = []
  form: FormGroup = this.fb.group({
    tissues: new FormControl<string[]>([], Validators.required),
    engines: new FormControl<string[]>([], Validators.required),
    proteotypic: new FormControl<boolean>(false),
    minSamplesDetected: new FormControl<number>(1),
    minTimepointsDetected: new FormControl<number>(1),
  })

  formExperimentParameters: FormGroup = this.fb.group({
    samples: new FormControl<string[]>([], Validators.required),
  })

  private _data: IDataFrame<number, MSData> = new DataFrame()
  filteredDF: IDataFrame<number, MSData> = new DataFrame()

  @Input() set data(value: IDataFrame<number, MSData>) {
    this._data = value
    this.tissues = this._data.getSeries("Tissue").distinct().toArray()
    this.engines = this._data.getSeries("Engine").distinct().toArray()
    this.form.controls['tissues'].setValue(this.tissues)
    this.form.controls['engines'].setValue(this.engines)
    // assign color to engines
    for (let i = 0; i < this.engines.length; i++) {
      const position = i%this.web.defaultColorList.length
      if (this.web.colorMap[this.engines[position]] === undefined) {
        this.web.colorMap[this.engines[position]] = this.web.defaultColorList[position]
      }
    }
    this.samples = Object.keys(this.web.sampleMap).sort()
    this.formExperimentParameters.controls['samples'].setValue(this.samples.filter((s) => {
      return this.web.sampleMap[s].Sample_Label === "pulse"
    }))
    this.web.selectedSamples = this.formExperimentParameters.controls['samples'].value
    this.reloadData()
  }
  @Output() filteredData: EventEmitter<IDataFrame<number, MSData>> = new EventEmitter<IDataFrame<number, MSData>>()
  get data(): IDataFrame<number, MSData> {
    return this._data
  }
  constructor(private fb: FormBuilder, public web: WebService) {

  }

  reloadData() {
    this.filteredDF = this.data.where((row) => {
      return this.form.controls['tissues'].value.includes(row.Tissue) && this.form.controls['engines'].value.includes(row.Engine) && row.n_Samples >= this.form.controls['minSamplesDetected'].value && row.n_TimePoints >= this.form.controls['minTimepointsDetected'].value && this.checkIfDataIsDetectedInSelectedSamples(row.values)
    })
    if (this.form.controls['proteotypic'].value) {
      this.filteredDF = this.filteredDF.where((row) => {
        return row.Proteotypic == 1
      })
    }
    this.filteredDF = this.filteredDF.bake()
    this.filteredData.emit(this.filteredDF)
    console.log(this.filteredDF)
    console.log(this.data)
  }

  reset() {
    this.form.reset()
    this.reloadData()
  }

  updateSelection() {
    this.web.selectedSamples = this.formExperimentParameters.controls['samples'].value
    this.web.redrawSubject.next(true)
  }

  checkIfDataIsDetectedInSelectedSamples(values: MSDataValues[]) {
    for (const v of values) {
      if (this.web.selectedSamples.includes(v.Sample_Name)) {
        if (v.Sample_H_over_HL !== null) {
          return true
        }
      }
    }
    return false
  }
}
