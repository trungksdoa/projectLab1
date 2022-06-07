import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { of, Observable } from 'rxjs'
import { Order, orderItems, orderManagement } from '../../model/Order'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiServerUrl = environment.apiBaseUrl

  constructor (private http: HttpClient) {}

  public addCartItem (Order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiServerUrl}/order`, Order)
  }
  public getorders (): Observable<orderManagement[]> {
    return this.http.get<orderManagement[]>(`${this.apiServerUrl}/order`)
  }
  public getOrder (userId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiServerUrl}/order?userId=${userId}`)
  }
  public updateOrder (change: number, orderId: number): Observable<Order> {
    return this.http.patch<Order>(
      `${this.apiServerUrl}/order/status?change=${change}&orderId=${orderId}`,
      {}
    )
  }
}
