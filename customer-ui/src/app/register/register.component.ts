import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { UserService } from 'src/app/api/cart/user.service'
import { Users } from 'src/app/model/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor (
    private UserService: UserService,
    private sharedService: SharedService,
    private router:Router
  ) {}

  ngOnInit (): void {
    this.sharedService.isLoggedIn().subscribe(isLoggin=>{
      if(isLoggin){
        this.router.navigate(['/login']);
      }
    })
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
  formSubmit (form: NgForm) {
    const requestUser = this.createUser(form.value)
    if (form.value) {
      this.UserService.Save(requestUser).subscribe(data => {
        this.sharedService.setLocal('user', JSON.stringify(data))
        this.router.navigate(['']);
        this.sharedService.isLoggin(true);
        form.reset()
      })
    }
  }

}
