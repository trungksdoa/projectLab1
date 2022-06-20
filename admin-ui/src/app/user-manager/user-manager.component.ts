import { UserService } from 'src/app/api/service/user.service';
import { Component, OnInit } from '@angular/core';
import { Users } from '../model/user';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  usersList:Users[] = [];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(data=>{
      this.usersList = data;
    })
  }

}
