import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { of, Observable } from 'rxjs'
import { Cart, cartItem, cartItemsWithSelect } from './cart'
import { environment } from 'src/environments/environment'
import { SharedService } from 'src/app/shared.service'
import { Product } from 'src/app/api/product/product'
import { Router } from '@angular/router'
import { Users } from 'src/app/model/user'
import { SpinnerService } from 'src/app/spinner.service'

export interface CartIndentify extends Cart {
  isEmpty: boolean
  totalUniqueItems: number
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiServerUrl = environment.apiBaseUrl

  constructor (
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router,
    private spinnerServer: SpinnerService
  ) {}
  /*
   *
   *
   * cart API
   *
   *
   */
  public getCartItemByUserId (userId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiServerUrl}/cart?userId=${userId}`)
  }

  public getMiniCart (userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/cart/mini?userId=${userId}`)
  }

  public addCartItem (cartItem: Cart): Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/cart`, cartItem)
  }

  public deleteCartItem (cartId: String, ItemId: number[]): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: ItemId
    }
    return this.http.delete<any>(
      `${this.apiServerUrl}/cart?CartId=${cartId}`,
      options
    )
  }

  /*
   *
   *
   * Interface
   *
   *
   */
  public updateItemsByAnyFields (
    userId: number,
    itemId: number,
    fieldsArray: any
  ): Observable<Cart> {
    return this.http.patch<Cart>(
      `${this.apiServerUrl}/cart?userId=${userId}&itemId=${itemId}`,
      fieldsArray
    )
  }

  /*
   *
   *
   * cartService
   *
   *
   */
  itemInitvalue: cartItemsWithSelect = {
    id: 0,
    productItem: null,
    quantity: 0,
    productPrice: 0,
    active: false,
    selected: false
  }
  CartIndentify: CartIndentify = {
    id: 0,
    lastUpdated: '',
    createAt: '',
    cartItem: [],
    userId: null,
    TotalPrice: 0,
    isEmpty: false,
    totalUniqueItems: 0
  }
  updateCart (action: { id: number; payload: any }) {
    const cart: Cart = this.sharedService.getLocal('localCart')
    const items = cart.cartItem.map((item: cartItem) => {
      if (item.id !== action.id) return item

      return {
        ...item,
        ...action.payload
      }
    })
    this.sharedService.callFunctionByClick('refreshCart')
    return items
  }
  addToCart (item: Product, quantity = 1) {
    // this.saveCartToLocalStorage(this.setCartItem(item,null))
    if (this.sharedService.getUserFromCookie()) {
      if (!item.id) throw new Error('You must provide an `id` for items')
      if (quantity <= 0) return
      const cart: CartIndentify = this.sharedService.getLocal('localCart')
        ? this.sharedService.getLocal('localCart')
        : this.CartIndentify
      const currentItem = cart.cartItem.find(
        (i: cartItem) => i.productItem.id === item.id
      )

      if (!currentItem && !item.hasOwnProperty('price'))
        throw new Error('You must pass a `price` for new items')

      // ...this.itemInitvalue,
      this.spinnerServer.requestStarted()

      if (!currentItem) {
        const currItem: CartIndentify = {
          ...cart,
          cartItem: [
            ...cart.cartItem,
            {
              ...this.itemInitvalue,
              quantity: quantity,
              productItem: item,
              id: item.id,
              productPrice: quantity * item.price
            }
          ]
        }

        if (this.sharedService.getUserFromCookie()) {
          currItem.userId = this.sharedService.getUserFromCookie()
          this.saveCartToDB(currItem)
        }
        this.sharedService.callFunctionByClick('refreshCart')
        return

        //End if item is not existing
      }

      const payload = {
        ...currentItem,
        quantity: currentItem.quantity + quantity,
        productItem: item
      }

      cart.cartItem = this.updateCart({
        id: item.id,
        payload: payload
      })

      if (this.sharedService.getUserFromCookie()) {
        const cartDB: CartIndentify = this.generatorCart(cart, cart.cartItem)
        cartDB.cartItem = []
        cartDB.cartItem.push(payload)
        cart.userId = this.sharedService.getUserFromCookie()

        setTimeout(() => {
          this.saveCartToDB(cart)
          this.spinnerServer.requestEnded()
        }, 1000)
      }
      this.sharedService.callFunctionByClick('refreshCart')
    } else {
      alert('Please fucking login')
    }
  }

  generatorCart = (cart: CartIndentify, items: cartItemsWithSelect[]) => {
    const totalUniqueItems = this.calculateUniqueItems(items)
    const isEmpty = totalUniqueItems === 0

    return {
      ...this.CartIndentify,
      ...cart,
      cartItem: this.calculateItemTotals(items),
      totalUniqueItems,
      TotalPrice: this.calculateTotal(items),
      isEmpty
    }
  }

  removeAllItem (itemId: number[]) {
    this.spinnerServer.requestStarted()
    const cart: CartIndentify = this.sharedService.getLocal('localCart')
    setTimeout(() => {
      if (this.sharedService.getUserFromCookie()) {
        this.deleteCartItem(cart.id + '', itemId).subscribe(() => {
          //
        })
      }
      this.saveCartToLocalStorage(
        this.generatorCart(
          cart,
          cart.cartItem.filter(item => !itemId.includes(item.productItem.id))
        )
      )
      this.spinnerServer.requestEnded()
      this.sharedService.callFunctionByClick('refreshCart')
    }, 300)
  }

  saveCartToLocalStorage (cart: CartIndentify) {
    this.sharedService.setLocal(
      'localCart',
      this.generatorCart(cart, cart.cartItem)
    )
    this.sharedService.callFunctionByClick('refreshCart')
    this.sharedService.setUniqueItemNumber(
      this.generatorCart(cart, cart.cartItem).totalUniqueItems
    )
  }

  saveCartToDB (cart: Cart) {
    this.addCartItem(cart).subscribe((respone: CartIndentify) => {
      for (let index = 0; index < respone.cartItem.length; index++) {
        const element = respone.cartItem[index]
        element.id = element.productItem.id
      }
      this.sharedService.callFunctionByClick('refreshCart')
      this.saveCartToLocalStorage(this.generatorCart(respone, respone.cartItem))
      this.sharedService.setUniqueItemNumber(
        this.generatorCart(respone, respone.cartItem).totalUniqueItems
      )
    })
  }

  calculateItemTotals = (items: cartItemsWithSelect[]) =>
    items.map(item => ({
      ...item,
      productPrice: item.productItem.price * item.quantity!
    }))

  calculateTotal = (items: cartItemsWithSelect[]) =>
    items.reduce(
      (total, item) => total + item.quantity! * item.productItem.price,
      0
    )

  calculateUniqueItems = (items: cartItemsWithSelect[]) => items.length

  getCartFromLocalStorage = (): CartIndentify =>
    this.sharedService.getLocal('localCart')

  getCartFromDB (userId: Users) {
    this.getCartItemByUserId(userId.id + '').subscribe((respone: any) => {
      for (let index = 0; index < respone.cartItem.length; index++) {
        const element = respone.cartItem[index]
        element.id = element.productItem.id
      }
      this.sharedService.callFunctionByClick('refreshCart')
      this.saveCartToLocalStorage(this.generatorCart(respone, respone.cartItem))
      this.sharedService.setUniqueItemNumber(
        this.generatorCart(respone, respone.cartItem).totalUniqueItems
      )
    })
  }
}
