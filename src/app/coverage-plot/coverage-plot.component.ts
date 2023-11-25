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
  config: any = {
    //modeBarButtonsToRemove: ["toImage"]
    toImageButtonOptions: {
      format: 'svg',
      scale: 1
    }
  }
  graphData: any[] = []
  graphLayout: any = {
    title: "",
    autosize: true,
    width: 1200,
    margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 100,
    },
    hovermode: true,
    xaxis: {
      title: "Position",
      range: [0, 100],
      showticklabels: true,
      showgrid: true,
      zeroline: false,
      visible: true,
      tickvals: [],
      ticktext: [],
    },
    yaxis: {
      showticklabels: true,
      range: [0, 100],
      fixedrange: true,
      showgrid: false,
      zeroline: false,
      visible: false,
    },
    shapes: [],
    annotations: [],
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
        const tempData: any = {
          x: [],
          y: [],
          text: [],
          mode: 'markers',
          type: 'scatter',
          marker: {
            color: "rgba(31,119,180,0)",
          },
          hoverinfo: "text",
        }

        const rowidPrecursorMap: any = {}


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
          rowidPrecursorMap[row.id] = row.Precursor_Id
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
          tempData.x.push((x1+x0)/2)
          tempData.y.push(y1)
          tempData.text.push(rowidPrecursorMap[i])

          // create annotation with id name
          graphLayout.shapes.push(lineShape)
        }
        graphLayout.yaxis.range = [0, highest]
        this.graphLayoutMap[group.first().Engine] = graphLayout
        // create array of number from 1 to protein_sequence.length step by 50
        const tickvals = []
        const ticktext = []
        for (let i=1; i<=this.coverageData.protein_sequence.length; i+=50) {
          tickvals.push(i)
          ticktext.push(i)
        }

        if (tickvals[tickvals.length-1] !== this.coverageData.protein_sequence.length) {
          tickvals.push(this.coverageData.protein_sequence.length)
          ticktext.push(this.coverageData.protein_sequence.length)
        }

        this.graphLayoutMap[group.first().Engine].xaxis.tickvals = tickvals
        this.graphLayoutMap[group.first().Engine].xaxis.ticktext = ticktext
        this.graphDataMap[group.first().Engine] = [tempData]
      })
      this.revision += 1
    }
  }

  updateDisplay() {
    this.displayDF = this.df.where((row) => {
      return row.Tissue === this.form.controls['tissues'].value
    })
    if (this.form.controls['valid_tau'].value === true) {
      this.displayDF = this.displayDF.where((row) => {
        return row.tau_POI !== null
      })

    }
    if (this.form.controls['selected_only'].value === true) {
      this.displayDF = this.displayDF.where((row) => {
          return this.web.settings.selectedMSDataID.includes(row.id)
      })
    }
    this.displayDF = this.displayDF.bake()
    this.engines = this.displayDF.getSeries("Engine").distinct().toArray()
    console.log(this.displayDF.count())
    this.drawCoveragePlot()
  }

  clickHandler(event: any) {
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
        const data= this.df.where((row) => {
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
}
