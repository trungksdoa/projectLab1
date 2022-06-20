import { BannerManagerComponent } from './banner-manager/banner-manager.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { OrderManagerComponent } from './order-manager/order-manager.component'
import { ProductManagerComponent } from './product-manager/product-manager.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { LoginFormComponent } from './login-form/login-form.component'
import { AuthService } from './auth.service'
import { UserManagerComponent } from './user-manager/user-manager.component'


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
<<<<<<< HEAD
    component: ProductManagerComponent
  },
 
];
=======
    component: ProductManagerComponent,
    canActivate: [AuthService]
  }
]
>>>>>>> 141d23d61e5a9449835ebe82b9a63759f30b75da

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
