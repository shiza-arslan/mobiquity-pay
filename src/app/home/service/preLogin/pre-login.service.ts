import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EpConfig } from '../../../util/utils/ep-config';
import { apiEndPoints } from '@mobiquity/utils';
import { Api } from '../../../services/api';
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
