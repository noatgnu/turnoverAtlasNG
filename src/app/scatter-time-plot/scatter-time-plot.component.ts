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
      range: [0, 50]
    },
    yaxis: {
      title: "H/L",
      range: [0, 1.5]
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
          size: 12
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
      days = days.sort((a,b) => a-b)
      graphData.push(temp)

      let modelResult: any
      if (this._data.tau_POI !== null) {
        const pulseModel: any = {
          x: [0],
          y: [0],
          mode: 'lines',
          name: 'Pulse Model',
          line: {
            color: 'rgb(55, 128, 191)',
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
            color: 'rgb(155,41,113)',
          }
        }

        const lowerBound: any = {
          x: [0],
          y: [0],
          mode: 'lines',
          name: 'Pulse Model Lower Bound',
          line: {
            shape: 'spline',
            color: 'rgb(41,155,43)',
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
