import {Component, Input} from '@angular/core';
import {DataFrame, IDataFrame} from "data-forge";
import {MSData} from "../msdata";
import {debounceTime, distinctUntilChanged, map, Observable, OperatorFunction} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-protein-view-peptide-collection',
  templateUrl: './protein-view-peptide-collection.component.html',
  styleUrls: ['./protein-view-peptide-collection.component.sass']
})
export class ProteinViewPeptideCollectionComponent {
  private _data: IDataFrame<number, MSData> = new DataFrame()
  displayDF: IDataFrame<number, MSData> = new DataFrame()

  precursorID: string[] = []
  @Input() set data (value: IDataFrame<number, MSData>) {
    this._data = value

    if (this.form.value.validTAUPOI) {
      this.displayDF = value.where(row => row.tau_POI !== null).bake()
    } else {
      this.displayDF = value
    }
    this.precursorID = this._data.getSeries("Precursor_Id").distinct().toArray()
  }

  get data(): IDataFrame<number, MSData> {
    return this._data
  }

  page:number = 1;
  pageSize: number = 10;

  typeaheadModel: string = ""
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.precursorID.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  form: FormGroup = this.fb.group({
    filterPrecursorID: new FormControl<string>(""),
    pageSize: new FormControl<number>(10, [Validators.required, Validators.min(1)]),
    validTAUPOI: new FormControl<boolean>(true)
  })



  constructor(private fb: FormBuilder) {
    this.form.controls['filterPrecursorID'].valueChanges.subscribe((value) => {
      this.displayDF = this.data.where(row => row.Precursor_Id.indexOf(value.filterPrecursorID.toUpperCase()) > -1)
    })
    this.form.controls['pageSize'].valueChanges.subscribe((value) => {
      if (value > 0) {
        this.pageSize = value
      }
    })
    this.form.valueChanges.subscribe((value) => {
      if (value.filterPrecursorID === "") {
        this.displayDF = this.data
      } else {
        this.displayDF = this.data.where(row => row.Precursor_Id.indexOf(value.filterPrecursorID.toUpperCase()) > -1)
      }
      if (value.validTAUPOI) {
        this.displayDF = this.displayDF.where(row => row.tau_POI !== null)
      }
        this.displayDF = this.displayDF.bake()
        this.pageSize = value.pageSize
    })
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }
  FILTER_PAG_REGEX = /[^0-9]/g;
  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(this.FILTER_PAG_REGEX, '');
  }
}
