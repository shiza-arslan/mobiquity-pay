import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EpConfig } from '../../util/utils/ep-config';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = EpConfig.getServerUrl();
  constructor(private http: HttpClient) {}
  getJWTBearerToken() {
    if (sessionStorage.getItem('isTokenRefresh') == 'false') {
      return this.generateBearer();
    } else {
      return this.refreshBearerToken();
    }
  }
  generateBearer() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: 'Basic Q29yZVdlYjphZGF5ZmNTV2NJ',
      }),
    };
    const promise = new Promise<void>((resolve, reject) => {
      const formData = new FormData();
      formData.append('grant_type', 'client_credentials');
      sessionStorage.removeItem('access_token');
      this.http.post(this.baseUrl + 'mobiquitypay/oauth/token', formData, httpOptions).subscribe({
        next: (res: any) => {
          //console.log(res);
          sessionStorage.setItem('access_token', res.access_token);
          sessionStorage.setItem('token_expiry_time', res.expires_in);
          resolve();
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          // console.log('complete');
        },
      });
    });
    return promise;
  }
  refreshBearerToken() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: 'Basic Q29yZVdlYjphZGF5ZmNTV2NJ',
      }),
    };
    const promise = new Promise<void>((resolve, reject) => {
      const formData = new FormData();
      formData.append('grant_type', 'client_credentials');
      sessionStorage.removeItem('access_token');
      this.http.post(this.baseUrl + 'mobiquitypay/oauth/token', formData, httpOptions).subscribe({
        next: (res: any) => {
          console.log(res);
          sessionStorage.setItem('access_token', res.access_token);
          sessionStorage.setItem('token_expiry_time', res.expires_in);
          resolve();
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          // console.log('complete');
        },
      });
    });
    return promise;
  }
}
