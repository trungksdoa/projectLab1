import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { of, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Banner } from 'src/app/model/banner'
@Injectable({ providedIn: 'root' })
export class BannerService {
  private apiServerUrl = environment.apiBaseUrl

  constructor (private http: HttpClient) {}

  public uploadBanner (formdata: any): Observable<any> {
    const req = new HttpRequest(
      'POST',
      `${this.apiServerUrl}/banner/uploadFile`,
      formdata,
      {
        reportProgress: true,
        responseType: 'json'
      }
    )

    return this.http.request(req)
    // return this.http.post<any>(
    //   `${this.apiServerUrl}/banner/uploadFile`,
    //   formdata,
    //   {
    //     reportProgress: true,
    //     responseType: 'json'
    //   }
    // )
  }

  public getFiles (): Observable<Banner[]> {
    return this.http.get<Banner[]>(`${this.apiServerUrl}/banner`)
  }
  public deleteFile (fileName: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/banner?fileName=${fileName}`
    )
  }
  public UPDATEFile (fileName: string, formdata: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiServerUrl}/banner?fileName=${fileName}`,
      formdata
    )
  }
}
