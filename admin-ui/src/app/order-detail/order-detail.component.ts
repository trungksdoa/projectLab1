import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { orderItems, orderManagement } from '../model/Order';
import { SharedService } from 'src/app/service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderItems: orderItems[];
  constructor(public dialogRef: MatDialogRef<OrderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: orderManagement, private _sharedService: SharedService,) { }

  ngOnInit(): void {
    if(this.data){
      this.orderItems =  this.data.orderItems;
    }
    // this.orderItems = this.data.orders.orderItems
    // this.totalPrice = this.orderItems.reduce((pre, curr) => pre + curr.productPrice, 0)
  }

  getCalculatedValue(value:number){
    return this._sharedService.getFormatCurrency(value)
  }

  onNoClick(): void {
    console.log("Ok")
    this.dialogRef.close(this.orderItems);
  }
}
