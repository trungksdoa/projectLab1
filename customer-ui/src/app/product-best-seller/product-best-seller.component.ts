import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Product } from 'src/app/api/product/product'
import { ProductService } from 'src/app/api/product/product.service'

@Component({
  selector: 'app-product-best-seller',
  templateUrl: './product-best-seller.component.html',
  styleUrls: ['./product-best-seller.component.css']
})
export class ProductBestSellerComponent implements OnInit {
  public products: Product[]
  constructor (private productService: ProductService) {}

  ngOnInit () {
    this.getAllProduct()
  }
  slideConfig = { slidesToShow: 4, slidesToScroll: 4 }

  slickInit (e) {
    console.log('slick initialized')
  }

  breakpoint (e) {
    console.log('breakpoint')
  }

  afterChange (e) {
    console.log('afterChange')
  }

  beforeChange (e) {
    console.log('beforeChange')
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
