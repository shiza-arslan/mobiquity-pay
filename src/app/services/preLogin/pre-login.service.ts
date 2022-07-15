import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EpConfig } from '../../common/configs/ep-config';
import { apiEndPoints } from '@mobiquity/common';
import { Api } from '../api';
@Injectable({
  providedIn: 'root',
})
export class PreloginService {
  baseUrl = EpConfig.getMockUrl();
  constructor(private http: HttpClient, private api: Api) {}
  getPreLoginData(lang: string) {
    return this.api.get(this.baseUrl + apiEndPoints.preLogin.preLoginUrl + lang);
  }
}
