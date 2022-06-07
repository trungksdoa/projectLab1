import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CartService } from '../api/cart/cart.service'
import { DialogService } from '../dialog.service'
import { PCartComponent } from '../home/p-cart/p-cart.component'
import { orderItems, orderManagement } from '../model/Order'
import { SharedService } from '../shared.service'

@Component({
  selector: 'app-profile-order-detail',
  templateUrl: './profile-order-detail.component.html',
  styleUrls: ['./profile-order-detail.component.css']
})
export class ProfileOrderDetailComponent implements OnInit {
  orderItems: orderItems[]
  constructor (
    public dialogRef: MatDialogRef<ProfileOrderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: orderManagement,
    private _sharedService: SharedService,

    private _cartService: CartService,

    private _dialogService: DialogService
  ) {}

  ngOnInit (): void {
    if (this.data) {
      this.orderItems = this.data.orderItems
    }
    // console.log(this.data)
  }
  getCalculatedValue (value: number) {
    return this._sharedService.getFormatCurrency(value)
  }

  reOrder (item: any) {
    this._cartService
      .addCartItem(item, JSON.parse(this._sharedService.getLocal('user')).id)
      .subscribe(responeItem => {
        console.log(responeItem)

        this._dialogService.openDialog(
          {
            width: '90vw', //sets width of dialog
            height: '100%', //sets width of dialog
            maxWidth: '100vw', //overrides default width of dialog
            maxHeight: '100vh' //overrides default height of dialog
          },
          PCartComponent
        )
      })
  }

  onNoClick () {
    this.dialogRef.close()
  }
}
