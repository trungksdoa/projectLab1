import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { CartIndentify, CartService } from '../feature/p-cart/cart.service'
import { SharedService } from '../shared.service'
import { SpinnerService } from '../spinner.service'

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  cart: CartIndentify
  constructor (
    private spinnerServer: SpinnerService,
    private shared: SharedService,
    private cartService: CartService
  ) {}
  intercept (
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handler(next, req)
  }
  initialValue: CartIndentify = {
    isEmpty: true,
    totalUniqueItems: 0,
    id: 0,
    lastUpdated: undefined,
    createAt: undefined,
    cartItem: [],
    userId: undefined,
    TotalPrice: 0
  }
  handler (next: HttpHandler, request: HttpRequest<any>) {
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.spinnerServer.requestEnded()
          }
        },
        (error: HttpErrorResponse) => {
          this.spinnerServer.resetSpinner()
          throw error
        }
      )
    )
  }
}
