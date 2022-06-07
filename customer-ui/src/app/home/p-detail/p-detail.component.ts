// import { cartSeleted } from 'src/app/core/store/cartState'
import { Cart, cartItem } from 'src/app/model/cart'
import { ProductService } from 'src/app/api/product/product.service'
import { Component, OnInit } from '@angular/core'

import { ActivatedRoute } from '@angular/router'

import {
  MatBottomSheet,
  MatBottomSheetRef
} from '@angular/material/bottom-sheet'
import { PCartComponent } from 'src/app/home/p-cart/p-cart.component'
import { Product } from 'src/app/api/product/product'
import { CartService } from 'src/app/api/cart/cart.service'

@Component({
  selector: 'app-p-detail',
  templateUrl: './p-detail.component.html',
  styleUrls: ['./p-detail.component.css']
})
export class PDetailComponent implements OnInit {
  public product: Product

  constructor (
    private productService: ProductService,
    private cartService: CartService, // private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit (): void {
    this.findProductById(parseInt(this.route.snapshot.paramMap.get('id')))
  }

  public addCartItem (product: Product) {
    const cartitem = this.setCartItem(product)

    console.log(cartitem)
    this.cartService.addCartItem(cartitem, '1').subscribe((respone: any) => {
      console.log(respone)
    })
    // alert(`item: ${cartitem.getProductItem().name}`)
  }
  setCartItem (product: Product) {
    const cartItem: cartItem = {
      id: null,
      productItem: product,
      quantity: 1,
      productPrice: 0,
      itemActive: false
    }
    // cartItem.productPrice = cartItem.productItem.price * cartItem.quantity
    return cartItem
  }
  public findProductById (productId: number) {
    console.log(productId)
    this.productService
      .getOneProduct(productId)
      .subscribe((product: Product) => {
        this.product = product

        console.log(this.product)
      })
  }
}
