// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core'
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router'
import { Observable } from 'rxjs'
import { SharedService } from '../shared.service'
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor (public sharedService: SharedService, public router: Router) {}
  isloggin  = false;
  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.sharedService.isLoggedIn().subscribe(isLoggedIn => {
      this.isloggin = isLoggedIn;
    })
    if (this.isloggin) {
      return true
    } else {
      console.log('Could not authenticate')
      this.router.navigate(['/login'], { queryParams: { redirectURL: state.url } })
      return false
    }
  }
}
