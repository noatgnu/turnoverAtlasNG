import {Component, Input} from '@angular/core';
import {WebService} from "../web.service";
import {DataFrame, IDataFrame} from "data-forge";

@Component({
  selector: 'app-protein-summary',
  templateUrl: './protein-summary.component.html',
  styleUrls: ['./protein-summary.component.scss']
})
export class ProteinSummaryComponent {
  private _proteinGroup: string = ""
  summary: IDataFrame<number, any> = new DataFrame()
  columns: string[] = []
  proteomicsDBID: string = ""
  secondaryUniProtAccs: string[] = []
  uniprotKbID: string = ""
  fullProteinName: string = ""
  exportFileTypes: string[] = ["csv", "tsv", "json"]
  @Input() set proteinGroup (value: string) {
    this._proteinGroup = value
    if (this._proteinGroup !=="") {
      this.web.getSummary(this._proteinGroup).subscribe((data) => {
        this.summary = new DataFrame(data)
        this.columns = this.summary.getColumnNames()
      })
      this.web.getUniprot(this._proteinGroup).subscribe((data) => {
        console.log(data)
        this.secondaryUniProtAccs = data["secondaryAccessions"]
        this.uniprotKbID = data["uniProtkbId"]
        this.fullProteinName = data["proteinDescription"]["recommendedName"]["fullName"]["value"]
        for (const i of data["uniProtKBCrossReferences"]) {
          if (i["database"] === "ProteomicsDB") {
            this.proteomicsDBID = i["id"]
          }
        }
      })
    }

  }

  get proteinGroup(): string {
    return this._proteinGroup
  }

  constructor(private web: WebService) {

  }

  exportHandler(fileType: string) {
    const delimiter = fileType.toLowerCase() === "csv" ? "," : "\t"
    let a = ""
    if (fileType === "json") {
      a = this.summary.toJSON()
    } else {
      // @ts-ignore
      a = this.summary.toCSV({delimiter: delimiter})
    }
    const blob = new Blob([a], {type: "text/plain;charset=utf-8"})
    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = `${this.proteinGroup}.${fileType.toLowerCase()}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
