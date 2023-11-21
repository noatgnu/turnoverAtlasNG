import { Component } from '@angular/core';
import {AccountsService} from "../accounts.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ToastService} from "../toast.service";
import {WebService} from "../web.service";
import {ModelParameters} from "../modelling-data";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  activeId: number = 1
  form = this.fb.group({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
    remember: new FormControl<boolean>(false)
  })
  activePanel: number|null = null

  selectedModel: ModelParameters[] = []

  selectionStatus: {[key: string]: boolean} = {}

  constructor(public accounts: AccountsService, private fb: FormBuilder, private toast: ToastService, public web: WebService) {
    for (let i = 0; i < this.web.modelParameters.length; i++) {
      this.selectionStatus[i] = false
    }
  }

  loginHandler() {
    if (this.form.valid) {
      if (this.form.value.username && this.form.value.password) {
        this.toast.show("User information", "Logging in...")
        this.accounts.login(this.form.value["username"], this.form.value["password"]).subscribe((data: any) => {
          this.accounts.token = data.token
          this.accounts.loggedIn = true
          if (this.form.value["username"]) {
            this.accounts.username = this.form.value["username"]
          }

          if (this.form.value["remember"] && this.form.value["remember"] === true && this.form.value["username"]) {
            localStorage.setItem("token", data.token)
            localStorage.setItem("username", this.form.value["username"])
          }
          this.toast.show("User information", "Logged in successfully")
          this.web.initializeModelParameters.next(true)

        })
      }
    }
  }

  togglePanel(id: number) {
    this.activePanel = this.activePanel === id ? null : id
  }

  selectAll() {
    if (this.selectedModel.length === this.web.modelParameters.length) {
      this.selectedModel = []
      for (const i in this.selectionStatus) {
        this.selectionStatus[i] = false
      }
    } else {
      this.selectedModel = this.web.modelParameters.slice()
      for (const i in this.selectionStatus) {
        this.selectionStatus[i] = true
      }
    }
    this.selectedModel = [...this.selectedModel]
  }

  selectModel(ind: number) {
    const model = this.web.modelParameters[ind]
    if (this.selectedModel.includes(model)) {
      this.selectedModel.splice(this.selectedModel.indexOf(model), 1)
    } else {
      this.selectedModel.push(model)
    }
    this.selectionStatus[ind] = !this.selectionStatus[ind]
    this.selectedModel = [...this.selectedModel]
  }
}
