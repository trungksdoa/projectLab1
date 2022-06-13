import { async, debounceTime, map, Observable, startWith } from 'rxjs'
import { Input, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormControl } from '@angular/forms'

import { SharedService } from 'src/app/shared.service'
import { DialogService } from 'src/app/dialog.service'
import { Product } from 'src/app/api/product/product'
import { PCartComponent } from 'src/app/feature/p-cart/p-cart.component'
import { CartIndentify, CartService } from 'src/app/feature/p-cart/cart.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() products: Product[]
  myControl = new FormControl('')
  filteredOptions: Observable<Product[]>
  searchMode: boolean
  isLogin: Boolean = false
  itemCount: number = 0
  constructor (
    private sharedService: SharedService,
    private cartService: CartService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit (): void {
    this.sharedService.isLoggedIn().subscribe(data => {
      this.isLogin = data
    })

    if(this.sharedService.getUserFromCookie()){
      this.sharedService.getUniqueItemInCart().subscribe(uniqueItemInCart => {
        this.itemCount = uniqueItemInCart
      })
    }else{
      this.itemCount = 0;
    }

    this.getAllProduct()
  }

  public getAllProduct (): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(1000),
      map(value => this._filter(value || ''))
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
    this.router.navigateByUrl(`/product/search/${value}`)
  }
  openCart (): void {
    if(this.sharedService.getUserFromCookie()){
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
    }else{
      alert("Please fucking login")
    }
  }
  CartIndentify: CartIndentify = {
    id: 0,
    lastUpdated: '',
    createAt: '',
    cartItem: [],
    userId: null,
    TotalPrice: 0,
    isEmpty: false,
    totalUniqueItems: 0
  }
  logOut () {

    this.sharedService.deleteCookie('user')
    this.sharedService.deleteLocal('localCart')
    this.router.navigate(['login'])
    this.sharedService.isLoggin(false)
    this.sharedService.setUniqueItemNumber(0)
  }
}
