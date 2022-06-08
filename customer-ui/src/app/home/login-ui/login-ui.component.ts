import { SharedService } from 'src/app/shared.service'
import { Component, OnInit } from '@angular/core'
import { Users } from 'src/app/model/user'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/cart/user.service'
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-login-ui',
  templateUrl: './login-ui.component.html',
  styleUrls: ['./login-ui.component.css']
})
export class LoginUiComponent implements OnInit {



  constructor (
    private UserService: UserService,
    private sharedService: SharedService,
    private router:Router
  ) {}

  ngOnInit (): void {
    this.sharedService.isLoggedIn().subscribe(isLoggin=>{
      if(isLoggin){
        this.router.navigate(['']);
      }
    })
  }

  createUser (param: Users) {
    // alert(JSON.stringify(param))
    const user: Users = {
      id: 0,
      name: undefined,
      password: param.password,
      address: undefined,
      phone: undefined,
      isAdmin: false,
      username: param.username
    }

    return user
  }
  formSubmit (form: NgForm) {
    const requestUser = this.createUser(form.value)
    if (form.value) {
      this.UserService.loginRequest(requestUser).subscribe(data => {
        this.sharedService.setLocal('user', JSON.stringify(data))
        this.router.navigate(['']);
        this.sharedService.isLoggin(true);
        form.reset()
      })
    }
  }
}
