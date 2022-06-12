// import { cartSeleted } from 'src/app/core/store/cartState'
import { cartItem } from 'src/app/feature/p-cart/cart'
import { ProductService } from 'src/app/api/product/product.service'
import { Component, OnInit } from '@angular/core'

import { ActivatedRoute, Router } from '@angular/router'

import { Product } from 'src/app/api/product/product'
import { CartService } from 'src/app/feature/p-cart/cart.service'
import { SharedService } from 'src/app/shared.service'

@Component({
  selector: 'app-p-detail',
  templateUrl: './p-detail.component.html',
  styleUrls: ['./p-detail.component.css']
})
export class PDetailComponent implements OnInit {
  public product: Product

  constructor (
    private productService: ProductService,
    private cartService: CartService,
    // private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {}

  ngOnInit (): void {
    this.findProductById(parseInt(this.route.snapshot.paramMap.get('id')))
  }

  public addCartItem (product: Product) {
    this.cartService.addToCart(product);
  }
  public findProductById (productId: number) {
    this.productService
      .getOneProduct(productId)
      .subscribe((product: Product) => {
        this.product = product
      })
  }
}
