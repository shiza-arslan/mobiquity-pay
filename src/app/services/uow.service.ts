import { Injectable } from '@angular/core';
import { UserService } from '../features/PreLogin/service/login/user.service';
import { PreloginService } from '../features/PreLogin/service/preLogin/pre-login.service';
import { SignupService } from '../features/Registration/service/signup/signup.service';
import { IpGeolocationService } from './auth/ip-geolocation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { TranslationService } from './transalation.service';
@Injectable({
  providedIn: 'root',
})
export class UowService {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public loginService: UserService,
    public preLoginService: PreloginService,
    public signupService: SignupService,
    public ipGeolocationService: IpGeolocationService,
    public authService: AuthService,
    public translateService: TranslationService,
  ) {}
}
