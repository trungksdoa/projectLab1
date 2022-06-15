import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { SharedService } from 'src/app/shared.service'
import { UserService } from 'src/app/feature/profile/user.service'
import { Users } from 'src/app/model/user'
import { NgForm } from '@angular/forms'
import { IDeactivateOptions } from 'src/app/Auth/confirm-deactivate-guard.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpErrorResponse } from '@angular/common/http'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, IDeactivateOptions {
  isSubmit = false
  showPassword: boolean;
  constructor (
    private UserService: UserService,
    private sharedService: SharedService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit (): void {
    this.sharedService.isLoggedIn().subscribe(isLoggin => {
      if (isLoggin) {
        this.router.navigate(['/login'])
      }

    })
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
      username: param.username,
      name: param.name,
      password: param.password,
      address: param.address,
      phone: param.phone,
      isAdmin: false,
      id: 0
    }

    return user
  }
  resetNew (form: NgForm) {
    form.reset()
  }
  formSubmit (form: NgForm) {
    const requestUser = this.createUser(form.value)
    if (form.value) {
      this.UserService.Save(requestUser).subscribe(data => {
       
          this.isSubmit = true
          this.sharedService.setLocal('user', data)
          this.router.navigate([''])
          this.sharedService.isLoggin(true)
          form.reset()
      },(error: HttpErrorResponse) => {
        this._snackBar.open('Đăng ký Thất bại!', 'Tiếp tục', {
          duration: 1000
        });
      }
      )
      this._snackBar.open('Đăng ký thành công!', 'Tiếp tục', {
        duration: 3000
      });
    }
  }
}
