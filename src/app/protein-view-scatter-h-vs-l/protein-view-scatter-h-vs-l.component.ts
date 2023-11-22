import {Component, Input} from '@angular/core';
import {MSData} from "../msdata";
import {DataFrame, IDataFrame} from "data-forge";
import {WebService} from "../web.service";

@Component({
  selector: 'app-protein-view-scatter-h-vs-l',
  templateUrl: './protein-view-scatter-h-vs-l.component.html',
  styleUrls: ['./protein-view-scatter-h-vs-l.component.scss']
})
export class ProteinViewScatterHVsLComponent {
  private _data: IDataFrame<number, MSData> = new DataFrame()
  tissueName: string = ""
  @Input() set data (values: IDataFrame<number, MSData>) {
    this._data = values
    this.tissueName = this._data.first().Tissue
    this.drawGraph()
  }

  get data(): IDataFrame<number, MSData> {
    return this._data
  }

  graphData: any[] = []
  graphLayout: any = {
    title: this.tissueName,
    xaxis: {
      title: "Log2 H",
    },
    yaxis: {
      title: "Log2 L",
    },

  }

  constructor(private web: WebService) { }

  drawGraph() {
    const graphData: any[] = []
    const temp: any = {

    }
    this.data.forEach((row) => {
      if (!(row.Engine in temp)) {
        temp[row.Engine] = {
          x: [],
          y: [],
          text: [],
          mode: 'markers',
          type: 'scatter',
          marker: {
            size: 5,
            color: this.web.settings.colorMap[row.Engine]
          },
          name: row.Engine
        }
      }
      row.values.forEach((value) => {
        if (value.Sample_H_over_HL !== null) {
          temp[row.Engine].x.push(Math.log2(value.SampleH))
          temp[row.Engine].y.push(Math.log2(value.SampleL))
          temp[row.Engine].text.push(`${value.Sample_Name}<br> ${row.Precursor_Id}<br> H/L: ${value.Sample_H_over_HL}<br> ${row.Engine}`)
        }
      })
    })
    for (const i in temp) {
      graphData.push(temp[i])
    }
    this.graphLayout.title = this.tissueName
    this.graphData = graphData
  }
}
