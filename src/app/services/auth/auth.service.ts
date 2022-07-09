import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EpConfig } from '../../common/configs/ep-config';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = EpConfig.getServerUrl();
  constructor(private http: HttpClient) {}
  generateBearer() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: 'Basic Q29yZVdlYjphZGF5ZmNTV2NJ',
      }),
    };
    const formData = new FormData();
    formData.append('grant_type', 'client_credentials');
    return this.http.post(this.baseUrl + 'mobiquitypay/oauth/token', formData, httpOptions);
  }
}
