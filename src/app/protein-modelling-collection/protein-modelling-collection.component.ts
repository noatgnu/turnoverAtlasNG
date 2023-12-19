import {Component, Input} from '@angular/core';
import {IDataFrame, ISeries, Series} from "data-forge";
import {Modelling} from "../modelling-data";
import {MSData} from "../msdata";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {WebService} from "../web.service";

@Component({
  selector: 'app-protein-modelling-collection',
  templateUrl: './protein-modelling-collection.component.html',
  styleUrls: ['./protein-modelling-collection.component.scss']
})
export class ProteinModellingCollectionComponent {
  private _data: ISeries<number, IDataFrame<number, MSData>> = new Series()
  @Input() set data(value: ISeries<number, IDataFrame<number, MSData>>) {
    this._data = value
    const tissues: string[] = []
    this._data.forEach((df) => {
      tissues.push(df.first().Tissue)
    })
    this.tissues = tissues
    this.form.controls['selectedTissues'].setValue(this.tissues.slice(0,1))
    this.updateGroupData()
  }

  get data(): ISeries<number, IDataFrame<number, MSData>> {
    return this._data
  }

  tissues: string[] = []

  selectedTissues: string[] = []

  iscollapse: boolean = true
  groupData: ISeries<number, IDataFrame<number, MSData>> = new Series()
  form = this.fb.group({
    selectedTissues: new FormControl<string[]>([], Validators.required),
    hideNotSelected: new FormControl<boolean>(false),
    kpool: new FormControl<boolean>(true),
    kpoolColor: new FormControl<string>(this.web.settings.modellingKPoolColor),
  })

  hideNotSelected: boolean = false
  constructor(private fb: FormBuilder, private web: WebService) {
    this.form.controls.selectedTissues.valueChanges.subscribe((data) => {
        this.updateGroupData()
    })
    this.form.controls.hideNotSelected.valueChanges.subscribe((data) => {
      if (data !== null) {
        this.hideNotSelected = data
      }
    })
    this.form.controls.kpool.valueChanges.subscribe((data) => {
      if (data !== null) {
        this.web.settings.modellingKPool = data
        this.updateGroupData()
      }
    })
    this.form.controls.kpoolColor.valueChanges.subscribe((data) => {
      if (data !== null) {
        this.web.settings.modellingKPoolColor = data
        this.updateGroupData()
      }
    })
  }

  updateGroupData() {
    if (this.form.controls.selectedTissues.value) {
      this.selectedTissues = this.form.controls.selectedTissues.value
      this.groupData = this.data.where((df) => {
        return this.selectedTissues.includes(df.first().Tissue)
      }).bake()
      this.web.redrawSubject.next(true)
    }
  }


}
