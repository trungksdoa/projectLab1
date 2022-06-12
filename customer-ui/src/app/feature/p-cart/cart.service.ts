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

interface CartIndentify extends Cart {
  isEmpty: boolean
  totalUniqueItems: number
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiServerUrl = environment.apiBaseUrl

  constructor (
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router
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
    return this.http.post<any>(`${this.apiServerUrl}/cart`, cartItem)
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

  setCartItem (product: Product, user: Users) {
    const cartItem: Cart = {
      id: 0,
      lastUpdated: undefined,
      createAt: undefined,
      cartItem: [],
      userId: user,
      TotalPrice: product.price
    }
    let autoIncrease = cartItem.cartItem.length

    autoIncrease++
    cartItem.cartItem.push({
      id: product.id,
      productItem: product,
      quantity: 1,
      productPrice: product.price,
      active: false,
      selected: false
    })
    return cartItem
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
  public updateCart (action: { id: number; payload: any }) {
    const cart: Cart = this.sharedService.getLocal('localCart')
    const items = cart.cartItem.map((item: cartItem) => {
      if (item.id !== action.id) return item

      return {
        ...item,
        ...action.payload
      }
    })

    return this.calculateItemTotals(items)
  }
  public addToCart (item: Product, quantity = 1) {
    // this.saveCartToLocalStorage(this.setCartItem(item,null))
    if (!item.id) throw new Error('You must provide an `id` for items')
    if (quantity <= 0) return
    const cart: CartIndentify = this.sharedService.getLocal('localCart')
      ? this.sharedService.getLocal('localCart')
      : this.CartIndentify
    const currentItem = cart.cartItem.find((i: cartItem) => i.id === item.id)

    if (!currentItem && !item.hasOwnProperty('price'))
      throw new Error('You must pass a `price` for new items')

    // ...this.itemInitvalue,

    if (!currentItem) {
      const currItem: CartIndentify = {
        ...cart,
        cartItem: [
          ...cart.cartItem,
          {
            ...this.itemInitvalue,
            quantity: quantity,
            productItem: item,
            id: item.id
          }
        ]
      }

      currItem.cartItem = this.calculateItemTotals(currItem.cartItem)

      currItem.totalUniqueItems = this.calculateUniqueItems(currItem.cartItem)
      currItem.isEmpty = currItem.totalUniqueItems === 0
      this.saveCartToLocalStorage(currItem)
      return
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

    cart.totalUniqueItems = this.calculateUniqueItems(cart.cartItem)
    cart.isEmpty = cart.totalUniqueItems === 0

    this.saveCartToLocalStorage(cart)

    this.sharedService.getLocal('user') ? this.saveCartToDB(cart) : console.log("Hello")
  }

  saveCartToLocalStorage (cart: Cart) {
    this.sharedService.setLocal('localCart', cart)
    this.sharedService.callFunctionByClick()
  }

  saveCartToDB (cart: Cart) {
    this.addCartItem(cart).subscribe((respone: any) => {
      this.sharedService.callFunctionByClick()
    })
  }

  bindingCartToDBAfterLogin () {
    if(this.sharedService.getLocal('localCart')){
      const cartData: Cart = JSON.parse(this.sharedService.getLocal('localCart'))
      this.saveCartToDB(cartData)
      this.sharedService.callFunctionByClick()
    }
  }

  calculateItemTotals = (items: cartItemsWithSelect[]) =>
    items.map(item => ({
      ...item,
      productPrice: item.productItem.price * item.quantity!
    }))

  calculateUniqueItems = (items: cartItemsWithSelect[]) => items.length
}
