import { SharedService } from 'src/app/shared.service'
import { Component, OnInit } from '@angular/core'
import { UserService } from './api/cart/user.service'
import { Router } from '@angular/router'
import { Subscription, interval } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { PPaymentComponent } from 'src/app/home/p-payment/p-payment.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private updateSubscription: Subscription
  constructor (
    public dialog: MatDialog,
    private sharedService: SharedService
  ) {}

  ngOnInit (): void {

  }

  title = 'customer-ui'
}
