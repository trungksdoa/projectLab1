import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { CategoryService } from "./api/category/category.service";
import { ProductService } from "./api/product/product.service";
import { BannerService } from "./api/service/banner_service";
import { CartService } from "./api/service/cart.service";
import { CityService } from "./api/service/citys.service";
import { OrderService } from "./api/service/order.service";
import { UserService } from "./api/service/user.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BannerManagerComponent } from "./feature/banner-manager/banner-manager.component";
import { DashboardComponent } from "./feature/dashboard/dashboard.component";
import { OrderDetailComponent } from "./feature/order-manager/order-detail/order-detail.component";
import { OrderManagerComponent } from "./feature/order-manager/order-manager.component";
import { UpdateBannerFormComponent } from "./feature/update-banner-form/update-banner-form.component";
import { UserManagerComponent } from "./feature/user-manager/user-manager.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { MaterialExampleModule } from "./module/material.module";
import { AddProductComponent } from "./product-manager/add-product/add-product.component";
import { ProductManagerComponent } from "./product-manager/product-manager.component";
import { SharedService, DialogService } from "./service";
import { SidebarComponent } from "./sidebar/sidebar.component";


@NgModule({
  declarations: [
    AppComponent,
    OrderManagerComponent,
    OrderDetailComponent,
    ProductManagerComponent,
    SidebarComponent,
    DashboardComponent,
    BannerManagerComponent,
    AddProductComponent,
    UpdateBannerFormComponent,
    LoginFormComponent,
    UserManagerComponent
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
    NgxSkeletonLoaderModule,
    Ng2SearchPipeModule
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
