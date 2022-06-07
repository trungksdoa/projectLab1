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
export class checklogin {
  isLoggin (sharedService: SharedService) {
    let loggin = false
    sharedService.isLoggedIn().subscribe(isLoggedIn => {
      loggin = isLoggedIn
    })
    return loggin
  }
  canActivate (sharedService: SharedService, router: Router): boolean {
    const isLoggin = this.isLoggin(sharedService)
    if (isLoggin) {
      return true
    }
    router.navigate([''])
    return false
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor (
    private checkLogin: checklogin,
    public sharedService: SharedService,
    public router: Router
  ) {}

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin.canActivate(this.sharedService, this.router)
    }
}

