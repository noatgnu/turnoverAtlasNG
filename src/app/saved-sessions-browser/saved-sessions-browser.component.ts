import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {WebService} from "../web.service";
import {ToastService} from "../toast.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-saved-sessions-browser',
  templateUrl: './saved-sessions-browser.component.html',
  styleUrls: ['./saved-sessions-browser.component.scss']
})
export class SavedSessionsBrowserComponent {
  data: any[] = []

  constructor(private modal: NgbActiveModal, private web: WebService, private fb: FormBuilder, private toast: ToastService, private router: Router) {
    this.web.getAllSettingsFromServer().subscribe((data: any) => {
      this.data = data
    })
  }

  close() {
    this.modal.close()
  }

  deleteSession(id: number) {
    this.web.deleteSettingsByID(id).subscribe((data: any) => {
      this.toast.show("Session delete", "Session deleted successfully")
      this.web.getAllSettingsFromServer().subscribe((data: any) => {
        this.data = data
      })
    }, (error) => {
      this.toast.show("Session delete", "Session delete failed")
    })
  }

  loadSession(id: number) {
    this.web.getSettingsByID(id).subscribe((data: any) => {
      const currentProteinGroup = this.web.settings.currentProteinGroup.slice()
      this.web.settings.import(data.details)
      this.toast.show("Session load", "Session loaded successfully")
      if (currentProteinGroup !== this.web.settings.currentProteinGroup) {
        this.router.navigate(['protein-view', this.web.settings.currentProteinGroup]).then(r => console.log(r))
      } else {
        this.web.restoreSubject.next(true)
      }

      this.modal.close()
    }, (error) => {
      this.toast.show("Session load", "Session load failed")
    })
  }

  getURL(d: any) {
    // create and copy url to clipboard
    const url = window.location.origin + "#/protein-view/" + d.protein_group + "&" + d.id
    navigator.clipboard.writeText(url).then(() => {
      this.toast.show("URL", "URL copied to clipboard")
    })
  }

}
