import {Component, Input} from '@angular/core';
import {WebService} from "../web.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MergePromptComponent} from "../merge-prompt/merge-prompt.component";
import {debounceTime, distinctUntilChanged, map, Observable, OperatorFunction} from "rxjs";
import {DataFrame, IDataFrame} from "data-forge";
import {MSData} from "../msdata";

@Component({
  selector: 'app-floating-panels',
  templateUrl: './floating-panels.component.html',
  styleUrls: ['./floating-panels.component.scss']
})
export class FloatingPanelsComponent {
  precursorList: string[] = []
  sequenceList: string[] = []

  private _filteredDF: IDataFrame<number, MSData> = new DataFrame()
  private displayDF: IDataFrame<number, MSData> = new DataFrame()
  @Input() set filteredDF(value: IDataFrame<number, MSData>) {
    this._filteredDF = value
    this.displayDF = value
    if (this.validTau) {
        this.displayDF = this.displayDF.where((row) => {
            return row["tau_POI"] !== null
        })
    }
    this.precursorList = this.displayDF.getSeries("Precursor_Id").distinct().toArray()
    this.sequenceList = this.displayDF.getSeries("Stripped_Sequence").distinct().toArray()
  }

  get filteredDF(): IDataFrame<number, MSData> {
    return this._filteredDF
  }
  searchBy: "Precursor_Id"| "Stripped_Sequence" = "Precursor_Id"
  panelOpenState = false;
  selected: string[] = []
  validTau: boolean = true


  togglePanels() {
    this.panelOpenState = !this.panelOpenState;
  }

  legends = Object.keys(this.web.settings.colorMap)
  colorMap = Object.assign({}, this.web.settings.colorMap)

  typeaheadModel: string = ""
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
      text$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          map(term => {
            if (term.length < 1) {
              return []
            } else {
              if (this.searchBy === "Precursor_Id") {
                return this.precursorList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
              } else {
                return this.sequenceList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
              }
            }}),
          )

  form: FormGroup<any>= this.fb.group({

  })

  constructor(private web: WebService, private fb: FormBuilder, private modal: NgbModal) {
    this.web.selectionSubject.subscribe(() => {
      this.legends = Object.keys(this.web.settings.colorMap)
      this.colorMap = Object.assign({}, this.web.settings.colorMap)
      const form = this.fb.group({})
      for (const l of this.legends) {
        form.addControl(l, new FormControl(false))
      }
      this.form = form
    })
  }

  updateColorMap() {
    for (const i of this.legends) {
      this.web.settings.colorMap[i] = this.colorMap[i]
    }
    this.web.redrawSubject.next(true)
  }

  updateSelected(e: string) {
    if (this.selected.includes(e)) {
      if (this.form.value[e] === true) {
        this.selected.splice(this.selected.indexOf(e), 1)
      }
    } else {
      this.selected.push(e)
    }
  }

  mergeSelected() {
    if (this.selected.length > 1) {
      const ref = this.modal.open(MergePromptComponent)
      ref.closed.subscribe((result) => {
        this.web.mergeSearchOperations(this.selected, result.color, result.name, result.remove)
        this.web.redrawSubject.next(true)
        this.web.selectionSubject.next(true)
        this.selected = []
      })
    }
  }

  removeSelected() {
    for (const s of this.selected) {
      this.web.removeSearchOperation(s)
    }
    this.form.reset()
    this.selected = []
    this.web.redrawSubject.next(true)
    this.legends = Object.keys(this.web.settings.colorMap)
  }

  matchSearch() {
    const ids: number[] = this.filteredDF.where((row) => {
      return row[this.searchBy] === this.typeaheadModel
    }).bake().getSeries("id").toArray().map((id) => {
      return parseInt(id)
    })
    console.log(ids)
    if (ids.length > 0) {
      ids.forEach((id) => {
        if (!this.web.settings.searchMap[id]) {
          this.web.settings.searchMap[id] = []
        }
        if (!this.web.settings.searchMap[id].includes(this.typeaheadModel)) {
          this.web.settings.searchMap[id].push(this.typeaheadModel)
        }
      })
      this.web.setOperationColor(this.typeaheadModel)
      this.web.settings.searchOperations.push(this.typeaheadModel)
      this.web.selectionHandler(ids)
    }
  }

  updateParams() {
    if (this.validTau) {
      this.displayDF = this.filteredDF.where((row) => {
        return row["tau_POI"] !== null
      })
    }
    this.precursorList = this.displayDF.getSeries("Precursor_Id").distinct().toArray()
    this.sequenceList = this.displayDF.getSeries("Stripped_Sequence").distinct().toArray()
  }
}
