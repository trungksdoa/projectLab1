import { SharedService } from './../shared.service'
import { orderManagement } from './../model/Order'
import { OrderService } from 'src/app/api/cart/order.service'
import { Component, OnInit } from '@angular/core'
import { DialogService } from '../dialog.service'
import { ProfileOrderDetailComponent } from '../profile-order-detail/profile-order-detail.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  menus: any[] = [
    {
      icon: 'home',
      name: 'overview'
    },
    {
      icon: 'settings',
      name: 'setting'
    },
    {
      icon: 'shopping_cart',
      name: 'order'
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
      .getTop5OrderByUserId(JSON.parse(this._sharedService.getLocal('user')).id)
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

  pages: string = 'overview'

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
}
