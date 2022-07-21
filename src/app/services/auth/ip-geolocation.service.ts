import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class IpGeolocationService {
  loadedIP: any;

  constructor(private httpClient: HttpClient) {}
  async loadIp(): Promise<any> {
    const response = await this.httpClient.get('https://jsonip.com').toPromise();
    return response;
  }
  async getIP() {
    const res: any = await this.loadIp();
    return res.ip;
  }
  async loadGeoLocation(): Promise<any> {
    const response = await this.httpClient
      .get('https://jsonip.com')
      .pipe(
        switchMap((value: any) => {
          const url = `http://api.ipstack.com/${value.ip}?access_key='MOBIQUI_AUTH_BYPASS'`;
          return this.httpClient.get(url);
        }),
      )
      .toPromise();

    return response;
  }

  async getlocation() {
    const location = await this.loadGeoLocation();
    return location;
  }
}
