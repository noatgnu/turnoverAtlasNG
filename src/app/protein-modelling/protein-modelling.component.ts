import {Component, Input} from '@angular/core';
import {DataFrame, IDataFrame} from "data-forge";
import {Modelling} from "../modelling-data";
import {WebService} from "../web.service";

@Component({
  selector: 'app-protein-modelling',
  templateUrl: './protein-modelling.component.html',
  styleUrls: ['./protein-modelling.component.sass']
})
export class ProteinModellingComponent {
  private _data: IDataFrame<number, Modelling> = new DataFrame()
  @Input() set data(value: IDataFrame<number, Modelling>) {
    this._data = value
    this.drawModel()
  }
  get data(): IDataFrame<number, Modelling> {
    return this._data
  }
  graphDataMap: any = {}
  graphLayoutMap: any = {}

  graphData: any[] = []
  graphLayout: any = {
    title: "",
    width: 400,
    xaxis: {
      title: "Time (days)",
      range: [0, 50]
    },
    yaxis: {
      title: "H + H/L",
    },
    annotations: [],
    font: {
      family: "Arial",
      color: "black"
    }
  }

  engines: string[] = []

  constructor(private web: WebService) {
    this.web.redrawSubject.subscribe(() => {
      this.drawModel()
    })
  }

  drawModel() {
    const graphDataMap: any = {}
    const graphLayoutMap: any = {}
    this.data.groupBy((row) => {
      return row.Engine
    }).bake().forEach((group) => {
      graphDataMap[group.first().Engine] = []
      graphLayoutMap[group.first().Engine] = Object.assign({}, this.graphLayout)
      graphLayoutMap[group.first().Engine].title = group.first().Engine
      for (const i of group) {
        const temp: any = {
          x: [],
          y: [],
          mode: 'lines',
          name: i.Precursor_Id,
          line: {
            color: 'rgb(55, 128, 191, 0.5)',
            shape: 'spline',
          },
          showlegend: false,
          hovertemplate: "Day: %{x}<br>Value: %{y}<br>"+i.Precursor_Id
        }

        temp.x = i.Data.map((x) => {
          return x.day
        })
        temp.y = i.Data.map((x) => {
          return x.value
        })

        graphDataMap[group.first().Engine].push(temp)
      }
    })
    this.graphDataMap = graphDataMap
    this.graphLayoutMap = graphLayoutMap
    this.engines = Object.keys(graphDataMap)
  }
}
