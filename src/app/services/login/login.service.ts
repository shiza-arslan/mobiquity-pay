import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EpConfig } from '../../common/configs/ep-config';
import { environment } from '../../common/configs/constants/app.constant';
import { BehaviorSubject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = EpConfig.getServerUrl();
  appURL = EpConfig.getMockUrl();
  // appURL= EpConfig.getDemoServerUrl();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    }),
  };
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<any>(null);
  private authorizationProfile = new BehaviorSubject<any>(null);
  private securityProfile = new BehaviorSubject<any>(null);
  private walletBalance = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, private deviceService: DeviceDetectorService) {}
  login(data: any) {
    let body = environment.constants;
    body.identifierValue = data.mobile;
    body.authenticationValue = data.pin;
    body.deviceInfo.browser = this.deviceService.browser;
    body.deviceInfo.model = this.deviceService.browser;
    body.deviceInfo.os = this.deviceService.os;

    /* return this.http.post(
      this.baseUrl + 'firstTimeLogin',
      body
    );*/
    /*  return this.http.post(
      this.baseUrl + 'subscriberLogin',
      body
    );*/
    return this.http.post(this.baseUrl + 'mobiquity-pay/ums/v3/user/auth/web/login', body);
  }
  verifyOTP(body: any) {
    const token = localStorage.getItem('access_token');
    console.log('token', token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.post(
      this.baseUrl + `mobiquity-pay/v1/otp/validate`,
      //this.baseUrl + `mobiquity-pay/v2/ums/user/auth/self-set-auth/validate-otp`,
      body,
      httpOptions,
    );
  }
  //OTP Validation for Forget PIN
  validateOTPVIAFP(body: any) {
    const token = localStorage.getItem('access_token');
    console.log('token', token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.post(
      //this.baseUrl + `mobiquity-pay/v1/otp/validate`,
      this.baseUrl + `mobiquity-pay/v2/ums/user/auth/self-set-auth/validate-otp`,
      body,
      httpOptions,
    );
  }
  loginConfirm(body: any) {
    const token = localStorage.getItem('access_token');
    console.log('token', token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseUrl + `mobiquity-pay/ums/v3/user/auth/web/login-confirm`,
      //this.baseUrl + `mobiquity-pay/v2/ums/user/auth/self-set-auth/validate-otp`,
      body,
      httpOptions,
    );
  }
  generateOtp(phone: any) {
    let body = {
      identifierType: environment.constants.identifierType,
      otpServiceCode: environment.constants.otpServiceCode,
      identifierValue: phone,
    };
    const token = localStorage.getItem('access_token');
    //  console.log('token',token)
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(this.baseUrl + 'mobiquity-pay/v2/otp/generate', body, httpOptions);
  }
  loginSuccessfully() {
    let access_token = localStorage.getItem('access_token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${access_token}`,
      }),
    };
    this.http.get(this.baseUrl + 'mobiquity-pay/v1/authorization-profile', httpOptions).subscribe((res: any) => {
      this.authorizationProfile.next(res);
      let mobile = localStorage.getItem('mobile');

      this.http
        .get(
          this.baseUrl +
            `mobiquity-pay/v1/security-profile?workspace=${environment.constants.workspaceId}&identifierValue=${mobile}&identifierType=${environment.constants.identifierType}`,
          httpOptions,
        )
        .subscribe((res: any) => {
          this.securityProfile.next(res.securityProfile);

          this.http.get(this.baseUrl + 'mobiquity-pay/v1/user/self/account', httpOptions).subscribe((res: any) => {
            this.user.next(res);
            console.log('auth profile', this.user);
            console.log(res);

            this.isLoggedIn.next(true);
            //post obj for balance inquiry
            let balanceObj = {
              bearerCode: 'MOBILE',
              currency: '',
              initiator: 'transactor',
              language: localStorage.getItem('language'),
              openingBalanceReq: res.userDetails.userStatus,
              transactor: {
                idType: 'mobileNumber',
                idValue: res.userDetails.mobileNumber,
                mpin: localStorage.getItem('mpin'),
                pin: '',
                productId: '',
              },
            };

            this.http
              .post(this.baseUrl + `/mobiquity-pay/ums/v1/user/wallet/balance`, balanceObj, httpOptions)
              .subscribe((res: any) => {
                console.log('balance res');
                console.log(res);
                this.walletBalance.next(res);
              });
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userObj', res);
          });
        });
    });
  }
  changePin(data: any) {
    let postData = {
      confirmedAuthenticationValue: data.confirmPin,
      identifierType: environment.constants.identifierType,
      identifierValue: data.mobile,
      language: data.language,
      newAuthenticationValue: data.pin,
      oldAuthenticationValue: '0000',
      requestedBy: environment.constants.requestedBy,
      workspaceId: environment.constants.workspaceId,
    };
    const token = localStorage.getItem('access_token');
    // console.log('token',token)
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }),
    };
    //this.httpOptions.headers.append('Authorization',`Bearer ${token}`)
    return this.http.post(this.baseUrl + `mobiquity-pay/ums/v2/user/auth/change-credential`, postData, httpOptions);
  }
  resetPIN(data: any) {
    let postData = {
      confirmedAuthenticationValue: data.confirmPin,
      resumeServiceRequestId: localStorage.getItem('serviceRequestId'),
      language: data.language,
      newAuthenticationValue: data.pin,
    };
    const token = localStorage.getItem('access_token');
    // console.log('token',token)
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }),
    };
    //this.httpOptions.headers.append('Authorization',`Bearer ${token}`)
    return this.http.post(this.baseUrl + `mobiquity-pay/v2/ums/user/auth/self-set-auth/confirm`, postData, httpOptions);
  }
  forgetPin(data: any) {
    let reqData = {
      bearerCode: environment.constants.bearerCode,
      //otpServiceCode: environment.constants.otpServiceCode,
      identifierValue: data.mobile,
      identifierType: environment.constants.identifierType,
      workspaceId: environment.constants.workspaceId,
      language: data.language,
    };
    const token = localStorage.getItem('access_token');

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.post(this.baseUrl + `mobiquity-pay/v2/ums/user/auth/self-set-auth/initiate`, reqData, httpOptions);
  }
  getAuthorizationProfile() {
    return this.authorizationProfile.asObservable();
  }
  generateBearer() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: 'Basic Q29yZVdlYjphZGF5ZmNTV2NJ',
      }),
    };
    const formData = new FormData();
    formData.append('grant_type', 'client_credentials');
    return this.http.post(this.baseUrl + 'mobiquity-pay/oauth/token', formData, httpOptions);
  }

  getSecurityProfile() {
    return this.securityProfile.asObservable();
  }

  getUser() {
    return this.user.asObservable();
  }
  getIsLoggedIn() {
    return this.isLoggedIn.asObservable();
  }
  resendOTP() {
    let body = {
      resumeServiceRequestId: localStorage.getItem('serviceRequestId'),
    };
    const token = localStorage.getItem('access_token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(this.baseUrl + 'mobiquity-pay/v1/otp/resend', body, httpOptions);
  }
}
