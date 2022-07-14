import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';
import { PreloginService } from './preLogin/pre-login.service';
import { SignupService } from './signup/signup.service';
import { IpGeolocationService } from './auth/ip-geolocation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { TranslationService } from './transalation.service';
import { Api } from './api';
import { ApiUrlService } from './api-url.service';
@Injectable({
  providedIn: 'root',
})
export class UowService {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public loginService: LoginService,
    public preLoginService: PreloginService,
    public signupService: SignupService,
    public ipGeolocationService: IpGeolocationService,
    public authService: AuthService,
    public translateService: TranslationService,
    public api: Api,
    public apiUrlService: ApiUrlService,
  ) {}
}
