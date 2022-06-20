import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {

  constructor (private toast: NgToastService) {}

  ngOnInit (): void {}

  showSuccess (message: string) {
    this.toast.success({
      detail: 'Thông báo',
      summary: message,
      duration: 2000
    })
  }

  showError (message: string) {
    this.toast.error({
      detail: 'Thông báo',
      summary: message,
      duration: 2000
    })
  }

  showInfo (message: string) {
    this.toast.info({ detail: 'Thông báo', summary: message, sticky: true })
  }

  showWarn (message: string) {
    this.toast.warning({
      detail: 'Thông báo',
      summary: message,
      duration: 5000
    })
  }
}
