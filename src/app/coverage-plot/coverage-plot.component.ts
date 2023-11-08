import {Component, Input} from '@angular/core';
import {SequenceCoverage} from "../sequence-coverage";
import {WebService} from "../web.service";
import {DataFrame, IDataFrame} from "data-forge";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-coverage-plot',
  templateUrl: './coverage-plot.component.html',
  styleUrls: ['./coverage-plot.component.scss']
})
export class CoveragePlotComponent {
  private _coverageData: SequenceCoverage|undefined = undefined
  df: IDataFrame<{id: string, Precursor_Id: string, Tissue: string, Engine: string, tau_POI: number, Stripped_Sequence: string}> = new DataFrame()
  tissues: string[] = []
  displayDF: IDataFrame<{id: string, Precursor_Id: string, Tissue: string, Engine: string, tau_POI: number, Stripped_Sequence: string}> = new DataFrame()
  engines: string[] = []
  iscollapse: boolean = true
  revision: number = 0
  @Input() set coverageData(value: SequenceCoverage) {

    this._coverageData = value
    this.df = new DataFrame(Object.values(value.turnover_data))
    this.tissues = this.df.getSeries("Tissue").distinct().toArray()

    this.form.controls['tissues'].setValue(this.tissues[0])
    this.updateDisplay()
  }

  graphData: any[] = []
  graphLayout: any = {
    title: "",
    autosize: true,
    width: 1200,
    hovermode: false,
    xaxis: {
      title: "Position",
      range: [0, 100],
      showticklabels: false,
      showgrid: false,
      zeroline: false,
      visible: false,
    },
    yaxis: {
      showticklabels: false,
      range: [0, 100],
      type: "category",
      fixedrange: true,
      showgrid: false,
      zeroline: false,
      visible: false,
    },
    shapes: [],
  }
  graphLayoutMap: any = {

  }
  graphDataMap: any = {

  }

  form: FormGroup = this.fb.group({
    tissues: new FormControl<string>("", Validators.required),
    valid_tau: new FormControl<boolean>(true),
    selected_only: new FormControl<boolean>(false),
  })

  get coverageData(): SequenceCoverage {
    return this._coverageData as SequenceCoverage
  }

  constructor(private web: WebService, private fb: FormBuilder) {
    this.form.valueChanges.subscribe((data) => {
      this.updateDisplay()
    })
    this.web.redrawSubject.subscribe(() => {
      this.updateDisplay()
    })
  }

  drawCoveragePlot() {
    this.graphLayoutMap = {}
    this.graphDataMap = {}
    if (this.coverageData && this.displayDF.count() > 0) {
      this.displayDF.groupBy((row) => {
        return row.Engine
      }).forEach((group) => {
        const graphData: any[] = []
        const graphLayout = JSON.parse(JSON.stringify(this.graphLayout))

        graphLayout.title = group.first().Engine
        const heightMap: any = {}
        const dataMap: any = {}
        const lineShapeFromData: any = {
          type: "line",
          x0: 1,
          y0: 0,
          x1: this.coverageData.protein_sequence.length,
          y1: 0,
          line: {
            color: "black",
            width: 1,
          },
        }
        graphLayout.shapes.push(lineShapeFromData)
        const df = group.orderByDescending((row) => {
          return row.Stripped_Sequence.length
        }).bake()

        df.forEach((row) => {
          let previousHeight = 0
          for (const i in this.coverageData.coverage) {
            // @ts-ignore
            if (this.coverageData.coverage[i].includes(row.id)) {
              if (!(i in heightMap)) {
                heightMap[i] = {highest: 0}
              }
              if (!(row.id in heightMap[i])) {
                heightMap[i].highest += 1
                if (previousHeight ==0) {
                  previousHeight = heightMap[i].highest
                } else {
                  heightMap[i].highest = previousHeight
                }
              }

              heightMap[i][row.id] = heightMap[i].highest
              if (!dataMap[row.id]) {
                dataMap[row.id] = {
                  x: [],
                  y: [],
                }
              }
              dataMap[row.id].x.push(parseInt(i)+1)
              dataMap[row.id].y.push(heightMap[i][row.id])
            }
          }
        })
        graphLayout.xaxis.range = [1, this.coverageData.protein_sequence.length]

        let highest = 0
        for (const i in dataMap) {
          const x0 = dataMap[i].x[0]
          const x1 = dataMap[i].x[dataMap[i].x.length-1]
          const y0 = dataMap[i].y[0]
          const y1 = dataMap[i].y[dataMap[i].y.length-1]
          const lineShape: any = {
            type: "line",
            x0: x0,
            y0: y0,
            x1: x1,
            y1: y1,
            line: {
              color: "rgb(101,101,101)",
              width: 4,
            },
          }
          if (this.web.settings.searchMap[i]) {
            lineShape.line.color = this.web.settings.colorMap[this.web.settings.searchMap[i][this.web.settings.searchMap[i].length -1]].slice()
          }
          if (y1 > highest) {
            highest = y1
          }

          graphLayout.shapes.push(lineShape)
        }
        graphLayout.yaxis.range = [0, highest]
        this.graphLayoutMap[group.first().Engine] = graphLayout
        this.graphDataMap[group.first().Engine] = []
      })
      this.revision += 1
    }
    console.log(this.graphDataMap)
  }

  updateDisplay() {
    this.displayDF = this.df.where((row) => {
      return row.Tissue === this.form.controls['tissues'].value
    })
    if (this.form.controls['valid_tau'].value) {
      this.displayDF = this.displayDF.where((row) => {
        return row.tau_POI !== null
      })
    }
    if (this.form.controls['selected_only'].value) {
      this.displayDF = this.displayDF.where((row) => {
          return this.web.settings.selectedMSDataID.includes(row.id)
      })
    }
    this.displayDF = this.displayDF.bake()
    this.engines = this.displayDF.getSeries("Engine").distinct().toArray()

    this.drawCoveragePlot()
  }
}
