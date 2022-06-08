import { SharedService } from 'src/app/shared.service'
import { Component, OnInit } from '@angular/core'
import { UserService } from './api/cart/user.service'
import { Router } from '@angular/router'
import { Subscription, interval } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { PPaymentComponent } from 'src/app/home/p-payment/p-payment.component'
import { Product } from './api/product/product'
import { ProductService } from './api/product/product.service'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public products: Product[]
  private updateSubscription: Subscription
  constructor (
    public dialog: MatDialog,
    private sharedService: SharedService,
    private productService: ProductService
  ) {}

  ngOnInit (): void {
    this.getAllProduct()
  }
  public getAllProduct():void{
    this.productService.getAllProduct().subscribe(
      (response: Product[]) => {
        this.products = response
        console.log(this.products)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}
