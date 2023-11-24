import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tau-histogram',
  templateUrl: './tau-histogram.component.html',
  styleUrls: ['./tau-histogram.component.scss']
})
export class TauHistogramComponent {
  private _data: {Tissue: string, Engine: string, value: number[], bins: number[]} = {Tissue: '', Engine: '', value: [], bins: []}

  @Input() set data(value: {Tissue: string, Engine: string, value: number[], bins: number[]}) {
    this._data = value
    this.drawGraph()
  }

  get data(): {Tissue: string, Engine: string, value: number[], bins: number[]} {
    return this._data
  }

  graphData: any[] = []
  graphLayout: any = {

  }
  revision = 0
  constructor() {
  }

  drawGraph() {
    this.graphData = [
      {
        x: this.data.bins,
        y: this.data.value,
        type: 'bar',
        marker: {
          color: '#1f77b4',
        },
      }
    ]
    this.graphLayout = {
      width: 800,
      xaxis: {
        title: "log2(Tau)",
      },
      yaxis: {
        title: "Count",
      },
    }
    if (this.data.Tissue !== "all") {
      this.graphLayout.title = this.data.Engine
    } else {
      this.graphLayout.title = "Overall distribution"
      this.graphLayout.width = 1200
    }
    this.revision++
  }

}
