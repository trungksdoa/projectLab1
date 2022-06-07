import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { of, Observable } from 'rxjs'
import { Users } from 'src/app/model/user'
import { environment } from 'src/environments/environment'
import { City } from 'src/app/model/city'

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiServerUrl = environment.apiBaseUrl

  constructor (private http: HttpClient) {}

  public getCitys (): Observable<City> {
    return this.http.get<City>(`${this.apiServerUrl}/citys`)
  }
}
