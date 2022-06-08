import { HttpErrorResponse } from '@angular/common/http'
import { Input } from '@angular/core'
import { Component, OnInit } from '@angular/core'
import { Product } from 'src/app/api/product/product'
import { ProductService } from 'src/app/api/product/product.service'

@Component({
  selector: 'app-product-best-seller',
  templateUrl: './product-best-seller.component.html',
  styleUrls: ['./product-best-seller.component.css']
})
export class ProductBestSellerComponent implements OnInit {
  @Input() products: Product[]
  constructor () {}
  ngOnInit () {
   
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
}
