import {Component, Input} from '@angular/core';
import {DataFrame, IDataFrame} from "data-forge";
import {MSData} from "../msdata";
import {WebService} from "../web.service";
import {ModelDataSimple} from "../modelling-data";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-protein-modelling-combine-dialog',
  templateUrl: './protein-modelling-combine-dialog.component.html',
  styleUrls: ['./protein-modelling-combine-dialog.component.scss']
})
export class ProteinModellingCombineDialogComponent {
  private _data: IDataFrame<number, MSData> = new DataFrame()
  tissue: string = ""
  engines: string[] = []
  hideNotSelected: boolean = false
  revision: number = 0
  @Input() set data(value: IDataFrame<number, MSData>) {
    this._data = value
    this.tissue = this._data.first().Tissue
    this.engines = this._data.getSeries("Engine").distinct().toArray()
    const modelParameters = this.web.modelParameters.filter((p) => {
      return p.Tissue === this.tissue && this.engines.includes(p.Engine)
    })
    for (let i = 0; i < modelParameters[0].k_pool.length; i++) {
      let total = 0
      const day = modelParameters[0].k_pool[i].day
      for (const m of modelParameters) {
        total += m.k_pool[i].value
      }
      this.combinedKpool.push({day: day, value: total/ modelParameters.length})
    }
    this.graphLayout.title = `${this.tissue} - ${this.engines.join(", ")}`
    this.drawGraph()
  }

  combinedKpool: ModelDataSimple[] = []

  get data(): IDataFrame<number, MSData> {
      return this._data
  }
  graphData: any[] = []
  graphLayout: any = {
    title: "",
    width: 800,
    height: 800,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
    },
    xaxis: {
      title: "Time (days)",
      range: this.web.settings.scatterPlotXAxisRange,
      showgrid: false,
      zeroline: false,
    },
    yaxis: {
      title: "H/(H+L)",
      range: this.web.settings.scatterPlotYAxisRange,
      ticklen: 5,
      showgrid: false,
      zeroline: false,
    },
    legend: {
      orientation: 'h'
    },
    shapes: [
      {
        type: 'line',
        x0: this.web.settings.scatterPlotXAxisRange[0],
        y0: this.web.settings.scatterPlotYAxisRange[0],
        x1: this.web.settings.scatterPlotXAxisRange[1],
        y1: this.web.settings.scatterPlotYAxisRange[0],
        line: {
          color: "black",
          width: 2,
        },
      },
      {
        type: 'line',
        x0: this.web.settings.scatterPlotXAxisRange[0],
        y0: this.web.settings.scatterPlotYAxisRange[0],
        x1: this.web.settings.scatterPlotXAxisRange[0],
        y1: this.web.settings.scatterPlotYAxisRange[1],
        line: {
          color: "black",
          width: 2,
        },
      },
    ]
  }

  form = this.fb.group({
    hideNotSelected: [false],
    kpoolColor: [this.web.settings.modellingKPoolColor],
    kpool: [true]
  })

  constructor(private web: WebService, private fb: FormBuilder) { }

  drawGraph() {
    const graphData: any[] = []
    if (this.form.value.kpool) {
      const kpool: any = {
        x: this.combinedKpool.map((x) => {return x.day}),
        y: this.combinedKpool.map((x) => {return x.value}),
        mode: 'lines',
        name: 'Free Lys pool',
        line: {
          color: this.web.settings.modellingKPoolColor,
          shape: 'spline',
        },
        showlegend: false,
        hovertemplate: `Day: %{x}<br>Value: %{y}<br>Free Lys pool`
      }
      graphData.push(kpool)
    }
    const dayData: {[key: string]: number[]} = {}
    this.data.forEach((i) => {
      let temp: any = {}
      if (this.web.settings.searchMap[i.id]) {
        temp = {
          x: i.tau_model.map((x) => {
            return x.day
          }),
          y: i.tau_model.map((x) => {
            if (!dayData[x.day]) {
              dayData[x.day] = []
            }
            dayData[x.day].push(x.value)
            return x.value
          }),
          text: i.tau_model.map((x) => {
            return `Day: ${x.day}<br>Value: ${x.value}<br>HalfLife: ${i.HalfLife_POI}<br>AverageRSS: ${i.AverageRSS}<br>${i.Precursor_Id}<br>${i.Engine}`
          }),
          mode: 'lines',
          data: i.id,
          name: i.Precursor_Id,
          line: {
            color: this.web.settings.colorMap[this.web.settings.searchMap[i.id][this.web.settings.searchMap[i.id].length -1]].slice(),
            shape: 'spline',
          },
          showlegend: false,
          hovertemplate: "%{text}"
        }
      } else {
        temp = {
          x: i.tau_model.map((x) => {
            return x.day
          }),
          y: i.tau_model.map((x) => {
            if (!dayData[x.day]) {
              dayData[x.day] = []
            }
            dayData[x.day].push(x.value)
            return x.value
          }),
          text: i.tau_model.map((x) => {
            return `Day: ${x.day}<br>Value: ${x.value}<br>HalfLife: ${i.HalfLife_POI}<br>AverageRSS: ${i.AverageRSS}<br>${i.Precursor_Id}<br>${i.Engine}`
          }),
          mode: 'lines',
          data: i.id,
          name: i.Precursor_Id,
          line: {
            color: "rgba(140,140,140,0.13)",
            shape: 'spline',
          },
          showlegend: false,
          hovertemplate: "%{text}"
        }
        if (this.form.value.hideNotSelected) {
          temp.line.color = "rgba(140,140,140,0)"
        }
      }
      graphData.push(temp)
      /*const tempDatapoint: any = {
        x: [],
        y: [],
        mode: 'markers',
        type: 'scatter',
        name: 'Data point',
        showlegend: false,
        hoverinfo: 'none',
        marker: {
          size: this.web.settings.scatterPlotMarkerSize,
          color: "rgba(110,108,108,0.38)",
        },
      }
      if (this.form.value.hideNotSelected) {
        tempDatapoint.marker.color = "rgba(110,108,108,0)"
      }
      for (const v of i.values) {
        if (this.web.settings.selectedSamples.includes(v.Sample_Name)) {
          if (v.Sample_H_over_HL !== null) {
            tempDatapoint.x.push(this.web.settings.sampleMap[v.Sample_Name].Days)
            tempDatapoint.y.push(v.Sample_H_over_HL)
          }
        }
      }
      graphData.push(tempDatapoint)*/
    })
    console.log(dayData)
    if (dayData) {
      const averageDayData: any = {
        x: [],
        y: [],
        mode: 'lines',
        name: 'Average',
        line: {

          shape: 'spline',
          smoothing: 1,
        },
        showlegend: false,
        hovertemplate: `Day: %{x}<br>Value: %{y}<br>Average`
      }
      const days = Object.keys(dayData)
      days.sort((a, b) => {return parseInt(a) - parseInt(b)})
      for (const day of days) {
        averageDayData.x.push(parseInt(day))
        averageDayData.y.push(dayData[day].reduce((a, b) => {return a + b}) / dayData[day].length)
      }
      //graphData.push(averageDayData)
      //console.log(averageDayData)
    }

    if (this.form.value.kpoolColor) {
      this.web.settings.modellingKPoolColor = this.form.value.kpoolColor
    }

    this.graphData = graphData
    this.revision += 1
  }
}
