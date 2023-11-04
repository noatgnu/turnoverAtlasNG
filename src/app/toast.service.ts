import { Injectable } from '@angular/core';
import {ToastInfo} from "./toast-info";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: ToastInfo[] = [];
  constructor() { }
  show(header: string, body: string, delay: number = 5000, type: string = 'info') {
    this.toasts.push({header, body, delay, type});
    console.log(this.toasts)
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
