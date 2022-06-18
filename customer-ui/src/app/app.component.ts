import { SharedService } from 'src/app/shared.service'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription, interval } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { Product } from './api/product/product'
import { ProductService } from './api/product/product.service'
import { HttpErrorResponse } from '@angular/common/http'
import { Cart, NgCartService } from './feature/p-cart/service'

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
    private cartService: NgCartService,
    private shared: SharedService,
    private productService: ProductService,
  ) {
    // shared.getUserFromCookie() ? this.getMiniCart() : ''
  }

  getMiniCart () {

  }
  ngOnInit (): void {
    if (this.shared.getUserFromCookie()) {
      this.cartService.getCartFromDB(this.shared.getUserFromCookie())
    } else {
      this.shared.setUniqueItemNumber(this.cartService.getCartFromLocalStorage().totalUniqueItems)
    }
    this.getAllProduct()
    // this.shared.afterClick.subscribe(() => {
    //   this.shared.getUser() ? this.getMiniCart() : ''
    // })
  }
  public getAllProduct (): void {
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
