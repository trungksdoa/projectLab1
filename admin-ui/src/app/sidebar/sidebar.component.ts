import { Component, OnInit } from '@angular/core'
import { SharedService } from '../service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isLogin: boolean = false
  constructor (private sharedService: SharedService) {
    this.sharedService.isLoggedIn().subscribe(checked => {
      this.isLogin = checked;
    })
  }

  ngOnInit (): void {}
}
