import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EpConfig } from '../../util/utils/ep-config';
import { environment } from '../../util/constants/app.constant';
import { BehaviorSubject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { apiEndPoints } from '../../util/constants/url.constants';
import { Api } from '../api';
import { ApiUrlService } from '../api-url.service';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = EpConfig.getServerUrl();
  appURL = EpConfig.getMockUrl();
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<any>(null);
  private authorizationProfile = new BehaviorSubject<any>(null);
  private securityProfile = new BehaviorSubject<any>(null);
  private walletBalance = new BehaviorSubject<any>(null);
  constructor(
    private http: HttpClient,
    private deviceService: DeviceDetectorService,
    private api: Api,
    private apiUrlService: ApiUrlService,
  ) {}
  login(data: any) {
    const body = environment.constants;
    body.identifierValue = data.mobile;
    body.authenticationValue = data.pin;
    body.deviceInfo.browser = this.deviceService.browser;
    body.deviceInfo.model = this.deviceService.browser;
    body.deviceInfo.os = this.deviceService.os;
    return this.api.post(this.baseUrl + apiEndPoints.login.loginUrl, body);
  }
  verifyOTP(body: any) {
    return this.api.post(this.baseUrl + apiEndPoints.login.verifyOTPUrl, body);
  }
  //OTP Validation for Forget PIN
  validateOTPVIAFP(body: any) {
    return this.api.post(this.baseUrl + apiEndPoints.login.validateOTPVIAFPUrl, body);
  }
  loginConfirm(body: any) {
    return this.api.post(this.baseUrl + apiEndPoints.login.loginConfirmUrl, body);
  }
  generateOtp(phone: any) {
    const body = {
      identifierType: environment.constants.identifierType,
      otpServiceCode: environment.constants.otpServiceCode,
      identifierValue: phone,
    };

    return this.api.post(this.baseUrl + apiEndPoints.login.generateOtp, body);
  }
  loginSuccessfully() {
    this.api.get(this.baseUrl + apiEndPoints.login.authorizationProfileUrl).subscribe((res: any) => {
      this.authorizationProfile.next(res);
      const mobile = localStorage.getItem('mobile');

      this.api
        .get(
          this.baseUrl +
            `mobiquity-pay/v1/security-profile?workspace=${environment.constants.workspaceId}&identifierValue=${mobile}&identifierType=${environment.constants.identifierType}`,
        )
        .subscribe((res: any) => {
          this.securityProfile.next(res.securityProfile);

          this.api.get(this.baseUrl + apiEndPoints.login.selfAccountUrl).subscribe((res: any) => {
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

            this.api.post(this.baseUrl + apiEndPoints.login.walletBallanceUrl, balanceObj).subscribe((res: any) => {
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

    return this.api.post(this.baseUrl + apiEndPoints.login.changePinUrl, postData);
  }
  resetPIN(data: any) {
    const postData = {
      confirmedAuthenticationValue: data.confirmPin,
      resumeServiceRequestId: localStorage.getItem('serviceRequestId'),
      language: data.language,
      newAuthenticationValue: data.pin,
    };

    return this.api.post(this.baseUrl + apiEndPoints.login.resetPinUrl, postData);
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

    return this.api.post(this.baseUrl + apiEndPoints.login.forgotPinUrl, reqData);
  }
  getAuthorizationProfile() {
    return this.authorizationProfile.asObservable();
  }
  generateBearer() {
    const formData = new FormData();
    formData.append('grant_type', 'client_credentials');
    return this.api.post(this.baseUrl + apiEndPoints.login.generateBearerUrl, formData);
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

    return this.api.post(this.baseUrl + apiEndPoints.login.resendOTPUrl, body);
  }
}
