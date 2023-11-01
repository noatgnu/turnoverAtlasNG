import {Component, Input} from '@angular/core';
import {MSData} from "../msdata";
import {DataFrame, IDataFrame} from "data-forge";
import {WebService} from "../web.service";

@Component({
  selector: 'app-protein-tau-distribution',
  templateUrl: './protein-tau-distribution.component.html',
  styleUrls: ['./protein-tau-distribution.component.sass']
})
export class ProteinTauDistributionComponent {
  private _data: IDataFrame<number, MSData> = new DataFrame()
  @Input() set data(value: IDataFrame<number, MSData>) {
    this._data = value
    this.drawGraph()
  }
  get data(): IDataFrame<number, MSData> {
    return this._data
  }
  graphDataMap: any = {}
  graphLayoutBase: any = {
    title: "",
    xaxis: {
      title: "Tissue",
      type: "category",
      tickmode: "array",
    },
    yaxis: {
        title: "log2(TAU)",
    },
    annotations: [],
    font: {
        family: "Arial",
        color: "black"
    }
  }
  graphLayoutMap: any = {

  }
  constructor(private web: WebService) {
    this.web.redrawSubject.subscribe(() => {
      this.drawGraph()
    })
  }
  engineList: string[] = []
  drawGraph() {
    // draw box plot for tau distribution with y-axis being tau value and x axis being tissue, the box plot should also show individual data points as well with the data points being on the left outside of the box plot
    const temp: any = {}

    for (const row of this.data) {
      if (!(row.Engine in temp)) {
        temp[row.Engine] = {}
      }
      if (!(row.Tissue in temp[row.Engine])) {
        temp[row.Engine][row.Tissue] = {
          x: [],
          y: [],
          text: [],
          data: row,
          name: row.Tissue,
          type: "box",
          boxpoints: "all",
          jitter: 0.3,
          pointpos: -1.8,
          showlegend: false,
          marker: {
            color: "rgba(70,54,159,0.56)",
          },
          line: {
            color: "rgba(0,0,0,1)",
          },
          fillcolor: "rgba(236,96,99,0.78)",
          hovertemplate: "Tissue: %{x}<br>log2(TAU): %{y}<br>Precursor ID: %{text}<extra></extra>"
        }

      }
      temp[row.Engine][row.Tissue].x.push(row.Tissue)
      temp[row.Engine][row.Tissue].y.push(Math.log2(row.tau_POI))
      temp[row.Engine][row.Tissue].text.push(row.Precursor_Id)
    }
    for (const engine in temp) {
      if (!(engine in this.graphLayoutMap)) {
        this.graphLayoutMap[engine] = Object.assign({}, this.graphLayoutBase)
        this.graphLayoutMap[engine].title = engine
        this.graphDataMap[engine] = []
      }
      for (const tissue in temp[engine]) {
        this.graphDataMap[engine].push(temp[engine][tissue])
      }
    }
    this.engineList = Object.keys(this.graphLayoutMap)
  }

}
