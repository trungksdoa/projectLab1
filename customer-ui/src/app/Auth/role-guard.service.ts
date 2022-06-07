import { Injectable } from '@angular/core'
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { UserService } from '../api/cart/user.service'
import { SharedService } from '../shared.service'

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor (
    public sharedService: SharedService,
    public router: Router,
    private userservice: UserService
  ) {}

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const isAdmins = {
      isThat:true
    }
    this.sharedService.isAdmin().subscribe(isAdmin => {
      isAdmins.isThat = isAdmin;
    })
    return isAdmins.isThat
  }
}
