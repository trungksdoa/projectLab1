import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from './service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
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
