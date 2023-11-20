import { Component } from '@angular/core';
import {AccountsService} from "../accounts.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ToastService} from "../toast.service";
import {WebService} from "../web.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  form = this.fb.group({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
    remember: new FormControl<boolean>(false)
  })
  constructor(public accounts: AccountsService, private fb: FormBuilder, private toast: ToastService, private web: WebService) {

  }

  loginHandler() {
    if (this.form.valid) {
      if (this.form.value.username && this.form.value.password) {
        this.toast.show("User information", "Logging in...")
        this.accounts.login(this.form.value["username"], this.form.value["password"]).subscribe((data: any) => {
          this.accounts.token = data.token
          this.accounts.loggedIn = true
          if (this.form.value["remember"] && this.form.value["remember"] === true) {
            localStorage.setItem("token", data.token)
          }
          this.toast.show("User information", "Logged in successfully")
          this.web.initializeModelParameters.next(true)

        })
      }
    }

  }
}
