import { Component } from '@angular/core';
import {WebService} from "./web.service";
import {ToastService} from "./toast.service";
import {forkJoin} from "rxjs";
import {AccountsService} from "./accounts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ready = false
  constructor(private web: WebService, private toastService: ToastService, private accounts: AccountsService) {
    this.initialize()
    this.web.initializeModelParameters.asObservable().subscribe(data => {
      this.initialize()
    })
  }

  initialize() {
    if (this.accounts.token === "") {
      const token = localStorage.getItem("token")
      console.log(token)
      if (token) {
        this.accounts.token = token
        this.accounts.loggedIn = true
      }
    }

    forkJoin([ this.web.getSampleMetadata(), this.web.getAllModelParameters()]).subscribe(
      (data) => {
        this.toastService.show('Initialization', 'Loading sample metadata and model parameters...')
        for (const s of data[0]) {
          this.web.settings.sampleMap[s.Sample_Name] = s
        }
        this.web.modelParameters = data[1]
        this.ready = true
      }, (error) => {
        this.toastService.show('Initialization', 'Error loading sample metadata and model parameters. Please log in.')
        this.ready = true
      }
    )
  }
}
