import { Component, OnInit } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { OrderService } from "src/app/api/service/order.service";
import { orderManagement } from "src/app/model/Order";
import { SharedService } from "src/app/service";
import { OrderDetailComponent } from "./order-detail/order-detail.component";


@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css']
})
export class OrderManagerComponent implements OnInit {
  orders: orderManagement[] = []
  searchValue:any;
  filterArray: any[] = []
  status_ = {
    success: 4,
    cancel: 3,
    confirm: 2,
    InConfirm: 1
  }
  sharedService: SharedService
  constructor (
    private service: OrderService,
    private _sharedService: SharedService,
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog
  ) {
    this.sharedService = _sharedService
    this.service.getorders().subscribe(items => {
      items.forEach(item => {
        item.createAt = new Date(item.createAt).toUTCString()
        item.lastUpdated = new Date(item.lastUpdated).toUTCString()
      })
      this.orders = items
      this.filterArray = items
    })
  }

  ngOnInit (): void {

  }

  openOrderProduct (order: orderManagement) {
    this._bottomSheet.open(OrderDetailComponent, {
      data: { orders: order }
    })
  }
  getCalculatedValue (orders: orderManagement) {
    return this._sharedService.getFormatCurrency(
      orders.orderItems.reduce((prev, curr) => prev + curr.productPrice, 0)
    )
  }

  updateStatus (status: number, orderId: number) {
    // console.log(status)
    return this.service.updateOrder(status, orderId).subscribe(data => {
      this.orders
        .filter(prevData => prevData.id == data.id)
        .forEach(item => {
          item.status = data.status
        })
    })
  }

  openDialog (order: orderManagement): void {
    const dialogRef = this.dialog.open(OrderDetailComponent, {
      width: '100%',
      // height:"100%",
      data: order,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ', result)
      // this.animal = result;
    })
  }

  searchAny (event: any) {
    const value = event.target.value
    this.filterArray = this.sharedService.searchAny(this.orders, value)
  }
}
