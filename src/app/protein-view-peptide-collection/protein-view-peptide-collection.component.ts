import {Component, Input} from '@angular/core';
import {DataFrame, IDataFrame} from "data-forge";
import {MSData, MSDataValues} from "../msdata";
import {debounceTime, distinctUntilChanged, map, Observable, OperatorFunction} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {WebService} from "../web.service";

@Component({
  selector: 'app-protein-view-peptide-collection',
  templateUrl: './protein-view-peptide-collection.component.html',
  styleUrls: ['./protein-view-peptide-collection.component.scss']
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
  pageSize: number = 12;

  viewOptions: string[] = ["compact", "full"]

  form: FormGroup = this.fb.group({
    filterPrecursorID: new FormControl<string>(""),
    pageSize: new FormControl<number>(10, [Validators.required, Validators.min(1)]),
    validTAUPOI: new FormControl<boolean>(true),
    view: new FormControl<string>("compact"),
    sort: new FormControl<string>(""),
    descending: new FormControl<boolean>(false)
  })



  constructor(private fb: FormBuilder, private web: WebService) {
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
      if (value.sort && value.sort !== "") {
        if (value.descending) {
          this.displayDF = this.displayDF.orderByDescending((row: any) => row[value.sort])
        } else {
          this.displayDF = this.displayDF.orderBy((row: any) => row[value.sort])
        }
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

  exportHandler(fileType: string) {
    const delimiter = fileType.toLowerCase() === "csv" ? "," : "\t"
    let a = ""
    if (fileType === "json") {
      a = this.displayDF.toJSON()
    } else {
      // @ts-ignore
      let b = this.displayDF.inflateSeries("values", (row: MSDataValues[]) => {
        const newRow: any = {}
        for (const i of row) {

          newRow[`${this.web.settings.sampleMap[i.Sample_Name].Days} - ${i.Sample_Name}`] = i.Sample_H_over_HL
        }
        return newRow
      })
      b = b.dropSeries(["values", "tau_model"])
      a = b.toCSV(// @ts-ignore
        {delimiter: delimiter}
      )
    }
    const blob = new Blob([a], {type: "text/plain;charset=utf-8"})
    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = `export_data.${fileType.toLowerCase()}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
