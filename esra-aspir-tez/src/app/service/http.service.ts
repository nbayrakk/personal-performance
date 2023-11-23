import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl:string='https://personaldetail.onrender.com'
  httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(
    private http: HttpClient
  ) {

  }
  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, this.httpOptions);
  }

  post(endpoint: string, data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, this.httpOptions);
  }


}
