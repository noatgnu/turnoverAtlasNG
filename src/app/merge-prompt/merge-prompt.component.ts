import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-merge-prompt',
  templateUrl: './merge-prompt.component.html',
  styleUrls: ['./merge-prompt.component.scss']
})
export class MergePromptComponent {
  form = this.fb.group({
    name: new FormControl('', Validators.required),
    color: new FormControl('#000000', Validators.required),
    remove: new FormControl(false)
  })
  constructor(private fb: FormBuilder, public modal: NgbActiveModal) {
  }

  save() {
    this.modal.close(this.form.value)
  }
  cancel() {
    this.modal.dismiss()
  }
}
