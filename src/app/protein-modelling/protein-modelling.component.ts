import {Component, Input} from '@angular/core';
import {DataFrame, IDataFrame} from "data-forge";
import {Modelling} from "../modelling-data";
import {WebService} from "../web.service";
import {MSData} from "../msdata";
import {ToastService} from "../toast.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  ProteinModellingCombineDialogComponent
} from "../protein-modelling-combine-dialog/protein-modelling-combine-dialog.component";

@Component({
  selector: 'app-protein-modelling',
  templateUrl: './protein-modelling.component.html',
  styleUrls: ['./protein-modelling.component.scss']
})
export class ProteinModellingComponent {
  private _data: IDataFrame<number, MSData> = new DataFrame()
  private _hideNotSelected: boolean = false
  revision: number = 0
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
  config: any = {
    //modeBarButtonsToRemove: ["toImage"]
    toImageButtonOptions: {
      format: 'svg',
      scale: 1
    }
  }
  graphData: any[] = []
  graphLayout: any = {
    title: "",
    width: 450,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
    },
    xaxis: {
      title: "Time (days)",
      range: this.web.settings.scatterPlotXAxisRange,
      showgrid: false,
      zeroline: false,
    },
    yaxis: {
      title: "H/(H+L)",
      range: this.web.settings.scatterPlotYAxisRange,
      ticklen: 5,
      showgrid: false,
      zeroline: false,
    },
    legend: {
      orientation: 'h'
    },
    shapes: [
      {
        type: 'line',
        x0: this.web.settings.scatterPlotXAxisRange[0],
        y0: this.web.settings.scatterPlotYAxisRange[0],
        x1: this.web.settings.scatterPlotXAxisRange[1],
        y1: this.web.settings.scatterPlotYAxisRange[0],
        line: {
          color: "black",
          width: 2,
        },
      },
      {
        type: 'line',
        x0: this.web.settings.scatterPlotXAxisRange[0],
        y0: this.web.settings.scatterPlotYAxisRange[0],
        x1: this.web.settings.scatterPlotXAxisRange[0],
        y1: this.web.settings.scatterPlotYAxisRange[1],
        line: {
          color: "black",
          width: 2,
        },
      },
    ]
  }

  engines: string[] = []

  constructor(private web: WebService, private toasts: ToastService, private modal: NgbModal) {
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
      console.log(model)
      if (model.length > 0 && this.web.settings.modellingKPool) {
        const temp: any = {
          x: model[0].k_pool.map((x) => {return x.day}),
          y: model[0].k_pool.map((x) => {return x.value}),
          mode: 'lines',
          name: 'Free Lys pool',
          line: {
            color: this.web.settings.modellingKPoolColor,
            shape: 'spline',
          },
          showlegend: false,
          hovertemplate: `Day: %{x}<br>Value: %{y}<br>Free Lys pool`
        }
        graphDataMap[group.first().Engine].push(temp)
      }

      for (const i of group) {
        if (this.web.settings.searchMap[i.id]) {
          const temp: any = {
            x: i.tau_model.map((x) => {
              return x.day
            }),
            y: i.tau_model.map((x) => {
              return x.value
            }),
            text: i.tau_model.map((x) => {
              return `Day: ${x.day}<br>Value: ${x.value}<br>HalfLife: ${i.HalfLife_POI}<br>AverageRSS: ${i.AverageRSS}<br>${i.Precursor_Id}`
            }),
            mode: 'lines',
            data: i.id,
            name: i.Precursor_Id,
            line: {
              color: this.web.settings.colorMap[this.web.settings.searchMap[i.id][this.web.settings.searchMap[i.id].length -1]].slice(),
              shape: 'spline',
            },
            showlegend: false,
            hovertemplate: "%{text}"
          }
          graphDataMap[group.first().Engine].push(temp)
        } else {
          const temp: any = {
            x: i.tau_model.map((x) => {
              return x.day
            }),
            y: i.tau_model.map((x) => {
              return x.value
            }),
            text: i.tau_model.map((x) => {
              return `Day: ${x.day}<br>Value: ${x.value}<br>HalfLife: ${i.HalfLife_POI}<br>AverageRSS: ${i.AverageRSS}<br>${i.Precursor_Id}`
            }),
            mode: 'lines',
            data: i.id,
            name: i.Precursor_Id,
            line: {
              color: "rgba(140,140,140,0.13)",
              shape: 'spline',
            },
            showlegend: false,
            hovertemplate: "%{text}"
          }
          if (this.hideNotSelected) {
            temp.line.color = "rgba(140,140,140,0)"
          }
          graphDataMap[group.first().Engine].push(temp)
        }
      }
    })
    this.graphDataMap = graphDataMap
    this.graphLayoutMap = graphLayoutMap
    this.engines = Object.keys(graphDataMap)
    this.revision += 1
  }

  OnClick(event: any) {
    if ("points" in event) {

        const precursorIds: string[] = []
        for (const i of event.points) {
          precursorIds.push(i.data.name)
          this.web.setOperationColor(i.data.name)
          this.web.settings.searchOperations.push(i.data.name)
        }
        const data= this.data.where((row) => {
            return precursorIds.includes(row.Precursor_Id)
        }).bake()

      const ids: number[] = []
      data.forEach((row) => {
        ids.push(row.id)
        if (!this.web.settings.searchMap[row.id]) {
          this.web.settings.searchMap[row.id] = []
        }
        if (!this.web.settings.searchMap[row.id].includes(row.Precursor_Id)) {
          this.web.settings.searchMap[row.id].push(row.Precursor_Id)
        }
      })

      if (ids.length > 0) {
          this.web.selectionHandler(ids)
      }
    }
  }

  combine() {
    const ref = this.modal.open(ProteinModellingCombineDialogComponent, {size: "xl"})
    ref.componentInstance.data = this.data
  }
}
