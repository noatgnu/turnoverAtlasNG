import { Component } from '@angular/core';
import {WebService} from "../web.service";
import {ToastService} from "../toast.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-database-stats',
  templateUrl: './database-stats.component.html',
  styleUrls: ['./database-stats.component.scss']
})
export class DatabaseStatsComponent {
  barGraphData: any[] = []
  barGraphLayout: any = {
    title: "Peptide identification distribution",
    width: 1000,
    xaxis: {
      title: "Tissue",
    },
    yaxis: {
      title: "Peptides",
    },
  }
  data: any[] = []
  data2: any[] = []
  revision = 0
  revision2 = 0
  form = this.fb.group({
    include_shared: [false,],
    valid_tau: [true,],
  })

  barChartData2: any[] = []
  barChartLayout2: any = {
    title: "Protein Id count distribution",
    width: 1000,
    xaxis: {
      title: "Tissue",
    },
    yaxis: {
      title: "Protein Ids",
    },
  }
  constructor(private web: WebService, private toast: ToastService, private fb: FormBuilder) {
    this.form.controls.include_shared.valueChanges.subscribe((data) => {
      this.data = []
      this.data2 = []
      if (data !== null) {
        // @ts-ignore
        this.updatePlot(data, this.form.controls.valid_tau.value)
      }
    })
    this.form.controls.valid_tau.valueChanges.subscribe((data) => {
      this.data = []
      this.data2 = []
      if (data !== null) {
        // @ts-ignore
        this.updatePlot(this.form.controls.include_shared.value, data)
      }
    })

    this.updatePlot()
  }

  drawBarChart() {
    const graphData: any[] = []
    let currentPosition = 0
    const temp: any = {}
    for (const i of this.data) {
      if (i.Engine !== "") {
        if (!temp[i.Engine]) {
          temp[i.Engine] = {
            x: [],
            y: [],
            name: i.Engine,
            type: 'bar'
          }
        }
        temp[i.Engine].x.push(i.Tissue)
        temp[i.Engine].y.push(i.n)
      }
      if (!temp[i.Engine]) {
        temp[i.Engine] = {
          x: [],
          y: [],
          name: i.Engine,
          type: 'bar'
        }
      }
    }
    for (const i in temp) {
      graphData.push(temp[i])
    }
    console.log(temp)
    this.barGraphData = graphData
    this.revision++
  }

  drawBarChart2() {
    const graphData: any[] = []
    const temp: any = {}
    for (const i of this.data2) {
      if (i.Engine !== "") {
        if (!temp[i.Engine]) {
          temp[i.Engine] = {
            x: [],
            y: [],
            name: i.Engine,
            type: 'bar'
          }
        }
        temp[i.Engine].x.push(i.Tissue)
        temp[i.Engine].y.push(i.n)
      }
      if (!temp[i.Engine]) {
        temp[i.Engine] = {
          x: [],
          y: [],
          name: i.Engine,
          type: 'bar'
        }
      }
    }
    for (const i in temp) {
      graphData.push(temp[i])
    }
    this.barChartData2 = graphData
    this.revision2++
  }

  updatePlot(include_shared = false, valid_tau = true) {
    // @ts-ignore
    this.web.getStats("Tissue,Engine", include_shared, "", valid_tau).subscribe((data) => {
      this.data = data.filter((i: any) => {
        return i.Tissue !== null;
      })
      this.drawBarChart()
    })
    // @ts-ignore
    this.web.getStats("Tissue,Engine", include_shared, "Protein_Ids", valid_tau).subscribe((data) => {
      this.data2 = data.filter((i: any) => {
        return i.Tissue !== null;
      })
      this.drawBarChart2()
    })
  }
}
