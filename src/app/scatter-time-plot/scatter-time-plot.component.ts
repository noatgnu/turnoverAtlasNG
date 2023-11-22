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
    xaxis: {
      title: "Time (days)",
      range: this.web.settings.scatterPlotXAxisRange
    },
    yaxis: {
      title: "H + H/L",
      range: this.web.settings.scatterPlotYAxisRange
    },
    legend: {
      orientation: 'h'
    },
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
        name: 'H + H/L Experimental',
        marker: {
          size: this.web.settings.scatterPlotMarkerSize,
          color: this.web.settings.markerColor,
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
        const pulseModel: any = {
          x: [0],
          y: [0],
          mode: 'lines',
          name: 'Pulse Model',
          line: {
            color: this.web.settings.pulseColor,
            shape: 'spline',
          }
        }
        const uppderBound: any = {
          x: [0],
          y: [0],
          mode: 'lines',
          name: 'Pulse Model Upper Bound',
          line: {
            shape: 'spline',
            color: this.web.settings.upperBoundPulseColor,
          }
        }

        const lowerBound: any = {
          x: [0],
          y: [0],
          mode: 'lines',
          name: 'Pulse Model Lower Bound',
          line: {
            shape: 'spline',
            color: this.web.settings.lowerBoundPulseColor,
          }
        }

        for (const i of this._data.tau_model) {
          pulseModel.x.push(i.day)
          pulseModel.y.push(i.value)
          uppderBound.x.push(i.day)
          uppderBound.y.push(i.tau_POI_upper_bound)
          lowerBound.x.push(i.day)
          lowerBound.y.push(i.tau_POI_lower_bound)
        }
        //graphData.push(kpoolModel)
        graphData.push(pulseModel)
        graphData.push(uppderBound)
        graphData.push(lowerBound)
        const kpoolData = await this.web.getKpool(this._data.Tissue, this._data.Engine, 1, 0, 51).toPromise()

        const kpoolModel: any = {
          x: [],
          y: [],
          mode: 'lines',
          name: 'Kpool Model',
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
