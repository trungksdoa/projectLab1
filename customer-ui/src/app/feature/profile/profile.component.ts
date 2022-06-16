import { SharedService } from 'src/app/shared.service'
import { orderManagement } from 'src/app/model/Order'
import { OrderService } from 'src/app/feature/p-payment/order.service'
import { Component, OnInit } from '@angular/core'
import { DialogService } from 'src/app/dialog.service'
import { ProfileOrderDetailComponent } from './profile-order-detail/profile-order-detail.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  menus: any[] = [
    {
      icon: 'home',
      name: 'Đơn Hàng'
    },
    {
      icon: 'settings',
      name: 'Tài Khoản Của Tôi'
    },
    {
      icon: 'settings',
      name: 'Cập Nhật Mật Khẩu'
    },
    {
      icon: 'shopping_cart',
      name: 'Tổng Đơn Hàng'
    }
  ]

  orders: orderManagement[] = []
  constructor (
    private orderService: OrderService,
    private _sharedService: SharedService,
    private _OrderService: OrderService,
    private _dialogService: DialogService
  ) {}

  ngOnInit (): void {
    this.orderService
      .getTop5OrderByUserId(this._sharedService.getUserFromCookie().id)
      .subscribe(items => {
        items.forEach(item => {
          item.createAt = new Date(item.createAt).toUTCString()
          item.lastUpdated = new Date(item.lastUpdated).toUTCString()
        })
        this.orders = items
      })
  }

  call (shoe: string) {
    alert(shoe)
  }

  pages: string = 'Đơn Hàng'

  onClick (item: any) {
    this.pages = item
  }

  openOrderDetail (order: orderManagement): void {
    console.log(order)
    this._dialogService
      .openDialog(
        {
          height: '100%',
          width: '100%',
          disableClose: true,
          data: order
        },
        ProfileOrderDetailComponent
      )
      .subscribe()
  }

  formatCurrency(value:number){
    return this._sharedService.getFormatCurrency(value)
  }
}
