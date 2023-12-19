import { Component } from '@angular/core';
import {WebService} from "../web.service";
import {DataFrame} from "data-forge";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  data: DataFrame = new DataFrame()
  columns: string[] = []
  private _iscollapse: boolean = true
  set iscollapse(value: boolean) {
    this._iscollapse = value
  }
  get iscollapse(): boolean {
    return this._iscollapse
  }
  constructor(private web: WebService) {
    const payload: any = {
      ProteinGroup: this.web.settings.currentProteinGroup,
      average_rss: 0,
      rss: 0,
    }
    if (this.web.settings.form["maxAverageRSS"] && this.web.settings.form["maxAverageRSS"] !== null) {
      payload["average_rss"] = this.web.settings.form["maxAverageRSS"]
    }
    if (this.web.settings.form["maxRSS"] && this.web.settings.form["maxRSS"] !== null) {
      payload["rss"] = this.web.settings.form["maxRSS"]
    }

    this.web.getSummary(payload.ProteinGroup, payload.average_rss, payload.rss).subscribe((data) => {
      this.data = new DataFrame(data)
      this.columns = this.data.getColumnNames()
    })

    this.web.redrawSubject.subscribe((data) => {
      if (this.web.settings.form["maxAverageRSS"] && this.web.settings.form["maxAverageRSS"] !== null) {
        payload["average_rss"] = this.web.settings.form["maxAverageRSS"]
      } else {
        payload["average_rss"] = 0
      }
      if (this.web.settings.form["maxRSS"] && this.web.settings.form["maxRSS"] !== null) {
        payload["rss"] = this.web.settings.form["maxRSS"]
      } else {
        payload["rss"] = 0
      }

      this.web.getSummary(payload.ProteinGroup, payload.average_rss, payload.rss).subscribe((data) => {
        this.data = new DataFrame(data)
        this.columns = this.data.getColumnNames()
      })
    })
  }


  exportHandler(fileType: string) {
    const delimiter = fileType.toLowerCase() === "csv" ? "," : "\t"
    let a = ""
    if (fileType === "json") {
      a = this.data.toJSON()
    } else {
      // @ts-ignore
      a = this.summary.toCSV({delimiter: delimiter})
    }
    const blob = new Blob([a], {type: "text/plain;charset=utf-8"})
    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = `${this.web.settings.currentProteinGroup}.${fileType.toLowerCase()}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

}
