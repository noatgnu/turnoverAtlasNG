import { Component, Input } from '@angular/core';
import {WebService} from "../web.service";
import {DataFrame, IDataFrame} from "data-forge";
import {MSData, MSDataValues} from "../msdata";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-protein-view',
  templateUrl: './protein-view.component.html',
  styleUrls: ['./protein-view.component.sass']
})
export class ProteinViewComponent {
  protein: string = ""
  df: IDataFrame<number, MSData> = new DataFrame()
  filteredDF: IDataFrame<number, MSData> = new DataFrame()
  tissues: string[] = []
  engines: string[] = []
  samples: string[] = []
  @Input() set proteinGroup(value: string) {
    this.protein = value
    this.web.getMSData(this.protein).subscribe((data) => {
      this.df = new DataFrame(data)
      this.tissues = this.df.getSeries("Tissue").distinct().toArray()
      this.engines = this.df.getSeries("Engine").distinct().toArray()
      this.form.controls['tissues'].setValue(this.tissues)
      this.form.controls['engines'].setValue(this.engines)
      // assign color to engines
      for (let i = 0; i < this.engines.length; i++) {
        const position = i%this.web.defaultColorList.length
        console.log(position)
        if (this.web.colorMap[this.engines[position]] === undefined) {
          this.web.colorMap[this.engines[position]] = this.web.defaultColorList[position]
        }
      }
      console.log(this.web.colorMap)
      this.samples = Object.keys(this.web.sampleMap).sort()
      this.formExperimentParameters.controls['samples'].setValue(this.samples.filter((s) => {
        return this.web.sampleMap[s].Sample_Label === "pulse"
      }))
      this.web.selectedSamples = this.formExperimentParameters.controls['samples'].value
      this.reloadData()
    })
  }

  form: FormGroup = this.fb.group({
    tissues: new FormControl<string[]>([], Validators.required),
    engines: new FormControl<string[]>([], Validators.required),
    proteotypic: new FormControl<boolean>(true),
    minSamplesDetected: new FormControl<number>(1),
    minTimepointsDetected: new FormControl<number>(1),
  })

  formExperimentParameters: FormGroup = this.fb.group({
    samples: new FormControl<string[]>([], Validators.required),
  })

  page: number = 1

  constructor(public web: WebService, private fb: FormBuilder) {

  }

  reloadData() {
    this.filteredDF = this.df.where((row) => {
      return this.form.controls['tissues'].value.includes(row.Tissue) && this.form.controls['engines'].value.includes(row.Engine) && row.n_Samples >= this.form.controls['minSamplesDetected'].value && row.n_TimePoints >= this.form.controls['minTimepointsDetected'].value && this.checkIfDataIsDetectedInSelectedSamples(row.values)
    })
    if (this.form.controls['proteotypic'].value) {
      this.filteredDF = this.filteredDF.where((row) => {
        return row.Proteotypic == 1
      })
    }
    this.filteredDF = this.filteredDF.bake()
  }

  reset() {
    this.form.controls['tissues'].setValue([this.tissues])
    this.form.controls['engines'].setValue([this.engines])
    this.form.controls['proteotypic'].setValue(true)
    this.form.controls['minSamplesDetected'].setValue(1)
    this.form.controls['minTimepointsDetected'].setValue(1)
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
