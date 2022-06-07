import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Product } from 'src/app/api/product/product'
import { ProductService } from 'src/app/api/product/product.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public products: Product[]
  totalLength: any
  page: number = 1
  constructor (
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit () {
    this.getAllProduct()
  }

  public getAllProduct (): void {
    this.productService.getAllProduct().subscribe(
      (response: Product[]) => {
        this.products = response
        this.totalLength = response.length
        console.log(this.products)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  goToDetail (id: any) {
    this.router.navigate([`detail/${id}`])
  }
}
