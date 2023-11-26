import {Component, Input} from '@angular/core';
import {DataFrame, IDataFrame} from "data-forge";
import {WebService} from "../web.service";

@Component({
  selector: 'app-average-halflife-barchart',
  templateUrl: './average-halflife-barchart.component.html',
  styleUrls: ['./average-halflife-barchart.component.scss']
})
export class AverageHalflifeBarchartComponent {
  private _data: IDataFrame<number, any> = new DataFrame()
  @Input() set data(value: IDataFrame<number, any>) {
    this._data = value
    this.drawGraph()
  }

  get data(): IDataFrame<number, any> {
    return this._data
  }

  graphData: any[] = []
  graphLayout: any = {
    margin: {
      l: 50,
      r: 50,
      b: 200,
      t: 100,
    },
    title: "",
    width: 450,
    height: 600,
    yaxis: {
      title: "Median Halflife",
      showticklabels: true,
    },
    xaxis: {
      title: "Tissue",
      type: "category",
      tickmode: "array",
      tickvals: [],
      ticktext: [],
    },
    legend: {
      orientation: 'h'
    }
  }
  revision = 0

  config: any = {
    toImageButtonOptions: {
      format: 'svg',
      scale: 1
    }
  }

  constructor(private web: WebService) {
    this.web.getSummary(this.web.settings.currentProteinGroup).subscribe((data) => {
      this.data = new DataFrame(data)
    })
    this.web.redrawSubject.subscribe((data) => {
      this.drawGraph()
    })
  }

  drawGraph() {
    const temp: any = {}
    this.graphLayout.xaxis.tickvals = []
    this.graphLayout.xaxis.ticktext = []
    let currentPosition = 0
    this.data.orderBy((row) => {
      return row["Tissue"]
    }).forEach((row) => {
      for (const e of this.web.engines) {
        if (!temp[e]) {
          temp[e] = {
            x: [],
            y: [],
            name: e,
            type: "bar",
          }
          if (this.web.settings.barChartColorMap[e]) {
            temp[e].marker = {
              color: this.web.settings.barChartColorMap[e]
            }
          } else {
            this.web.settings.barChartColorMap[e] = this.web.settings.defaultColorList[currentPosition]
            currentPosition++
            temp[e].marker = {
              color: this.web.settings.barChartColorMap[e].slice()
            }
            if (currentPosition >= this.web.settings.defaultColorList.length) {
              currentPosition = 0
            }
          }
        }
        temp[e].x.push(row["Tissue"])
        temp[e].y.push(row["HLMedian_"+e])
      }
      this.graphLayout.xaxis.tickvals.push(row["Tissue"])
      this.graphLayout.xaxis.ticktext.push(row["Tissue"])
    })

    this.graphData = Object.values(temp)
    this.graphLayout.width = this.graphData[0].x.length * 50 + 100
    this.graphLayout.title = `Halflife median`
    this.revision++
  }
}
