import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EpConfig } from '../../common/configs/ep-config';
import { environment } from '../../common/configs/constants/app.constant';
import { BehaviorSubject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import {apiEndPoints} from '../../common/configs/constants/url.constants';
import { Api} from '../api';
import {ApiUrlService} from "../api-url.service";
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
  constructor(private http: HttpClient, private deviceService: DeviceDetectorService , private Api : Api , private seriveUrl : ApiUrlService) {}
  login(data: any) {
    const body = environment.constants;
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
    // return this.http.post(this.baseUrl + 'mobiquity-pay/ums/v3/user/auth/web/login', body);
    return this.http.post(this.baseUrl + apiEndPoints.login.loginUrl, body);
  }
  verifyOTP(body: any) {
    return this.Api.post(
      this.baseUrl + apiEndPoints.login.verifyOTPUrl, body,);
  }
  //OTP Validation for Forget PIN
  validateOTPVIAFP(body: any) {
    return this.Api.post(
      this.baseUrl + apiEndPoints.login.validateOTPVIAFPUrl,
      body,

    );
  }
  loginConfirm(body: any) {

    return this.Api.post(
      this.baseUrl + apiEndPoints.login.loginConfirmUrl, body,);
  }
  generateOtp(phone: any) {
    const body = {
      identifierType: environment.constants.identifierType,
      otpServiceCode: environment.constants.otpServiceCode,
      identifierValue: phone,
    };

    return this.Api.post(this.baseUrl + apiEndPoints.login.generateOtp, body);
  }
  loginSuccessfully() {
    const access_token = localStorage.getItem('access_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${access_token}`,
      }),
    };
    this.http.get(this.baseUrl + apiEndPoints.login.authorizationProfileUrl, httpOptions).subscribe((res: any) => {
      this.authorizationProfile.next(res);
      const mobile = localStorage.getItem('mobile');

      this.http
        .get(
          this.baseUrl +
          `mobiquity-pay/v1/security-profile?workspace=${environment.constants.workspaceId}&identifierValue=${mobile}&identifierType=${environment.constants.identifierType}`,
          httpOptions,
        )
        .subscribe((res: any) => {
          this.securityProfile.next(res.securityProfile);

          this.http.get(this.baseUrl + apiEndPoints.login.selfAccountUrl, httpOptions).subscribe((res: any) => {
            this.user.next(res);
            console.log('auth profile', this.user);
            console.log(res);

            this.isLoggedIn.next(true);
            //post obj for balance inquiry
            const balanceObj = {
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
              .post(this.baseUrl + apiEndPoints.login.walletBallanceUrl, balanceObj, httpOptions)
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
    const postData = {
      confirmedAuthenticationValue: data.confirmPin,
      identifierType: environment.constants.identifierType,
      identifierValue: data.mobile,
      language: data.language,
      newAuthenticationValue: data.pin,
      oldAuthenticationValue: '0000',
      requestedBy: environment.constants.requestedBy,
      workspaceId: environment.constants.workspaceId,
    };


    return this.Api.post(this.baseUrl + apiEndPoints.login.changePinUrl, postData,);
  }
  resetPIN(data: any) {
    const postData = {
      confirmedAuthenticationValue: data.confirmPin,
      resumeServiceRequestId: localStorage.getItem('serviceRequestId'),
      language: data.language,
      newAuthenticationValue: data.pin,
    };


    return this.Api.post(this.baseUrl + apiEndPoints.login.resetPinUrl, postData);
  }
  forgetPin(data: any) {
    const reqData = {
      bearerCode: environment.constants.bearerCode,
      //otpServiceCode: environment.constants.otpServiceCode,
      identifierValue: data.mobile,
      identifierType: environment.constants.identifierType,
      workspaceId: environment.constants.workspaceId,
      language: data.language,
    };


    return this.Api.post(this.baseUrl + apiEndPoints.login.forgotPinUrl, reqData,);
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
    return this.http.post(this.baseUrl + apiEndPoints.login.generateBearerUrl, formData, httpOptions);
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
    const body = {
      resumeServiceRequestId: localStorage.getItem('serviceRequestId'),
    };

    return this.Api.post(this.baseUrl + apiEndPoints.login.resendOTPUrl, body );
  }
}
