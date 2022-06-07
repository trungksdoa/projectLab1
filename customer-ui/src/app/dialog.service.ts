import { Injectable, Type } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { PCartComponent } from './home/p-cart/p-cart.component'
import { PPaymentComponent } from './home/p-payment/p-payment.component'
import {  ComponentType } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor (
    public dialog: MatDialog,
    ) {

    }
  openDialog (option:any, component: Type<any>,) :Observable<any>{
    const dialogRef = this.dialog.open(component,option)
    return dialogRef.afterClosed();
  }
}
