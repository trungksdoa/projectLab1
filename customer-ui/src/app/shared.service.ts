// import { UserService } from './../../../admin-ui/src/app/api/user.service'
import { Cart } from 'src/app/feature/p-cart/cart'
// import { cartItem } from 'src/app/mo'
import { EventEmitter, Injectable } from '@angular/core'
import { BehaviorSubject, Subscription } from 'rxjs'
import { CartService } from './feature/p-cart/cart.service'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  afterClick = new EventEmitter()
  shareProduct = new EventEmitter()
  subsVar: Subscription

  private _isLoggedIn = new BehaviorSubject<boolean>(false)
  private _uniqueItemInCart = new BehaviorSubject<number>(0)

  constructor () {}
  callFunctionByClick () {
    this.afterClick.emit()
  }

  openSidePayment2 () {
    this.shareProduct.emit()
  }

  /*
   *
   *
   * other used
   *
   *
   */
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
   * check observationTargets
   *
   *
   */
  isLoggin (status: boolean) {
    this._isLoggedIn.next(status)
  }

  isLoggedIn () {
    if (this.getLocal('user') !== '') {
      this._isLoggedIn.next(true)
    } else {
      this._isLoggedIn.next(false)
    }
    return this._isLoggedIn.asObservable()
  }

  /*
   *
   *
   * LocalStorage
   *
   *
   */

  setLocal (name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value))
  }
  getLocal (name: string) {
    return localStorage.getItem(name)
      ? JSON.parse(localStorage.getItem(name))
      : ''
  }
  deleteLocal (name: string) {
    localStorage.removeItem(name)
  }

  /*
   *
   *
   * used LocalStorage
   *
   *
   */

  setUniqueItemNumber (value: number) {
    this._uniqueItemInCart.next(value)
  }
  getUniqueItemInCart () {
    if (this.getLocal('uniqueItemInCart') !== '') {
      this._uniqueItemInCart.next(this.getLocal('uniqueItemInCart'))
    } else {
      this._uniqueItemInCart.next(0)
    }
    return this._uniqueItemInCart.asObservable()
  }
}
