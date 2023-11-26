import {Component, Input} from '@angular/core';
import {MSData} from "../msdata";
import {DataFrame, IDataFrame} from "data-forge";
import {WebService} from "../web.service";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-protein-tau-distribution',
  templateUrl: './protein-tau-distribution.component.html',
  styleUrls: ['./protein-tau-distribution.component.scss']
})
export class ProteinTauDistributionComponent {
  private _data: IDataFrame<number, MSData> = new DataFrame()
  @Input() set data(value: IDataFrame<number, MSData>) {
    this._data = value
    this._data = this._data.orderByDescending((row) => {row.Tissue}).bake()
    this.drawGraph()
  }
  get data(): IDataFrame<number, MSData> {
    return this._data
  }
  revision: number = 0
  graphDataMap: any = {}
  graphLayoutBase: any = {
    title: "",
    xaxis: {
      title: "Tissue",
      type: "category",
      tickmode: "array",
    },
    yaxis: {
        title: "log2(TAU)",
    },
    annotations: [],
    font: {
        family: "Arial",
        color: "black"
    }
  }
  graphLayoutMap: any = {

  }
  config: any = {
    //modeBarButtonsToRemove: ["toImage"]
    toImageButtonOptions: {
      format: 'svg',
      scale: 1
    }
  }
  categories: string[] = ["HalfLife_POI", "tau_POI", "rss", "AverageRSS"]
  form = this.fb.group({
    hideNotSelected: new FormControl(false),
    category: new FormControl("HalfLife_POI"),
    log2: new FormControl(true),
    color: new FormControl("rgba(236,96,99,0.78)"),
  })

  constructor(private web: WebService, private fb: FormBuilder) {
    this.web.restoreSubject.subscribe(() => {
      this.form.patchValue(this.web.settings.dataDistributionForm)
      this.drawGraph()
    })
    this.web.redrawSubject.subscribe(() => {
      this.drawGraph()
    })
  }
  engineList: string[] = []

  drawGraph() {
    this.web.settings.dataDistributionForm = this.form.value
    // draw box plot for tau distribution with y-axis being tau value and x axis being tissue, the box plot should also show individual data points as well with the data points being on the left outside of the box plot
    const temp: any = {}
    this.graphDataMap = {}
    this.graphLayoutMap = {}
    if (this.form.controls['category'].value) {
      for (const row of this.data) {
        if (!(row.Engine in temp)) {
          temp[row.Engine] = {}
        }
        // @ts-ignore
        let y = Math.log2(row[this.form.controls['category'].value])
        let hovertemplate = "Tissue: %{x}<br>log2("+this.form.controls['category'].value+"): %{y}<br>Precursor ID: %{text}<extra></extra>"
        if (this.form.controls['log2'].value !== true) {
          hovertemplate = "Tissue: %{x}<br>"+this.form.controls['category'].value+": %{y}<br>Precursor ID: %{text}<extra></extra>"
          // @ts-ignore
          y = row[this.form.controls['category'].value]
        }
        if (!(row.Tissue in temp[row.Engine])) {
          temp[row.Engine][row.Tissue] = {
            x: [],
            y: [],
            text: [],
            name: row.Tissue,
            type: "box",
            boxpoints: "all",
            jitter: 0.3,
            pointpos: -1.8,
            showlegend: false,
            marker: {
              color: [],
            },

            fillcolor: this.form.value.color,
            hovertemplate: hovertemplate
          }

        }
        temp[row.Engine][row.Tissue].x.push(row.Tissue)
        temp[row.Engine][row.Tissue].y.push(y)
        if (this.web.settings.selectedMSDataID.includes(row.id)) {
          if (this.web.settings.searchMap[row.id]) {
            temp[row.Engine][row.Tissue].marker.color.push(this.web.settings.colorMap[this.web.settings.searchMap[row.id][this.web.settings.searchMap[row.id].length-1]].slice())
          }
        } else {
          if (this.form.value.hideNotSelected) {
            temp[row.Engine][row.Tissue].marker.color.push("rgba(140,140,140,0)")
          } else {
            temp[row.Engine][row.Tissue].marker.color.push("rgba(140,140,140,0.13)")
          }
        }
        temp[row.Engine][row.Tissue].text.push(row.Precursor_Id)
      }
      for (const engine in temp) {
        if (!(engine in this.graphLayoutMap)) {
          this.graphLayoutMap[engine] = JSON.parse(JSON.stringify(this.graphLayoutBase))
          this.graphLayoutMap[engine].yaxis.title = this.form.controls['category'].value
          if (this.form.controls['log2'].value === true) {
            this.graphLayoutMap[engine].yaxis.title = "log2("+this.form.controls['category'].value+")"
          }

          this.graphLayoutMap[engine].title = engine
          this.graphDataMap[engine] = []
        }
        for (const tissue in temp[engine]) {
          this.graphDataMap[engine].push(temp[engine][tissue])
        }
        this.graphDataMap[engine].sort((a: any, b: any) => {
          return a.name.localeCompare(b.name)
        })
      }
    }

    this.engineList = Object.keys(this.graphLayoutMap)
    this.revision += 1
  }

  OnClick(event: any) {
    console.log(event)
    if ("points" in event) {
      const selectedData: string[] = []
      for (const point of event.points) {
        if (!("hoverOnBox" in point)) {
          selectedData.push(point.data.text[point.pointNumber])

          this.web.setOperationColor(point.data.text[point.pointNumber])
          this.web.settings.searchOperations.push(point.data.text[point.pointNumber])
        }

      }
      if (selectedData.length > 0) {
        const data= this.data.where((row) => {
          return selectedData.includes(row.Precursor_Id)
        }).bake()
        const ids: number[] = []
        data.forEach((row) => {
          ids.push(row.id)
          if (!this.web.settings.searchMap[row.id]) {
            this.web.settings.searchMap[row.id] = []
          }
          if (!this.web.settings.searchMap[row.id].includes(row.Precursor_Id)) {
            this.web.settings.searchMap[row.id].push(row.Precursor_Id)
          }
        })
        if (ids.length > 0) {
          this.web.selectionHandler(ids)
        }
      }
    }
  }

  updatePlot() {
    this.drawGraph()
  }
}
