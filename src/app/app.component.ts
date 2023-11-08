import { Component } from '@angular/core';
import {WebService} from "./web.service";
import {ToastService} from "./toast.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ready: boolean = false
  constructor(private web: WebService, private toastService: ToastService) {
    forkJoin([ this.web.getSampleMetadata(), this.web.getAllModelParameters()]).subscribe(
      (data) => {
        this.toastService.show('Initialization', 'Loading sample metadata and model parameters...')
        for (const s of data[0]) {
          this.web.settings.sampleMap[s.Sample_Name] = s
        }
        this.web.modelParameters = data[1]
        this.ready = true
      }
    )
  }
}
