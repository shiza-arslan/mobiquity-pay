import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UowService } from '../../../data-acsess/uow.service';
import { Observable } from 'rxjs';
import { Config } from '../../../core/index';

@Injectable({
  providedIn: 'root',
})
export class IpGeolocationBlockerGuard implements CanActivate {
  constructor(private _uow: UowService) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const ip = await this._uow.ipGeolocationService.getIP();
    const location = await this._uow.ipGeolocationService.getlocation();
    if (Config.authConfig.ipAddress.includes(ip)) {
      this._uow.router.navigate(['/access-denied']);
      return false;
    }
    // if (Config.authConfig.geoLocation.includes(location)) {
    //   await this._uow.router.navigate(['/access-denied']);
    //   return false;
    // }
    else {
      return true;
    }
  }
}
