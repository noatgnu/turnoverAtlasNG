import { Component } from '@angular/core';
import {WebService} from "./web.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private web: WebService) {
    this.web.getSampleMetadata().subscribe((data) => {
      for (const s of data) {
        this.web.sampleMap[s.Sample_Name] = s
      }
    })
  }
}
