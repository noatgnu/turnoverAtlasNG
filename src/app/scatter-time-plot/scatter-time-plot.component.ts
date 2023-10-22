import {Component, Input} from '@angular/core';
import {MSDataValues} from "../msdata";
import {WebService} from "../web.service";

@Component({
  selector: 'app-scatter-time-plot',
  templateUrl: './scatter-time-plot.component.html',
  styleUrls: ['./scatter-time-plot.component.sass']
})
export class ScatterTimePlotComponent {
  private _data: MSDataValues[] = []
  @Input() set data (value: MSDataValues[]) {
    this._data = value
    this.drawGraph()
  }

  graphData: any[] = []

  graphLayout: any = {
    title: "Scatter Time Plot",
    xaxis: {
      title: "Time (days)",
    },
    yaxis: {
      title: "H/L",
      range: [0, 1]
    }
  }

  constructor(private web: WebService) {
    this.web.redrawSubject.subscribe(() => {
      this.drawGraph()
    })
  }

  drawGraph() {
    const graphData: any[] = []
    const temp: any = {
      x: [],
      y: [],
      mode: 'markers',
      type: 'scatter',
      name: 'H/L',
      marker: {
        size: 12
      }
    }
    for (const i of this._data) {
      if (this.web.selectedSamples.includes(i.Sample_Name)) {
        temp.x.push(this.web.sampleMap[i.Sample_Name].Days)
        temp.y.push(i.Sample_H_over_HL)
      }
    }
    graphData.push(temp)
    this.graphData = graphData
  }

}
