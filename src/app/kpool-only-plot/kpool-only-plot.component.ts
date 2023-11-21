import {Component, Input} from '@angular/core';
import {ModelParameters} from "../modelling-data";

@Component({
  selector: 'app-kpool-only-plot',
  templateUrl: './kpool-only-plot.component.html',
  styleUrls: ['./kpool-only-plot.component.scss']
})
export class KpoolOnlyPlotComponent {
  private _data: ModelParameters[] = []
  graphData: any[] = []
  graphLayout: any = {
    title: "Kpool",
    xaxis: {
      title: "Days",
      range: [0, 50]
    },
    yaxis: {
      title: "H + H/L",
      range: [0, 1.2]
    }
  }
  @Input() set data (value: ModelParameters[]) {
    this._data = value
    this.drawGraph()
  }

  get data(): ModelParameters[] {
    return this._data
  }

  revision = 0
  constructor() { }

  drawGraph() {
    const graphData: any[] = []
    for (const i of this.data) {
      const temp: any = {
        x: [],
        y: [],
        mode: 'lines',
        line: {
          shape: 'spline',
        },
        name: i.Tissue + "-" + i.Engine
      }
      for (const i2 of i.k_pool) {
        temp.x.push(i2.day)
        temp.y.push(i2.value)
      }
      graphData.push(temp)
    }
    this.graphData = graphData
    this.revision++
  }
}
