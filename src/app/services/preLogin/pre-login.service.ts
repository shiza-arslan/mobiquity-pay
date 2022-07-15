import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EpConfig } from '../../common/configs/ep-config';
import { apiEndPoints } from '@mobiquity/common';
import { UowService } from '@mobiquity/services';
@Injectable({
  providedIn: 'root',
})
export class PreloginService {
  baseUrl = EpConfig.getMockUrl();
  constructor(private http: HttpClient, private service: UowService) {}
  getPreLoginData(lang: string) {
    return this.service.api.get(this.baseUrl + apiEndPoints.preLogin.preLoginUrl + lang);
  }
}
