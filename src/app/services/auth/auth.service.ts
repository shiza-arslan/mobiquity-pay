import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EpConfig } from '../../util/utils/ep-config';
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
    const promise = new Promise<void>((resolve, reject) => {
      const formData = new FormData();
      formData.append('grant_type', 'client_credentials');
      this.http.post(this.baseUrl + 'mobiquitypay/oauth/token', formData, httpOptions).subscribe({
        next: (res: any) => {
          sessionStorage.setItem('access_token', res.access_token);
          resolve();
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }
}
