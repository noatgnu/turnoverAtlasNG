import {Component, Input} from '@angular/core';
import {WebService} from "../web.service";

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

  private _useOverallCount: boolean = true

  @Input() set useOverallCount(value: boolean) {
    this._useOverallCount = value
    if (this.data.value.length > 0) {
      this.drawGraph()
    }


  }

  get useOverallCount(): boolean {
    return this._useOverallCount
  }

  graphData: any[] = []
  graphLayout: any = {

  }
  revision = 0
  constructor(private web: WebService) {
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
      width: 600,
      xaxis: {
        title: "log2(Tau)",
      },
      yaxis: {
        title: "Count",
      },
    }

    if (this.useOverallCount) {
      this.graphLayout.yaxis.range = [0, this.web.largestHistogramValue]
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
