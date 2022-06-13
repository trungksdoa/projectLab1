import { cartItemsWithSelect } from 'src/app/feature/p-cart/cart'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, Inject, OnInit } from '@angular/core'
import { CartService } from 'src/app/feature/p-cart/cart.service'
import { Cart, cartItem } from 'src/app/feature/p-cart/cart'
// import { LocalStorageService } from 'ngx-localstorage'
import { SharedService } from 'src/app/shared.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { PPaymentComponent } from 'src/app/feature/p-payment/p-payment.component'
import { DialogService } from 'src/app/dialog.service'
import { Users } from 'src/app/model/user'
import { Router } from '@angular/router'
import { SpinnerService } from 'src/app/spinner.service'

interface CartIndentify extends Cart {
  isEmpty: boolean
  totalUniqueItems: number
}
@Component({
  selector: 'app-p-cart',
  templateUrl: './p-cart.component.html',
  styleUrls: ['./p-cart.component.css']
})
export class PCartComponent implements OnInit {
  isTimeout = true
  cart: CartIndentify
  isEmpty: boolean = false
  totalitemIncart: number
  itemSelected: number[] = []
  itemObjectSelected: cartItem[] = []
  displayedColumns: string[] = ['productItem.name', 'quantity', 'productPrice']
  checked: boolean = false
  constructor (
    // private _bottomSheetRef: MatBottomSheetRef<PCartComponent>,
    private cartservice: CartService,
    // private _storageService: LocalStorageService,
    private sharedService: SharedService,

    private dialogService: DialogService,

    private router: Router,

    private spinnerServer: SpinnerService,

    private dialogRef: MatDialogRef<PCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit (): void {
    this.sharedService.afterClick.subscribe((value?) => {
      if (value === 'refreshCart') {
        this.getCart()
      }
    })

    this.cartservice.getCartFromDB(this.sharedService.getUserFromCookie())

    this.cart = this.cartservice.getCartFromLocalStorage()
  }

  getCart (): void {
    this.sharedService.setUniqueItemNumber(
      this.cartservice.getCartFromLocalStorage().totalUniqueItems
    )
    this.cart = this.cartservice.getCartFromLocalStorage()
  }

  backToHome () {
    this.router.navigate([''])
    this.dialogRef.close()
  }

  selectedItem (cartitem: cartItemsWithSelect) {
    const data = this.cart.cartItem.find(x => x.id == cartitem.id)
    data.selected = !data.selected
    if (data.selected) {
      this.itemSelected.push(data.id)
      this.itemObjectSelected.push(data)
    } else {
      this.itemSelected = this.itemSelected.filter(x => x != data.id)
      this.itemObjectSelected = this.itemObjectSelected.filter(
        x => x.id != data.id
      )
    }
  }

  goCheckout () {
    if (this.itemObjectSelected.length > 0) {
      this.dialogService
        .openDialog(
          {
            height: '100%',
            width: '100%',
            disableClose: true,
            data: this.itemObjectSelected
          },
          PPaymentComponent
        )
        .subscribe(type => {
          if (type === 'closeCart') {
            this.dialogRef.close('goInvoice')
          }
        })
    }
  }

  getCalculatedValue (cart: cartItem) {
    return this.sharedService.getFormatCurrency(cart.productPrice)
  }

  formatCurrentPrice (value: number) {
    return this.sharedService.getFormatCurrency(value)
  }

  callAPIChangeData (currentQuantity: number, itemId: number) {
    const cart: CartIndentify = this.sharedService.getLocal('localCart')
    const currentItem = cart.cartItem.find((i: cartItem) => i.id === itemId)
    cart.cartItem = this.cartservice.updateCart({
      ...currentItem,
      id: itemId,
      payload: {
        quantity: currentQuantity
      }
    })
    this.cart = this.cartservice.generatorCart(cart, cart.cartItem)
    this.cartservice.saveCartToLocalStorage(this.cart)

    if (this.sharedService.getUserFromCookie()) {
      const userId: Users = this.sharedService.getUserFromCookie()
      // console.log(currentQuantity)

      setTimeout(() => {
        const field = {
          quantityItemNumber: currentQuantity,
          productPrice: parseFloat(
            this.cart.cartItem.find((i: cartItem) => i.id === itemId)
              .productPrice
          )
        }

        this.cartservice
          .updateItemsByAnyFields(userId.id, itemId, field)
          .subscribe(data => {
            console.log(data)
          })
      }, 300)
    }
  }

  changeQuantity (currentQuantity: number, itemId: number) {
    this.callAPIChangeData(currentQuantity, itemId)
  }

  updateQuantity ($event: any, itemId: number) {
    this.callAPIChangeData(parseInt($event.target.value), itemId)
  }

  deleteItemInCart () {
    this.cartservice.removeAllItem(this.itemSelected)

    this.itemObjectSelected = this.itemObjectSelected.filter(
      item => !this.itemSelected.includes(item.productItem.id)
    )
  }

  onNoClick (): void {
    this.dialogRef.close()
  }
}
