import { BannerManagerComponent } from './banner-manager/banner-manager.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderManagerComponent } from './order-manager/order-manager.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'order/manager', component: OrderManagerComponent},
  {
    path: 'detail/:id',
    component: ProductManagerComponent
  },
  {
    path: 'banner',
    component: BannerManagerComponent
  },
  {
    path: 'product',
    component: ProductManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
