import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DataFrame, IDataFrame} from "data-forge";
import {MSData, MSDataValues} from "../msdata";
import {WebService} from "../web.service";
import {ToastService} from "../toast.service";

@Component({
  selector: 'app-protein-search',
  templateUrl: './protein-search.component.html',
  styleUrls: ['./protein-search.component.scss']
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
    rssThreshold: new FormControl<number|null>(null),
    rssAverageThreshold: new FormControl<number|null>(null),
    maxRSS: new FormControl<number|null>(null),
    maxAverageRSS: new FormControl<number|null>(null),
    halflifeThreshold: new FormControl<number|null>(null),
    maxHalfLife: new FormControl<number|null>(null),

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
    // for (let i = 0; i < this.engines.length; i++) {
    //   const position = i%this.web.defaultColorList.length
    //   if (this.web.colorMap[this.engines[position]] === undefined) {
    //     this.web.colorMap[this.engines[position]] = this.web.defaultColorList[position]
    //   }
    // }
    this.samples = Object.keys(this.web.settings.sampleMap).sort()
    this.formExperimentParameters.controls['samples'].setValue(this.samples.filter((s) => {
      return this.web.settings.sampleMap[s].Sample_Label === "pulse"
    }))
    this.web.settings.selectedSamples = this.formExperimentParameters.controls['samples'].value
    this.reloadData()
  }
  @Output() filteredData: EventEmitter<IDataFrame<number, MSData>> = new EventEmitter<IDataFrame<number, MSData>>()
  get data(): IDataFrame<number, MSData> {
    return this._data
  }
  constructor(private fb: FormBuilder, public web: WebService, private toastService: ToastService) {
    this.web.restoreSubject.asObservable().subscribe((data) => {
      if (data) {
        this.form.patchValue(this.web.settings.form)
        this.formExperimentParameters.patchValue(this.web.settings.formExperimentParameters)
        this.reloadData()
      }

    })
  }

  reloadData() {
    this.toastService.show("Data formating", "Filtering data")
    this.filteredDF = this.data.where((row) => {
      return this.form.controls['tissues'].value.includes(row.Tissue)
        && this.form.controls['engines'].value.includes(row.Engine)
        && row.n_Samples >= this.form.controls['minSamplesDetected'].value
        && row.n_TimePoints >= this.form.controls['minTimepointsDetected'].value
        && this.checkIfDataIsDetectedInSelectedSamples(row.values)
    })
    if (this.form.controls['proteotypic'].value) {
      this.filteredDF = this.filteredDF.where((row) => {
        return row.Proteotypic == 1
      })
    }

    if (this.form.controls['rssThreshold'].value !== null) {
      this.filteredDF = this.filteredDF.where((row) => {
        if (row.rss === null) {
          return false
        }
        return row.rss >= this.form.controls['rssThreshold'].value
      })
    }
    if (this.form.controls['halflifeThreshold'].value !== null) {
      this.filteredDF = this.filteredDF.where((row) => {
        if (row.HalfLife_POI === null) {
          return false
        }
        return row.HalfLife_POI >= this.form.controls['halflifeThreshold'].value
      })
    }
    if (this.form.controls['rssAverageThreshold'].value !== null) {
      this.filteredDF = this.filteredDF.where((row) => {
        if (row.AverageRSS === null) {
          return false
        }
        return row.AverageRSS >= this.form.controls['rssAverageThreshold'].value
      })
    }

    if (this.form.controls['maxRSS'].value !== null) {
      this.filteredDF = this.filteredDF.where((row) => {
        if (row.rss === null) {
          return false
        }
        return row.rss <= this.form.controls['maxRSS'].value
      })
    }
    if (this.form.controls['maxAverageRSS'].value !== null) {
      this.filteredDF = this.filteredDF.where((row) => {
        if (row.AverageRSS === null) {
          return false
        }
        return row.AverageRSS <= this.form.controls['maxAverageRSS'].value
      })
    }
    if (this.form.controls['maxHalfLife'].value !== null) {
      this.filteredDF = this.filteredDF.where((row) => {
        if (row.HalfLife_POI === null) {
          return false
        }
        return row.HalfLife_POI <= this.form.controls['maxHalfLife'].value
      })
    }

    this.filteredDF = this.filteredDF.bake()
    this.web.settings.form = this.form.value
    console.log(this.web.settings.form)
    this.web.settings.formExperimentParameters = this.formExperimentParameters.value
    this.web.tissues = this.filteredDF.getSeries("Tissue").distinct().toArray()
    this.web.engines = this.filteredDF.getSeries("Engine").distinct().toArray()
    this.web.strippedSequences = this.filteredDF.getSeries("Stripped_Sequence").distinct().toArray()
    this.filteredData.emit(this.filteredDF)
  }

  reset() {
    this.form.reset()
    this.reloadData()
  }

  updateSelection() {
    this.web.settings.selectedSamples = this.formExperimentParameters.controls['samples'].value
    this.web.redrawSubject.next(true)
  }

  checkIfDataIsDetectedInSelectedSamples(values: MSDataValues[]) {
    for (const v of values) {
      if (this.web.settings.selectedSamples.includes(v.Sample_Name)) {
        if (v.Sample_H_over_HL !== null) {
          return true
        }
      }
    }
    return false
  }

}
