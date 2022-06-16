import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/user';
import { SharedService } from 'src/app/shared.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.css']
})
export class ProfileAccountComponent implements OnInit {
  user: Users 
  

  isLogin: Boolean = false
  constructor( private _sharedService: SharedService) {  }

  ngOnInit(): void {
    this._sharedService.isLoggedIn().subscribe(data => {
      this.isLogin = data
      this.user=this._sharedService.getUserFromCookie()
    })
    
  }

}
