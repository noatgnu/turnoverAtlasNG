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

  graphData: any[] = []
  graphLayout: any = {
    title: "",
    xaxis: {
      title: "Time (days)",
      range: [0, 50]
    },
    yaxis: {
      title: "H + H/L",
    },
    grid: {rows: 1, columns: 2, pattern: 'independent'},
    annotations: [],
    font: {
      family: "Arial",
      color: "black"
    }
  }
  constructor(private web: WebService) {
    this.web.redrawSubject.subscribe(() => {
      this.drawModel()
    })
  }

  drawModel() {
    const graphData: any[] = []
    let currentAxis = 1
    const axis: any = {

    }
    this.data.groupBy((row) => {
      return row.Engine
    }).bake().forEach((group) => {
      axis[group.first().Engine] = currentAxis
      for (const i of group) {
        const titleAnnotation: any = {
          xref: 'x',
          yref: 'y',
          x: 25,
          xanchor: 'right',
          y: 1,
          yanchor: 'bottom',
          text: i.Engine,
          showarrow: false,
          font: {
            family: "Arial",
            size: 30,
            color: "black"
          }
        }
        const temp: any = {
          x: [],
          y: [],
          mode: 'lines',
          name: i.Precursor_Id,
          line: {
            color: 'rgb(55, 128, 191)',
            shape: 'spline',
          },
          showlegend: false,
          hovertemplate: "Day: %{x}<br>Value: %{y}<br>"+i.Precursor_Id
        }
        if (currentAxis === 1) {
          temp.yaxis = 'y'
          temp.xaxis = 'y'
        } else {
          temp.yaxis = 'y' + currentAxis
          temp.xaxis = 'x' + currentAxis
          this.graphLayout['xaxis' + currentAxis] = {
            title: "Time (days)",
            range: [0, 50],
            anchor: 'y' + currentAxis,
          }
          this.graphLayout['yaxis' + currentAxis] = {
            title: "H + H/L",
            anchor: 'x' + currentAxis,
          }
          titleAnnotation.xref = 'x' + currentAxis
          titleAnnotation.yref = 'y' + currentAxis
        }

        this.graphLayout.annotations.push(titleAnnotation)
        temp.x = i.Data.map((x) => {
          return x.day
        })
        temp.y = i.Data.map((x) => {
          return x.value
        })

        graphData.push(temp)
      }
      currentAxis ++
    })
    this.graphLayout.grid.columns = currentAxis -1

    this.graphData = graphData

  }
}
