import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { SharedService } from 'src/app/shared.service'
import { UserService } from 'src/app/feature/profile/user.service'
import { Users } from 'src/app/model/user'
import { NgForm } from '@angular/forms'
import { IDeactivateOptions } from 'src/app/Auth/confirm-deactivate-guard.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, IDeactivateOptions {
  isSubmit = false

  constructor (
    private UserService: UserService,
    private sharedService: SharedService,
    private router: Router
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
        if (data) {
          this.isSubmit = true
          this.sharedService.setLocal('user', JSON.stringify(data))
          this.router.navigate([''])
          this.sharedService.isLoggin(true)
          form.reset()
        }
      })
    }
  }
}
