import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { of, Observable } from 'rxjs'
import { Cart, cartItem } from '../../model/cart'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class CartService {

  private apiServerUrl = environment.apiBaseUrl

  constructor (private http: HttpClient) {}


  public getCartItemByUserId (userId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiServerUrl}/cart?userId=${userId}`)
  }

  public addCartItem (cartItem: cartItem, userId: string): Observable<Cart> {
    return this.http.post<Cart>(
      `${this.apiServerUrl}/cart?userId=${userId}`,
      cartItem
    )
  }

  public updateItemsByAnyFields (
    userId: number,
    fieldsArray: any
  ): Observable<Cart> {
    return this.http.patch<Cart>(
      `${this.apiServerUrl}/cart?userId=${userId}`,
      fieldsArray
    )
  }

  public deleteCartItem (cartId: String, ItemId: number[]): Observable<String> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: ItemId
    }
    return this.http.delete<String>(
      `${this.apiServerUrl}/cart?CartId=${cartId}`,
      options
    )
  }
}
