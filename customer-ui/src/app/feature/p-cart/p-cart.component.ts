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

interface ICart extends Cart {
  totalPrice: string
}
@Component({
  selector: 'app-p-cart',
  templateUrl: './p-cart.component.html',
  styleUrls: ['./p-cart.component.css']
})
export class PCartComponent implements OnInit {
  isTimeout = true
  cart: ICart
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

    private dialogRef: MatDialogRef<PCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit (): void {
    if(this.sharedService.getLocal('user')){
      this.getCartByUserId(this.sharedService.getLocal('user').id)
    }
  }

  getCartByUserId (userId: string): void {
    this.cartservice.getCartItemByUserId(userId).subscribe(
      (response: ICart) => {
        this.cart = response
        this.isEmpty = response.cartItem.length === 0
        this.totalitemIncart = response.cartItem.length
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
  deleteItemInCart () {
    if (this.itemSelected.length != 0) {
      this.cartservice
        .deleteCartItem(this.cart.id + '', this.itemSelected)
        .subscribe(item => {
          this.sharedService.callFunctionByClick()
        })

      this.cart.cartItem = this.cart.cartItem.filter(
        x => !this.itemSelected.includes(x.id)
      )

      if (this.cart.cartItem.length === 0) {
        this.isEmpty = true
      }
    }
  }
  selectedItem (cartitem: cartItemsWithSelect) {
    const data = this.cart.cartItem.find(x => x.id == cartitem.id)
    data.selected = !data.selected
    // for(let i=0;i<this.cart.cartItem.length;i++){
    //   if(this.cart.cartItem[i].id == cartitem.id){
    //       this.cart.cartItem[i]
    //   }
    // }
    // console.log(data)
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
  increaseQuantity (currentQuantity: number, itemId: number) {
    const userId = JSON.parse(this.sharedService.getLocal('user')).id
    // console.log(currentQuantity)

    const field = {
      quantityItemNumber: currentQuantity
    }
    this.cartservice
      .updateItemsByAnyFields(userId, itemId, field)
      .subscribe(data => {
        this.cart.cartItem.filter(function (o1) {
          data.cartItem.forEach(function (o2) {
            if (o1.id === o2.id) {
              o1.quantity = o2.quantity
              o1.productPrice = o2.productItem.price * o2.quantity
            }
          })
        })
      })
  }
  decreaseQuantity (currentQuantity: number, itemId: number) {
    const userId = JSON.parse(this.sharedService.getLocal('user')).id


    const field = {
      quantityItemNumber: currentQuantity
    }

    if(field.quantityItemNumber === 0){
      return;
    }

    this.cartservice
      .updateItemsByAnyFields(userId, itemId, field)
      .subscribe(data => {
        this.cart.cartItem.filter(function (o1) {
          data.cartItem.forEach(function (o2) {
            if (o1.id === o2.id) {
              o1.quantity = o2.quantity
              o1.productPrice = o2.productItem.price * o2.quantity
            }
          })
        })
      })
  }
  updateQuantity ($event: any, itemId: number) {
    const field = {
      quantityItemNumber: parseInt($event.target.value)
    }
    setTimeout(() => {
      //<<<---using ()=> syntax
      const userId = JSON.parse(this.sharedService.getLocal('user')).id
      this.cartservice
        .updateItemsByAnyFields(userId, itemId, field)
        .subscribe(data => {
          this.cart.cartItem.filter(function (o1) {
            data.cartItem.forEach(function (o2) {
              if (o1.id === o2.id) {
                o1.quantity = o2.quantity
                o1.productPrice = o2.productItem.price * o2.quantity
              }
            })
          })
        })
    }, 300)
  }

  onNoClick (): void {
    console.log('Ok')
    this.dialogRef.close()
  }
}
