import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/api/product/product';
import { ProductService } from 'src/app/api/product/product.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-product-cateid',
  templateUrl: './product-cateid.component.html',
  styleUrls: ['./product-cateid.component.css']
})
export class ProductCateidComponent implements OnInit {

  public products: Product[];
  totalLength:any;
  page:number=1;
  catid:any;
  constructor(private productService:ProductService,private active: ActivatedRoute,private service: SharedService) {

  }

  ngOnInit(){
    this.active.paramMap.subscribe(params =>{
      this.catid = params.get('id');


    });
    this.service.shareProduct.subscribe(() =>{
      this.active.paramMap.subscribe(params =>{
        this.catid = params.get('id');
        this.getAllProduct(this.catid);
      });
    });
    this.getAllProduct(this.catid);
  }

  public getAllProduct(id:any): void {
    this.productService.getProductByCateId(id).subscribe(
      (response: Product[]) => {
        this.products = response;
        this.totalLength=response.length;
        console.log(this.products);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
