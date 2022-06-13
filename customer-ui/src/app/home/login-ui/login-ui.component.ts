import { CartService } from 'src/app/feature/p-cart/cart.service';
import { SharedService } from 'src/app/shared.service'
import { Component, OnInit } from '@angular/core'
import { Users } from 'src/app/model/user'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from 'src/app/feature/profile/user.service'
import { IDeactivateOptions } from 'src/app/Auth/confirm-deactivate-guard.service'
import { Observable } from 'rxjs'
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login-ui',
  templateUrl: './login-ui.component.html',
  styleUrls: ['./login-ui.component.css']
})
export class LoginUiComponent implements OnInit, IDeactivateOptions {
  isSubmit = false

  constructor (
    private UserService: UserService,
    private sharedService: SharedService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit (): void {
  }

  canExit (): boolean | Promise<boolean> | Observable<boolean> {
    if (this.isSubmit) {
      return true
    } else {
      if (confirm('Are you want to exit?')) {
        return true
      }
      return false
    }
  }

  createUser (param: Users) {
    // alert(JSON.stringify(param))
    const user: Users = {
      id: 0,
      username: param.username,
      password: param.password,
      address: undefined,
      phone: undefined,
      isAdmin: false,
      name: undefined
    }

    return user
  }
  resetNew (form: NgForm) {
    form.reset()
  }
  formSubmit (form: NgForm) {
    const requestUser = this.createUser(form.value)
    if (form.value) {
      this.UserService.loginRequest(requestUser).subscribe(data => {
        if (data) {
          this.isSubmit = true
          this.cartService.getCartFromDB(data);
          this.sharedService.setCookie('user', data);
          this.sharedService.isLoggin(true)
          this.checkPreviousPage();
          form.reset()
        }
      })
    }
  }

  checkPreviousPage () {
    const params = this.route.snapshot.queryParams

    if (params['redirectURL']) {
      this.router.navigateByUrl(params['redirectURL'])
    }else{
      this.router.navigate([''])
    }
  }
}
