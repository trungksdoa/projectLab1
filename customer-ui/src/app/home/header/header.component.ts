import { PCartComponent } from 'src/app/home/p-cart/p-cart.component'
import { Component, OnInit } from '@angular/core'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { SharedService } from 'src/app/shared.service'
import { Router } from '@angular/router'
import { async, debounceTime, map, Observable, startWith } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { DialogService } from 'src/app/dialog.service'
import { Product } from 'src/app/api/product/product'
import { HttpErrorResponse } from '@angular/common/http'
import { ProductService } from 'src/app/api/product/product.service'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  myControl = new FormControl('')
  filteredOptions: Observable<Product[]>
  products: Product[]
  searchMode: boolean
  isLogin: Boolean = false

  constructor (
    private sharedService: SharedService,
    private router: Router,
    private dialogService: DialogService,
    private productService: ProductService
  ) {
    this.sharedService.isLoggedIn().subscribe(data => {
      this.isLogin = data
    })
  }

  ngOnInit (): void {
    this.getAllProduct()
  }

  public getAllProduct (): void {
    this.productService.getAllProduct().subscribe(
      (response: Product[]) => {
        this.products = response
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          debounceTime(1000),
          map(value => this._filter(value || ''))
        )
        console.log(this.products)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  private _filter (value: string): Product[] {
    const filterValue = value.toLowerCase()
    return this.products.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    )
  }

  doSearch (value: String): void {
    debounceTime(1000)
    console.log(`value=${value}`)
    this.router.navigateByUrl(`/search/${value}`)
  }
  openCart (): void {
    this.dialogService
      .openDialog(
        {
          width: '90vw', //sets width of dialog
          height: '100%', //sets width of dialog
          maxWidth: '100vw', //overrides default width of dialog
          maxHeight: '100vh', //overrides default height of dialog
          // disableClose:true,
          data: { name: 'trung' }
        },
        PCartComponent
      )
      .subscribe(type => {
        if (type === 'goInvoice') {
          this.router.navigate(['/invoice'])
        }
      })
  }

  logOut () {
    this.sharedService.deleteLocal('user')
    this.router.navigate(['login'])
    this.sharedService.isLoggin(false)
  }
}
