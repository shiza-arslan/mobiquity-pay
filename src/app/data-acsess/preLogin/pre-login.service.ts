import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EpConfig } from '../../core/configs/ep-config';
@Injectable({
  providedIn: 'root',
})
export class PreloginService {
  baseUrl = EpConfig.getMockUrl() + '/preLogin/';
  constructor(private http: HttpClient) {}
  getPreLoginData(lang: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
      }),
    };
    return this.http.get(this.baseUrl + lang, httpOptions);
  }
}
