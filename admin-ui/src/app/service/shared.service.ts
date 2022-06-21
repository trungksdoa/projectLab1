// import { UserService } from './../../../admin-ui/src/app/api/user.service'
import { cartItem } from 'src/app/model/cart'
import { UserService } from 'src/app/api/service/user.service'
// import { cartItem } from 'src/app/mo'
import { EventEmitter, Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'
import { Users } from 'src/app/model/user'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  invokeGetitemToPaymentFunction = new EventEmitter()
  invokeSendDataAfterSubmit = new EventEmitter()
  subsVar: Subscription

  private _isLoggedIn = new BehaviorSubject<boolean>(false)
  private _isAdmin = new BehaviorSubject<boolean>(false)

  openSidePayment (cartItem: cartItem[]) {
    this.invokeGetitemToPaymentFunction.emit(cartItem)
  }

  submitFormProduct (data: any) {
    this.invokeSendDataAfterSubmit.emit(data)
  }

  getFormatCurrency (value: number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    })
    return formatter.format(value)
  }
  /*
   *
   *
   * cookies
   *
   *
   */

  setCookie (name: string, value: any) {
    if (name === 'admin_user') {
      var now = new Date()
      var time = now.getTime()
      var expireTime = time + 1000 * 36000
      now.setTime(expireTime)
      this.cookieService.set(name, JSON.stringify(value), expireTime)
    } else {
      this.cookieService.set(name, JSON.stringify(value))
    }
  }
  getCookie (name: string) {
    return this.cookieService.get(name)
      ? JSON.parse(this.cookieService.get(name))
      : ''
  }
  deleteCookie (name: string) {
    this.cookieService.delete(name)
  }

  getUserFromCookie (): Users {
    return this.cookieService.get('admin_user')
      ? JSON.parse(this.cookieService.get('admin_user'))
      : null
  }

  isLoggin (status: boolean) {
    this._isLoggedIn.next(status)
  }

  isLoggedIn () {
    if (this.getUserFromCookie()) {
      this._isLoggedIn.next(true)
    } else {
      this._isLoggedIn.next(false)
    }
    return this._isLoggedIn.asObservable()
  }

  searchAny (items: any[], term: any) {
    const /** @type {?} */ toCompare = term.toLowerCase()
    /**
     * @param {?} usersList
     * @param {?} term
     * @return {?}
     */
    function checkInside (item: Users, term: any) {
      for (let /** @type {?} */ property in item) {
        if (item[property] === null || item[property] == undefined) {
          continue
        }
        if (typeof item[property] === 'object') {
          if (checkInside(item[property], term)) {
            return true
          }
        }
        if (
          item[property]
            .toString()
            .toLowerCase()
            .includes(toCompare)
        ) {
          return true
        }
      }
      return false
    }
    const copyArray = [...items].reverse()
    return copyArray.filter(function (item) {
      return checkInside(item, term)
    })
  }
  constructor (private cookieService: CookieService) {
    // this.isAdmin().subscribe((r)=>console.log(r))
  }
}
