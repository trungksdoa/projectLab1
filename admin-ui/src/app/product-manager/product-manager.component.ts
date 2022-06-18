import { SharedService } from 'src/app/shared.service'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { Validators, FormBuilder, NgForm } from '@angular/forms'
import { Category } from 'src/app/api/category/category'
import { CategoryService } from 'src/app/api/category/category.service'
import { Product } from 'src/app/api/product/product'
import { ProductService } from 'src/app/api/product/product.service'
import { DialogService } from 'src/app/dialog.service'
import { AddProductComponent } from './add-product/add-product.component'

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent implements OnInit {
  isLoading: boolean
  products: Product[] = []
  temp_products: Product[] = []
  failed: boolean
  categorys: Category[]
  newDate : any = new Date().getTime()

  initializeValue = {
    id: 0,
    name: '',
    description: '',
    imageurl: '',
    price: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    catagory: {
      id: 0,
      name: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
  constructor (
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialogService: DialogService,
    private sharedService: SharedService
  ) {}
  ngOnInit (): void {
    this.sharedService.invokeSendDataAfterSubmit.subscribe((data: Product) => {
      let index = this.products.findIndex(item => item.id === data.id)
      if (index == 1) {
        this.products.push(data)
      }
    })

    this.getAllProduct()
    this.getAllCategory()
  }
  @Input() response: any
  getAllProduct (): void {
    this.productService.getAllProduct().subscribe(
      (response: Product[]) => {
        this.isLoading = true
        this.products = response
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false
        this.failed = true
      }
    )
  }

  getAllCategory (): void {
    this.categoryService.getAllCategory().subscribe(
      (response: Category[]) => {
        this.categorys = response
        console.log(this.categorys)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  onDeleteProduct (cateid: number): void {
    this.productService.deleteProduct(cateid).subscribe(
      (response: void) => {
        console.log(response)
        this.getAllProduct()
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
  openDialog (sendData: any, type: any) {
    this.dialogService.openDialog(
      {
        width: '50%',
        // disableClose:true,
        data: { data: sendData, type }
      },
      AddProductComponent
    )
  }
}
