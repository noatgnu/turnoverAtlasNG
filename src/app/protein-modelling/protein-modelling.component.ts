import {Component, Input} from '@angular/core';
import {DataFrame, IDataFrame} from "data-forge";
import {Modelling} from "../modelling-data";
import {WebService} from "../web.service";
import {MSData} from "../msdata";

@Component({
  selector: 'app-protein-modelling',
  templateUrl: './protein-modelling.component.html',
  styleUrls: ['./protein-modelling.component.scss']
})
export class ProteinModellingComponent {
  private _data: IDataFrame<number, MSData> = new DataFrame()
  private _hideNotSelected: boolean = false
  @Input()  set hideNotSelected(value: boolean) {
    this._hideNotSelected = value
    this.drawModel()
  }
    get hideNotSelected(): boolean {
        return this._hideNotSelected
    }
  @Input() set data(value: IDataFrame<number, MSData>) {
    this._data = value
    this.drawModel()
  }
  get data(): IDataFrame<number, MSData> {
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
    console.log(this.data)
    this.data.groupBy((row) => {
      return row.Engine
    }).bake().forEach((group) => {
      graphDataMap[group.first().Engine] = []
      graphLayoutMap[group.first().Engine] = Object.assign({}, this.graphLayout)
      graphLayoutMap[group.first().Engine].title = group.first().Engine
      const model = this.web.modelParameters.filter((row) => {
        return row.Engine === group.first().Engine && row.Tissue === group.first().Tissue
      })

      if (model.length > 0) {
        const temp: any = {
          x: model[0].k_pool.map((x) => {return x.day}),
          y: model[0].k_pool.map((x) => {return x.value}),
          mode: 'lines',
          name: 'K optimized',
          line: {
            color: 'rgba(191,55,55,0.5)',
            shape: 'spline',
          },
          showlegend: false,
          hovertemplate: `Day: %{x}<br>Value: %{y}<br>K optimized`
        }
        graphDataMap[group.first().Engine].push(temp)
      }

      for (const i of group) {
        const temp: any = {
          x: i.tau_model.map((x) => {
            return x.day
          }),
          y: i.tau_model.map((x) => {
            return x.value
          }),
          mode: 'lines',
          data: i.id,
          name: i.Precursor_Id,
          line: {
            color: "rgba(140,140,140,0.13)",
            shape: 'spline',
          },
          showlegend: false,
          hovertemplate: "Day: %{x}<br>Value: %{y}<br>"+i.Precursor_Id
        }

        if (this.web.selectedMSDataID.includes(i.id)) {
          temp.line.color = this.web.colorMap[i.Precursor_Id].slice()
        } else {
          if (this.hideNotSelected) {
            temp.line.color = "rgba(140,140,140,0)"
          }
        }

        graphDataMap[group.first().Engine].push(temp)
      }
    })
    this.graphDataMap = graphDataMap
    this.graphLayoutMap = graphLayoutMap
    this.engines = Object.keys(graphDataMap)
  }

  OnClick(event: any) {
    if ("points" in event) {

        const precursorIds: string[] = []
        for (const i of event.points) {
          precursorIds.push(i.data.name)
          this.web.setPrecurorIDColor(i.data.name)
        }
        const ids= this.data.where((row) => {
            return precursorIds.includes(row.Precursor_Id)
        }).bake().getSeries("id").toArray().map((x) => {return x as number})

        if (ids.length > 0) {
            this.web.selectionHandler(ids)
        }
    }
  }
}
