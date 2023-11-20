import { Component } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WebService} from "../web.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ToastService} from "../toast.service";

@Component({
  selector: 'app-session-save-prompt',
  templateUrl: './session-save-prompt.component.html',
  styleUrls: ['./session-save-prompt.component.scss']
})
export class SessionSavePromptComponent {
  form = this.fb.group({
    name: new FormControl<string>("", Validators.required)
  })
  constructor(private modal: NgbActiveModal, private web: WebService, private fb: FormBuilder, private toast: ToastService) { }

  saveSession() {
    if (this.form.valid && this.form.value.name) {
      const payload = this.web.settings.export()
      this.web.saveSettingsOnServer(payload, payload.currentProteinGroup, this.form.value.name).subscribe((data: any) => {
        this.toast.show("Session save", "Session saved successfully")
        this.modal.close()
      }, (error) => {
        this.toast.show("Session save", "Session save failed")
      })
    }
  }

  close() {
    this.modal.close()
  }


}
