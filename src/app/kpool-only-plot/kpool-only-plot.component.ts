import {Component, Input} from '@angular/core';
import {ModelParameters} from "../modelling-data";
import {WebService} from "../web.service";

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
      range: [0, 1]
    }
  }
  @Input() set data (value: ModelParameters[]) {
    this._data = value
    this.drawGraph()
  }

  get data(): ModelParameters[] {
    return this._data
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
  revision = 0
  constructor(private web: WebService) {
    this.web.redrawSubject.subscribe((data) => {
      this.drawGraph()
    })
  }

  drawGraph() {
    const graphData: any[] = []
    let currentPosition = 0
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
      if (!this.web.settings.kpoolColor[temp.name]) {
        this.web.settings.kpoolOnlyColorMap[temp.name] = this.web.settings.defaultColorList[currentPosition]
        currentPosition++
        if (currentPosition >= this.web.settings.defaultColorList.length) {
          currentPosition = 0
        }
      }
      temp.line.color = this.web.settings.kpoolOnlyColorMap[temp.name]
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
