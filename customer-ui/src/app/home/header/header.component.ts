import { async, debounceTime, map, Observable, startWith } from 'rxjs'
import { Input, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormControl } from '@angular/forms'

import { SharedService } from 'src/app/shared.service'
import { DialogService } from 'src/app/dialog.service'
import { Product } from 'src/app/api/product/product'
import { PCartComponent } from 'src/app/feature/p-cart/p-cart.component'

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
    private router: Router,
    private dialogService: DialogService
  ) {

  }

  ngOnInit (): void {
    this.sharedService.isLoggedIn().subscribe(data => {
      this.isLogin = data
    })
    this.sharedService.getUniqueItemInCart().subscribe(uniqueItemInCart => {
      this.itemCount = uniqueItemInCart
    })
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
    this.sharedService.getLocal('user')
      ? this.dialogService
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
      : ''
  }

  logOut () {
    this.sharedService.deleteLocal('user')
    this.router.navigate(['login'])
    this.sharedService.isLoggin(false)
    this.sharedService.deleteLocal('uniqueItemInCart')
    this.sharedService.setUniqueItemNumber(0)
  }
}
