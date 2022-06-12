import { SharedService } from 'src/app/shared.service'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription, interval } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { Product } from './api/product/product'
import { ProductService } from './api/product/product.service'
import { HttpErrorResponse } from '@angular/common/http'
import { CartService } from './feature/p-cart/cart.service'

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
    private cartservice: CartService,
    private shared: SharedService,
    private productService: ProductService
  ) {
    shared.getLocal('user')
    ? cartservice
        .getMiniCart(JSON.parse(shared.getLocal('user')).id)
        .subscribe(item => {
          shared.setLocal('uniqueItemInCart', item.uniqueItemInCart)
        })
    : ''
  }

  ngOnInit (): void {
    this.getAllProduct()
    this.shared.afterClick.subscribe(() => {
      this.shared.getLocal('user')
        ? this.cartservice
            .getMiniCart(JSON.parse(this.shared.getLocal('user')).id)
            .subscribe(item => {
              this.shared.setLocal('uniqueItemInCart', item.uniqueItemInCart)
              this.shared.setUniqueItemNumber(item.uniqueItemInCart)
            })
        : ''
    })
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
