import { UserService } from 'src/app/api/service/user.service'
import { Component, OnInit } from '@angular/core'
import { Users } from 'src/app/model/user'
import { SharedService } from 'src/app/service'


@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
  usersList: Users[] = []
  filterArray: Users[] = []
  searchValue: any
  changeCount: number = 0
  constructor (
    private userService: UserService,
    private sharedService: SharedService
  ) {}

  ngOnInit (): void {
    this.userService.getAll().subscribe(data => {
      this.usersList = data
      this.filterArray = data
    })
  }

  searchAny (event: any) {
    const value = event.target.value
    this.filterArray = this.sharedService.searchAny(this.usersList, value)
  }
}
