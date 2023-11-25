import {Component, Input} from '@angular/core';
import {MSData, MSDataValues} from "../msdata";
import {WebService} from "../web.service";

@Component({
  selector: 'app-scatter-time-plot',
  templateUrl: './scatter-time-plot.component.html',
  styleUrls: ['./scatter-time-plot.component.scss']
})
export class ScatterTimePlotComponent {
  private _data: MSData|undefined
  @Input() set data (value: MSData) {
    this._data = value
    this.drawGraph()
  }



  graphData: any[] = []

  graphLayout: any = {
    title: "Scatter Time Plot",
    width: 450,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
    },

    xaxis: {
      title: "",
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
  config: any = {
    //modeBarButtonsToRemove: ["toImage"]
    toImageButtonOptions: {
      format: 'svg',
      filename: this.graphLayout.title.text,
      height: this.graphLayout.height,
      width: this.graphLayout.width,
      scale: 1
    }
  }
  constructor(private web: WebService) {
    this.web.redrawSubject.subscribe(() => {
      this.drawGraph().then(() => {})
    })
  }

  async drawGraph() {
    if (this._data) {
      let days: number[] = []
      const daysMap: any = {}

      const graphData: any[] = []
      const temp: any = {
        x: [],
        y: [],
        mode: 'markers',
        type: 'scatter',
        name: 'Data point',
        marker: {
          size: this.web.settings.scatterPlotMarkerSize,
          color: this.web.settings.markerColor,
          line: {
            color: "black",
            width: 1
          }
        },

      }
      for (const i of this._data.values) {
        if (this.web.settings.selectedSamples.includes(i.Sample_Name)) {

          if (i.Sample_H_over_HL !== null) {
            temp.x.push(this.web.settings.sampleMap[i.Sample_Name].Days)
            temp.y.push(i.Sample_H_over_HL)
            if (!days.includes(this.web.settings.sampleMap[i.Sample_Name].Days)) {
              days.push(this.web.settings.sampleMap[i.Sample_Name].Days)
              daysMap[this.web.settings.sampleMap[i.Sample_Name].Days] = []
            }
            daysMap[this.web.settings.sampleMap[i.Sample_Name].Days].push(i.Sample_H_over_HL)
          }
        }
      }

      if (!days.includes(50)) {
        days.push(50)
      }
      if (!days.includes(0)) {
        days.push(0)
      }
      graphData.push(temp)
      if (this._data.tau_POI !== null) {

        const uppderBound: any = {
          x: [],
          y: [],
          mode: 'lines',
          name: 'Upper Bound',
          line: {
            shape: 'spline',
            color: this.web.settings.upperBoundPulseColor,
          },
          fill: 'tonextx',
        }
        const pulseModel: any = {
          x: [],
          y: [],
          mode: 'lines',
          name: 'Turnover Fit',
          line: {
            color: this.web.settings.pulseColor,
            shape: 'spline',
          },
        }
        const lowerBound: any = {
          x: [],
          y: [],
          mode: 'lines',
          name: 'Lower Bound',
          line: {
            shape: 'spline',
            color: this.web.settings.lowerBoundPulseColor,
          },
        }

        for (const i of this._data.tau_model) {
          lowerBound.x.push(i.day)
          lowerBound.y.push(i.tau_POI_lower_bound)
          pulseModel.x.push(i.day)
          pulseModel.y.push(i.value)
          uppderBound.x.push(i.day)
          uppderBound.y.push(i.tau_POI_upper_bound)

        }
        //graphData.push(kpoolModel)
        const pulsemodelWithoutName = JSON.parse(JSON.stringify(pulseModel))
        pulsemodelWithoutName.showlegend = false
        graphData.push(pulsemodelWithoutName)
        if (lowerBound.y.length > 1) {
          // check if more than half is below 0
          let count = 0
          for (const i of lowerBound.y) {
            if (i < 0) {
              count += 1
            }
          }

          if (count < lowerBound.y.length / 2) {
            graphData.push(lowerBound)
          }
        }

        if (uppderBound.y.length > 1) {
          let count = 0
          for (const i of uppderBound.y) {
            if (i < 0) {
              count += 1
            }
          }

          if (count < uppderBound.y.length / 2) {
            graphData.push(uppderBound)
          }
        }
        graphData.push(pulseModel)

        const kpoolData = await this.web.getKpool(this._data.Tissue, this._data.Engine, 1, 0, 51).toPromise()

        const kpoolModel: any = {
          x: [],
          y: [],
          mode: 'lines',
          name: 'Free Lys Pool',
          line: {
            color: this.web.settings.kpoolColor,
            shape: 'spline',
          }
        }

        for (const i of kpoolData.kpool) {
          kpoolModel.x.push(i.day)
          kpoolModel.y.push(i.value)
        }
        graphData.push(kpoolModel)

        // try {
        //   modelResult = await this.web.postModellingData(this._data.Tissue, this._data.Engine, this._data.tau_POI, this._data.tau_POI_upper_bound, this._data.tau_POI_lower_bound, days).toPromise()
        //   const kpoolModel: any = {
        //     x: [0],
        //     y: [0],
        //     mode: 'lines',
        //     name: 'Kpool Model',
        //     line: {
        //       color: 'rgb(219, 64, 82)',
        //       shape: 'spline',
        //     }
        //   }
        //
        //
        //   for (const i of modelResult.kpool) {
        //     kpoolModel.x.push(i.day)
        //     kpoolModel.y.push(i.value)
        //   }
        //
        //   //graphData.push(uppderBound)
        //   //graphData.push(lowerBound)
        //   console.log(modelResult)
        // } catch (e) {
        //   console.log(e)
        // }
      }

      this.graphData = graphData
    }

  }

}
