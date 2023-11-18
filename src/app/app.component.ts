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
  constructor(private web: WebService, private toastService: ToastService) {
    this.initialize()
    this.web.initializeModelParameters.asObservable().subscribe(data => {
      this.initialize()
    })
  }

  initialize() {
    forkJoin([ this.web.getSampleMetadata(), this.web.getAllModelParameters()]).subscribe(
      (data) => {
        this.toastService.show('Initialization', 'Loading sample metadata and model parameters...')
        for (const s of data[0]) {
          this.web.settings.sampleMap[s.Sample_Name] = s
        }
        this.web.modelParameters = data[1]
      }, (error) => {
        this.toastService.show('Initialization', 'Error loading sample metadata and model parameters. Please log in.')
      }
    )
  }
}
