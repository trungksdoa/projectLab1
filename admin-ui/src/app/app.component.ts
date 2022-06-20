import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SharedService } from './service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: String = 'Chào các cụ'
  constructor (private sharedService: SharedService, private router: Router) {
    sharedService.isLoggedIn().subscribe(isLoginedIn => {
      if (isLoginedIn) {
        this.username =
          'Chào mừng trở lại ' + sharedService.getUserFromCookie().name
      }
    })
  }

  logout () {
    this.username = 'Chào các cụ'
    this.sharedService.isLoggin(false)
    this.sharedService.deleteCookie('admin_user')
    this.router.navigate(['/login'])
  }
  title = 'admin-ui'
}
