import { MatMenuModule } from '@angular/material/menu';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from './module/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

// import { AdminOrderComponent } from 'src/app/admin/admin-order/admin-order.component';
// import { AdminItemsComponent } from 'src/app/admin/admin-items/admin-items.component';
// import { AdminProductComponent } from 'src/app/admin/admin-product/admin-product.component';
import { CartService } from './api/cart/cart.service';
import { CityService } from './api/cart/citys.service';
import { OrderService } from './api/cart/order.service';
import { UserService } from './api/cart/user.service';
import { CategoryService } from './api/category/category.service';
import { ProductService } from './api/product/product.service';
import { SharedService } from './shared.service';
import { OrderManagerComponent } from './order-manager/order-manager.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BannerManagerComponent } from './banner-manager/banner-manager.component';
import { BannerService } from './api/cart/banner_service';
import { AddProductComponent } from 'src/app/product-manager/add-product/add-product.component';
import { DialogService } from './dialog.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    AppComponent,
    OrderManagerComponent,
    OrderDetailComponent,
    ProductManagerComponent,
    SidebarComponent,
    DashboardComponent,
    BannerManagerComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialExampleModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxSkeletonLoaderModule
  ],
  providers: [
    CategoryService,
    ProductService,
    CartService,
    SharedService,
    OrderService,
    UserService,
    CityService,
    BannerService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
