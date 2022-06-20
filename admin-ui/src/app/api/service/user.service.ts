import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { of, Observable } from 'rxjs'
import { Users } from 'src/app/model/user'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl

  constructor (private http: HttpClient) {}

  public getAll (): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/user/`)
  }

  public loginRequest (user: Users): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/user/login`, user)
  }
  public triggerCheckIsAdmin (name: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/user/isAdmin?name=${name}`)
  }
  public triggerCheckIsBanned (name: string): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiServerUrl}/user/banUser?name=${name}`,{})
  }
  public triggerCheckIsDeleted (name: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/user/isDeleted?name=${name}`)
  }
}
