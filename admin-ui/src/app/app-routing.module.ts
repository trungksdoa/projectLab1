import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthService } from "./auth.service";
import { CategoryManagerComponent } from "./category-manager/category-manager.component";
import { BannerManagerComponent } from "./feature/banner-manager/banner-manager.component";
import { DashboardComponent } from "./feature/dashboard/dashboard.component";
import { OrderManagerComponent } from "./feature/order-manager/order-manager.component";
import { UserManagerComponent } from "./feature/user-manager/user-manager.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { ProductManagerComponent } from "./product-manager/product-manager.component";


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService]
  },
  {
    path: 'order/manager',
    component: OrderManagerComponent,
    canActivate: [AuthService]
  },
  {
    path: 'user/manager',
    component: UserManagerComponent,
    canActivate: [AuthService]
  },
  { path: 'login', component: LoginFormComponent },
  {
    path: 'detail/:id',
    component: ProductManagerComponent,
    canActivate: [AuthService]
  },
  {
    path: 'banner',
    component: BannerManagerComponent,
    canActivate: [AuthService]
  },
  {
    path: 'product',
    component: ProductManagerComponent
  },
  {
    path: 'category',
    component: CategoryManagerComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
