import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CartService } from 'src/app/feature/p-cart/cart.service'
import { DialogService } from 'src/app/dialog.service'
import { orderItems, orderManagement } from 'src/app/model/Order'
import { SharedService } from 'src/app/shared.service'
import { PCartComponent } from 'src/app/feature/p-cart/p-cart.component'

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
    this._cartService.addCartItem(item);
  }

  onNoClick () {
    this.dialogRef.close()
  }
}
