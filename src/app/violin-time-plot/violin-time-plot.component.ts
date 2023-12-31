import {Component, Input} from '@angular/core';
import {MSDataValues} from "../msdata";
import {WebService} from "../web.service";

@Component({
  selector: 'app-violin-time-plot',
  templateUrl: './violin-time-plot.component.html',
  styleUrls: ['./violin-time-plot.component.scss']
})
export class ViolinTimePlotComponent {
  private _data: MSDataValues[] = []
  @Input() set data (value: MSDataValues[]) {
    this._data = value
    this.drawGraph()
  }

  graphData: any[] = []

  graphLayout: any = {
    title: "Violin Time Plot",
    xaxis: {
      title: "Time (days)",
      tickvals: [],
      ticktext: [],
      fixedrange: true
    },
    yaxis: {
      title: "H/L"
    }

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
      this.drawGraph()
    })
  }

  drawGraph() {
    const graphData: any[] = []
    const temp: any = {}
    let position = 0

    this._data.forEach((i) => {
      if (this.web.settings.selectedSamples.includes(i.Sample_Name)) {
        if (i.Sample_H_over_HL !== null) {
          if (!(temp[this.web.settings.sampleMap[i.Sample_Name].Days])) {
            temp[this.web.settings.sampleMap[i.Sample_Name].Days] = {
              x: [],
              y: [],
              type: 'violin',
              name: this.web.settings.sampleMap[i.Sample_Name].Days,
              box: {
                visible: true
              },
              showlegend: false,
              spanmode: 'soft',
              meanline: {
                visible: true
              },
              line: {
                color: "black"
              },
              points: 'all',
            }
            if (position >= this.web.settings.defaultColorList.length) {
              position = 0
            }
            temp[this.web.settings.sampleMap[i.Sample_Name].Days].fillcolor = this.web.settings.defaultColorList[position]
            position += 1
            this.graphLayout.xaxis.tickvals.push(this.web.settings.sampleMap[i.Sample_Name].Days)
            this.graphLayout.xaxis.ticktext.push(this.web.settings.sampleMap[i.Sample_Name].Days)
          }
          temp[this.web.settings.sampleMap[i.Sample_Name].Days].x.push(this.web.settings.sampleMap[i.Sample_Name].Days)
          temp[this.web.settings.sampleMap[i.Sample_Name].Days].y.push(i.Sample_H_over_HL)
        }
      }
    })
    for (const i in temp) {
      graphData.push(temp[i])
    }
    this.graphData = graphData
  }
}
