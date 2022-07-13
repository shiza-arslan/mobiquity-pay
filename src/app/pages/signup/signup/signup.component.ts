import { Component, OnInit, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { UowService } from '../../../services/uow.service';
import { Observable } from 'rxjs';
import { FormField } from '../../../models/form-field';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { OtpComponent } from '../../../shared/ui-common/otp/otp.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../common/configs/constants/app.constant';
import { ErrorPopupComponent } from '../../../shared/ui-common/error-popup/error-popup.component';
import { SuccessPopupComponent } from '../../../shared/ui-common/success-popup/success-popup.component';
import { SuccessPinComponent } from '../../../shared/ui-common/success-pin/success-pin.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'mobiquity-pay-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignUpComponent implements OnInit, OnChanges {
  language: any;
  formFields: Observable<any> | any;
  formField: FormField<string>[] = [];
  registerForm: FormGroup | any;
  get fc() {
    return this.registerForm.controls;
  }
  get valid() {
    return this.registerForm.valid;
  }
  signupJsonData: any = [];
  docTypeKYC = '';
  countryList: any = [];
  countriesList: any = [];
  authProfile: any;
  countrySelected: any;
  translation: any;
  KYCData: any = [];
  userInformation: any;
  activeForm = 'contacts';
  isMobValOTP = false;
  errorMessage = '';
  hasPINError = false;
  hasError = false;
  hasErrorEmail = false;
  hasErrorCode = false;
  isMobValUnique = false;
  isEmailUnique = false;
  isKYCFront = false;
  isKYCBack = false;
  isrefCode = false;
  isRefVal = false;
  mobile: any;
  email: any;
  refCode: any;
  isProfile = false;
  profilePhotoURI = '';
  kycImageUrl = '';
  wizardFormObj = {
    contacts: true,
    address: false,
    kyc: false,
    pin: false,
  };
  public payLoad: any;
  constructor(private service: UowService, public spinner: NgxSpinnerService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.spinner.show();

    this.language = 'en';
    if (localStorage.getItem('language')) {
      this.language = localStorage.getItem('language');
    }
    this.service.translateService.language.subscribe((res: any) => {
      this.service.translateService.getLang().subscribe((lang: any) => {
        this.language = lang;
        this.service.translateService.get().subscribe((data: any) => {
          this.translation = data.register;
        });
        console.log('active lang', lang);
        this.getSignupJson();
      });
    });
  }

  getSignupJson() {
    this.service.signupService.getsignupformData(this.language).subscribe((data: any) => {
      this.signupJsonData = data.payload.schema;

      this.service.signupService.getFormControls(this.signupJsonData).then((res: any) => {
        // console.log(this.signupJsonData[0].label);
        this.formField = this.service.signupService.formFields;
        this.registerForm = this.service.signupService.formG;
        // this.formField[8].value = 'GEN_MAL';
        console.log('formFields', this.formField);

        this.service.loginService.generateBearer().subscribe((res: any) => {
          localStorage.setItem('access_token', res.access_token);

          this.service.signupService.getSelfRegistration(this.language).subscribe((regData: any) => {
            this.countriesList = regData.countryList;

            regData.countryList.forEach((item: any) => {
              let country = {
                key: item.id,
                value: item.displayName,
              };
              this.countryList.push(country);
            });
            this.formField[12].options = this.countryList;
          });
        });
        this.spinner.hide();
      });
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.formFields = this.service.signupService.formFields;
    console.log('formFields', this.formFields);
  }

  displayNextSection(section: string) {
    if (section == 'contacts') {
      this.activeForm = section;
      this.wizardFormObj.contacts = true;
      this.wizardFormObj.pin = false;
      this.wizardFormObj.kyc = false;
      this.wizardFormObj.address = false;
    }
    if (section == 'address' && !this.isStepOne()) {
      this.activeForm = section;
      this.wizardFormObj.contacts = true;
      this.wizardFormObj.pin = false;
      this.wizardFormObj.kyc = false;
      this.wizardFormObj.address = true;
    }
    if (section == 'kyc' && !this.isStepOne() && !this.isStepTwo()) {
      this.activeForm = section;
      this.wizardFormObj.kyc = true;
      this.wizardFormObj.contacts = true;
      this.wizardFormObj.pin = false;
      this.wizardFormObj.address = true;
    }
    if (section == 'pin' && !this.isStepOne() && !this.isStepTwo() && !this.isAddKYC()) {
      this.activeForm = section;
      this.wizardFormObj.pin = true;
      this.wizardFormObj.kyc = true;
      this.wizardFormObj.contacts = true;
      this.wizardFormObj.pin = true;
      this.wizardFormObj.address = true;
    }
    if (section == 'kyc-done') {
      this.KYCData = [];
      this.KYCData.push({
        action: 'ADD',
        kycImageUrl: this.kycImageUrl,
        kycGracePeriod: '10',
        kycIdValue: this.registerForm.value.kycIdValue,
        isPrimaryKYCId: 'Yes',
        kycIdType: this.registerForm.value.kycIdType,
        kycIdValidTo: this.registerForm.value.kycIdValidTo,
        name: this.registerForm.value.documentHolderName,
      });
    }
  }
  goBack(section: string) {
    this.activeForm = section;
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.registerForm.getRawValue());
  }
  getStateByCountry(id: any, index: any) {
    this.countrySelected = this.countriesList.filter((item: { id: any }) => item.id == id);
    console.log(this.countrySelected);
    let states: any = [];
    this.countrySelected[0].stateList.forEach((item: any) => {
      let state = {
        key: item.id,
        value: item.displayName,
      };
      states.push(state);
    });

    this.formField[index].options = states;
  }
  getCitiesByState(id: any, index: any) {
    let state = this.countrySelected[0].stateList.filter((item: { id: any }) => item.id == id);
    let cities: any = [];
    state[0].cityList.forEach((item: any) => {
      let city = {
        key: item.id,
        value: item.displayName,
      };
      cities.push(city);
    });
    this.formField[index].options = cities;
  }
  isStepOne() {
    // return false;
    if (
      this.registerForm.controls['mobileNumber'].valid &&
      this.registerForm.controls['emailId'].valid &&
      this.registerForm.controls['referralCode'].valid &&
      this.registerForm.controls['firstName'].valid &&
      this.registerForm.controls['middleName'].valid &&
      this.registerForm.controls['lastName'].valid &&
      this.registerForm.controls['dateOfBirth'].valid &&
      this.registerForm.controls['gender'].valid &&
      this.registerForm.controls['profilePhotoURI'].valid &&
      this.isMobValUnique &&
      this.isMobValOTP
    ) {
      return false;
    } else {
      return true;
    }
  }
  isStepTwo() {
    //return false;
    if (
      this.registerForm.controls['address1'].valid &&
      this.registerForm.controls['address2'].valid &&
      this.registerForm.controls['country'].valid &&
      this.registerForm.controls['state'].valid &&
      this.registerForm.controls['city'].valid &&
      this.registerForm.controls['postalCode'].valid
    ) {
      return false;
    } else {
      return true;
    }
  }
  isAddKYC() {
    if (
      this.registerForm.controls['kycIdType'].valid &&
      this.registerForm.controls['kycIdValue'].valid &&
      this.registerForm.controls['documentHolderName'].valid &&
      this.registerForm.controls['kycImageUrl'].valid
    ) {
      return false;
    } else {
      return true;
    }
  }
  isMobileAlreadyExist(mobile: any) {
    // console.log(this.registerForm.controls['mobileNumber'].invalid , 'constroles');
    if (mobile) {
      this.hasError = false;
      this.errorMessage = '';
      this.mobile = mobile;
      this.service.signupService.isUnique('mobileNumber', mobile).subscribe((resData: any) => {
        if (resData.isAvailable === 'Y') {
          this.isMobValUnique = true;
        } else {
          this.isMobValUnique = false;
          this.hasError = true;
          this.errorMessage = 'Mobile already exist!';
          // const modalRef = this.modalSerivce.open(ErrorPopupComponent, {
          //   animation: false,
          //   backdrop: false,
          //   keyboard: false,
          // });
          // modalRef.componentInstance.errorMessage = 'Account already registered! Please try with another number.';

          this.matDialog.open(ErrorPopupComponent, {
            data: 'Account already registered! Please try with another number.',
          });
          this.registerForm.controls['mobileNumber'].setValue('');
          this.mobile = '';
        }
      });
    }
  }
  generateOTP() {
    if (this.mobile && this.isMobValUnique) {
      this.service.loginService.generateOtp(this.mobile).subscribe(async (res: any) => {
        localStorage.setItem('serviceRequestId', res.serviceRequestId);
        localStorage.setItem('mobile', this.mobile);
        // const modalRef = this.modalSerivce.open(OtpComponent, { animation: false, backdrop: false });
        this.matDialog.open(OtpComponent, {
          data: true,
        });
        // modalRef.componentInstance.isRegUser = true;
        // modalRef.result.then((result) => {
        //   this.isMobValOTP = result;
        // });
      });
    }
  }
  fileUrlChange(event: any) {
    //this.resetProfile();

    if (event.target.files.length > 0 && this.mobile) {
      this.spinner.show();
      let fileUrl = event.target.files[0];
      this.service.signupService.uploadFile(fileUrl, this.mobile, 'PROFILEPIC').subscribe((res: any) => {
        this.isProfile = true;
        this.registerForm.value.profilePhotoURI = res.payload.documentId;
        console.log('profile', res.payload.documentId);
        this.profilePhotoURI = res.payload.documentId;
        this.spinner.hide();
      });
    } else {
      // const modalRef = this.modalSerivce.open(ErrorPopupComponent, { animation: false, backdrop: false });
      // modalRef.componentInstance.errorMessage = 'Please verify mobile number before moving forward.';
      this.matDialog.open(ErrorPopupComponent, {
        data: 'Please verify mobile number before moving forward.',
      });
    }
  }
  uploadKYCDoc(event: any) {
    this.spinner.show();
    if (event.target.files.length > 0 && this.mobile && this.docTypeKYC) {
      let fileUrl = event.target.files[0];
      this.service.signupService.uploadFileKYC(fileUrl, this.mobile, 'KYC', this.docTypeKYC).subscribe((res: any) => {
        this.isKYCFront = true;
        this.registerForm.value.kycImageUrl = res.payload.documentId;
        this.kycImageUrl = res.payload.documentId;
        this.spinner.hide();
        console.log('dowcument KYC', res.payload.documentId);
      });
    }
  }
  uploadKYCBDoc(event: any) {
    this.spinner.show();
    if (event.target.files.length > 0 && this.mobile && this.docTypeKYC) {
      let fileUrl = event.target.files[0];
      this.service.signupService.uploadFileKYC(fileUrl, this.mobile, 'KYC', this.docTypeKYC).subscribe((res: any) => {
        this.isKYCBack = true;
        this.registerForm.value.kycImageUrl = res.payload.documentId;
        this.kycImageUrl = res.payload.documentId;
        // debugger;
        this.spinner.hide();
        console.log('dowcument KYC', res.payload.documentId);
      });
    }
  }
  selectedDocType(type: any) {
    this.docTypeKYC = type;
  }
  resetProfile() {
    this.isProfile = false;
    this.registerForm.controls['profilePhotoURI'].setValue('');
  }
  isEmailAlreadyExist(email: any) {
    if (this.mobile && this.isMobValUnique && this.isMobValOTP) {
      if (email) {
        this.email = email;
        this.hasError = false;
        this.errorMessage = '';
        this.service.signupService.isUnique('emailId', email).subscribe((resData: any) => {
          if (resData.isAvailable === 'Y') {
            this.isEmailUnique = true;
          } else {
            this.isEmailUnique = false;
            this.hasErrorEmail = true;
            this.errorMessage = 'Email already exist!';
          }
        });
      }
    } else {
      // const modalRef = this.modalSerivce.open(ErrorPopupComponent, { animation: false, backdrop: false });
      // modalRef.componentInstance.errorMessage = 'Please verify mobile number before moving forward.';
      this.matDialog.open(ErrorPopupComponent, {
        data: 'Please verify mobile number before moving forward.',
      });
      //this.matDialog.open(ErrorPopupComponent);
    }
  }
  validateReferralCode(refCode: any) {
    if (refCode) {
      this.refCode = refCode;
      this.errorMessage = '';
      this.service.signupService.validateReferralCode(refCode).subscribe(
        (resData: any) => {
          if (resData.status === 'SUCCEEDED') {
            this.isrefCode = true;
          }
        },
        (error: HttpErrorResponse) => {
          this.isrefCode = false;
          this.hasErrorCode = true;
          this.errorMessage = error.error.errors[0].message;
        },
      );
    }
  }
  validatePINMatch(event: any) {
    if (this.registerForm.value.authenticationValue === '' || this.registerForm.value.confirmAuthenticationValue === '')
      return;
    if (this.registerForm.value.authenticationValue !== this.registerForm.value.confirmAuthenticationValue) {
      this.hasPINError = true;
      this.errorMessage = "PIN doesn't match.";
    } else {
      this.hasPINError = false;
      this.errorMessage = '';
    }
  }
  CreateProfile() {
    console.log(this.registerForm.getRawValue());

    let payload = {
      payload: {
        profileDetails: environment.constants.profileDetails,
        userInformation: {
          basicInformation: {
            dateOfBirth: this.registerForm.value.dateOfBirth,
            state: this.registerForm.value.state,
            lastName: this.registerForm.value.lastName,
            firstName: this.registerForm.value.firstName,
            address1: this.registerForm.value.address1,
            mobileNumber: this.mobile,
            authenticationValue: this.registerForm.value.authenticationValue,
            address2: this.registerForm.value.address2,
            preferredLanguage: this.language,
            profilePhotoURI: this.profilePhotoURI,
            middleName: this.registerForm.value.middleName,
            city: this.registerForm.value.city,
            postalCode: this.registerForm.value.postalCode,
            authenticationIdType: environment.constants.identifierType,
            referralCode: this.registerForm.value.referralCode,
            emailId: this.registerForm.value.emailId,
            gender: this.registerForm.value.gender,
            country: this.registerForm.value.country,
            loginId: this.mobile,
          },
          workspaceInformation: environment.constants.workspaceInformation,
        },
        kycs: this.KYCData,
        deviceInfo: {
          deviceId: environment.constants.deviceInfo.deviceId,
          os: environment.constants.deviceInfo.os,
          appVersion: environment.constants.deviceInfo.appVersion,
          appName: environment.constants.deviceInfo.appName,
          providerIpAddress: environment.constants.deviceInfo.providerIpAddress,
          model: environment.constants.deviceInfo.model,
          appIdentifier: environment.constants.deviceInfo.appIdentifier,
          isPublicDevice: environment.constants.deviceInfo.isPublicDevice,
        },
      },
      source: environment.constants.bearerCode,
    };
    this.spinner.show();
    this.service.signupService.RegisterUser(payload).subscribe(
      (resData: any) => {
        //this.activeModal.dismiss();

        this.spinner.hide();
        // const modalRef = this.modalSerivce.open(SuccessPopupComponent, { animation: false, backdrop: false });
        // modalRef.componentInstance.message = resData.message;
        this.matDialog.open(SuccessPopupComponent, {
          data: resData.message,
        });
        this.resetWizard();
      },
      (error: HttpErrorResponse) => {
        this.spinner.hide();
        // const modalRef = this.modalSerivce.open(ErrorPopupComponent, { animation: false, backdrop: false });
        // modalRef.componentInstance.errorMessage = error.error.errors[0].message;
        this.matDialog.open(ErrorPopupComponent, {
          data: error.error.errors[0].message,
        });
      },
    );
  }
  resetWizard() {
    this.registerForm.reset();
    this.activeForm = 'contacts';
    this.isMobValOTP = false;
    this.isMobValUnique = false;
    this.isEmailUnique = false;
    this.isrefCode = false;
    this.hasError = false;
    this.hasErrorCode = false;
    this.hasErrorEmail = false;
    this.errorMessage = '';
    this.isProfile = false;
    this.profilePhotoURI = '';
    this.kycImageUrl = '';
    this.isKYCBack = false;
    this.isKYCFront = false;
    this.wizardFormObj.contacts = true;
    this.wizardFormObj.pin = false;
    this.wizardFormObj.kyc = false;
    this.wizardFormObj.address = false;
    this.mobile = '';
    this.email = '';
    this.refCode = '';
    this.isProfile = false;
    this.profilePhotoURI = '';
    this.kycImageUrl = '';
  }
  backStep(section: string) {
    this.activeForm = section;
  }
  closeModal() {}
}
