import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core'
import { Routes, CanActivate } from '@angular/router'
import { RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { PPaymentComponent } from './home/p-payment/p-payment.component'
import { PDetailComponent } from './home/p-detail/p-detail.component'
import { LoginUiComponent } from './home/login-ui/login-ui.component'

import { RoleGuardService as RoleGuard } from './Auth/role-guard.service'
import { AuthGuardService as AuthGuard } from 'src/app/Auth/auth-guard.service'
import { InvoiceComponent } from './invoice/invoice.component'
import { ProductCateidComponent } from './product-cateid/product-cateid.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'detail/:id', // child route path
    component: PDetailComponent, // child route component that the router renders
  },
  { path: 'login', component: LoginUiComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product/:id', component: ProductCateidComponent },
  { path: 'search/:keyword', component: SearchComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
