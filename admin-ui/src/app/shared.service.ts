// import { UserService } from './../../../admin-ui/src/app/api/user.service'
import { cartItem } from 'src/app/model/cart'
import { UserService } from 'src/app/api/service/user.service'
// import { cartItem } from 'src/app/mo'
import { EventEmitter, Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs'

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

  submitFormProduct(data:any){
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

  isAdmin (): Observable<boolean> {
    var subject = new Subject<boolean>();
    this.isLoggedIn().subscribe(isloggin=>{
      if(isloggin){
        this.userservice
        .triggerCheckIsAdmin(JSON.parse(this.getLocal('user')).name)
        .subscribe(isAdmin => {
          subject.next(isAdmin);
        })
      }
    })
    return subject.asObservable();
  }

  constructor (private userservice: UserService) {
    // this.isAdmin().subscribe((r)=>console.log(r))
  }
}
