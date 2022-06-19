import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private _http: HttpClient) { }

  get<T>(url: string, options=undefined): Observable<T> {
    return this._http.get<T>(url, options);
  }

  post<T>(url: string, body: any, options=undefined): Observable<T> {
    return this._http.post<T>(url, body, options);
  }
  
}
