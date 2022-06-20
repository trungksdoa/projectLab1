import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from '../model/user';
import { SharedService } from 'src/app/service';
import {UserService} from 'src/app/api/service/user.service'
import { ToastsService } from 'src/app/service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  isSubmit = false
  hide = true
  durationInSeconds = 5
  show_button: Boolean = false;
  show_eye: Boolean = false
  constructor (
    private UserService: UserService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastsService,
  ) {}

  ngOnInit (): void {}
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
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
      isAdmin: true,
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
      this.UserService.loginRequest(requestUser).subscribe(
        ({user,message}: { user: Users; message: string }) => {
          this.isSubmit = true
          this.sharedService.setCookie('admin_user', user)
          this.sharedService.isLoggin(true)
          this.checkPreviousPage()
          this.toast.showSuccess(message)
          form.reset()
        },
        error => {
          this.toast.showError(error.error.message)
        }
      )
    }
  }
  checkPreviousPage () {
    const params = this.route.snapshot.queryParams

    if (params['redirectURL']) {
      this.router.navigateByUrl(params['redirectURL'])
    } else {
      this.router.navigate(['/dashboard'])
    }
  }
}
