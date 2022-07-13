import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EpConfig } from '../../common/configs/ep-config';
import { apiEndPoints } from '@mobiquity/common';
@Injectable({
  providedIn: 'root',
})
export class PreloginService {
  baseUrl = EpConfig.getMockUrl();
  constructor(private http: HttpClient) {}
  getPreLoginData(lang: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
      }),
    };
    return this.http.get(this.baseUrl + apiEndPoints.preLogin.preLoginUrl + lang, httpOptions);
  }
}
