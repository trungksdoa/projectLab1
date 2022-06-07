
import { RoleGuardService } from './Auth/role-guard.service';
import { AuthGuardService } from './Auth/auth-guard.service'
import { UserService } from './api/cart/user.service'
import { checklogin } from 'src/app/Auth/auth-guard.service'

import { NgxPaginationModule } from 'ngx-pagination';
import { SlickCarouselModule } from 'ngx-slick-carousel';


import { CartService } from './api/cart/cart.service'
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
//Material


import { PDetailComponent } from './home/p-detail/p-detail.component'
import { PCartComponent } from './home/p-cart/p-cart.component'
import { MaterialExampleModule } from './module/material.module'
import { HomeComponent } from './home/home.component'
import { CategoryService } from './api/category/category.service'
import { ProductService } from './api/product/product.service'
import { HeaderComponent } from './home/header/header.component'
import { NavComponent } from './home/nav/nav.component'
import { BannerSliderComponent } from './home/banner-slider/banner-slider.component'
import { ProductComponent } from './home/product/product.component'
import { FooterComponent } from './home/footer/footer.component'
// import { AdminProductComponent } from './admin/admin-product/admin-product.component'
// import { AdminItemsComponent } from './admin/admin-items/admin-items.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { PPaymentComponent } from './home/p-payment/p-payment.component'
import { SharedService } from './shared.service'
import { OrderService } from './api/cart/order.service'

import { LoginUiComponent } from './home/login-ui/login-ui.component'
import { CityService } from './api/cart/citys.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { httpInterceptProviders } from './http';
import { MatDialogRef } from '@angular/material/dialog';

import { NgxPayPalModule } from 'ngx-paypal';
import { TestPaypalComponent } from './test-paypal/test-paypal.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileChartComponent } from './profile-chart/profile-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { ProfileOrderComponent } from './profile-order/profile-order.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProfileOrderDetailComponent } from './profile-order-detail/profile-order-detail.component';
import { ProductBestSellerComponent } from './product-best-seller/product-best-seller.component';
import { ProductCateidComponent } from './product-cateid/product-cateid.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
@NgModule({
  declarations: [
    AppComponent,
    PDetailComponent,
    PCartComponent,
    HomeComponent,
    HeaderComponent,
    NavComponent,
    BannerSliderComponent,
    ProductComponent,
    FooterComponent,
    PPaymentComponent,
    LoginUiComponent,
    SpinnerComponent,
    TestPaypalComponent,
    ProfileComponent,
    ProfileChartComponent,
    ProfileOrderComponent,
    InvoiceComponent,
    ProfileOrderDetailComponent,
    ProductBestSellerComponent,
    ProductCateidComponent,
    RegisterComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPayPalModule,
    NgChartsModule,
    NgxPaginationModule,
    SlickCarouselModule,
    NgSelectModule,
  ],
  providers: [
    httpInterceptProviders,
    CategoryService,
    ProductService,
    CartService,
    SharedService,
    OrderService,
    UserService,
    AuthGuardService,
    RoleGuardService,
    CityService,
    checklogin
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
