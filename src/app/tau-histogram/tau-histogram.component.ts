import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Output() selectionEvent: EventEmitter<{from: string, index: number}> = new EventEmitter<{from: string; index: number}>()

  @Input() set useOverallCount(value: boolean) {
    this._useOverallCount = value
    if (this.data.value.length > 0) {
      this.drawGraph()
    }
  }

  @Input() set highlightColumn(data: {from: string, index: number}) {
    if (data.from !== this.data.Tissue+this.data.Engine && data.index !== -1) {
      this.highlight(data.index)
    }
  }

  config: any = {
    //modeBarButtonsToRemove: ["toImage"]
    toImageButtonOptions: {
      format: 'svg',
      scale: 1
    }
  }
  get useOverallCount(): boolean {
    return this._useOverallCount
  }

  graphData: any[] = []
  graphLayout: any = {
    margin: {
      l:50,
      r: 0,
      b: 50,
      t: 50
    },
    yaxis: {
      title: "Count",
    },
    xaxis: {
      title: "log2(Tau)",
    },
    bargap: 0,
    shapes: [],
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
          color: Array(this.data.value.length).fill("#1f77b4"),
        },
      }
    ]
    this.graphLayout.width = 200 + 50
    this.graphLayout.yaxis.range = [Math.min(...this.data.bins), Math.max(...this.data.bins)]
    if (this.useOverallCount) {
      this.graphLayout.yaxis.range = [0, this.web.largestHistogramValue]
      this.graphLayout.yaxis.autorange = false
    } else {
      this.graphLayout.yaxis.range = [0, Math.max(...this.data.value)]
    }
    if (this.data.Tissue !== "all") {
      this.graphLayout.title = this.data.Tissue + " " + this.data.Engine
    } else {
      this.graphLayout.title = "Overall distribution"
      this.graphLayout.width = 1200
    }
    this.revision++
  }

  // on click turn the selected bar red if it is already red, restore the color back to normal
  clickHandler(event: any) {
    this.highlight(event.points[0].pointIndex)
    console.log(event)
    this.selectionEvent.emit({from: this.data.Tissue+this.data.Engine, index: event.points[0].pointIndex})
  }

  highlight(indexPosition: number) {
    if (this.graphData.length > 0) {
      if (this.graphData[0].marker.color[indexPosition] === "#ff0000") {
        this.graphData[0].marker.color[indexPosition] = "#1f77b4"
      } else {
        this.graphData[0].marker.color[indexPosition] = "#ff0000"
      }
      this.graphData[0].marker.color = [...this.graphData[0].marker.color]
      this.revision++
    }
  }
}
