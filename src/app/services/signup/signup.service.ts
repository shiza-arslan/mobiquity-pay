import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EpConfig } from '../../common/configs/ep-config';
import { of } from 'rxjs';
import { FormField } from '../../models/form-field';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { environment } from '../../common/configs/constants/app.constant';
import {apiEndPoints} from '../../common/configs/constants/url.constants';
import  {Api}  from  '../api';
import {ApiUrlService} from "../api-url.service";
@Injectable({
  providedIn: 'root',
})
export class SignupService {
  baseUrl = EpConfig.getMockUrl();
  appUrl = EpConfig.getServerUrl();
  formFields: any;
  formG: FormGroup | any;
  constructor(private http: HttpClient , private Api : Api , private  service : ApiUrlService) {}
  getsignupformData(lang: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
      }),
    };
    return this.http.get(this.baseUrl + apiEndPoints.Signup.getsignupformData + lang, httpOptions);
  }

  toFormGroup(inputs: any[]): FormGroup {
    const group: any = {};
    inputs.forEach((input) => {
      group[input.key] = input.isValidations
        ? new FormControl(input.value || '', [Validators.required])
        : new FormControl(input.value || '');
    });
    return new FormGroup(group);
  }

  getSelfRegistration(lang: string) {
    const token = localStorage.getItem('access_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get(this.appUrl +apiEndPoints.Signup.selfRegistration + lang, httpOptions);
  }
  isUnique(type: any, val: any) {
    const token = localStorage.getItem('access_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get(
      this.appUrl + this.service.isEmailExist(type , val),
      httpOptions,
    );
      // `/mobiquitypay/v1/user-management/validate/uniqueness?uniqueIdType=${type}&uniqunessValue=${val}&workspaceId=SUBSCRIBER\\`

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
    return this.http.post(this.appUrl + apiEndPoints.Signup.generateBearer, formData, httpOptions);
  }

  getFormControls(inputs: any) {
    const $this = this;
    const promise = new Promise(function (resolve, reject) {
      resolve($this.createControls(inputs));
    });
    return promise;
  }
  createControls(schema: any) {
    const inputs: FormField<string>[] = [];
    schema.forEach((step: any) => {
      const sections = step.sections;
      sections.forEach((section: any) => {
        const fields = section.fields;
        fields.forEach((field: any) => {
          let isValidations = false;
          let validations: any = '';
          let validatorArr: any = [];
          if (field.validations) {
            field.validations.forEach((item: any) => {
              if (item.name === 'required') {
                isValidations = true;
                validations = item.message;
                validatorArr = [Validators.required];
              }
            });
          }
          inputs.push(
            new FormField<string>({
              controlType: field.inputType,
              key: field.id,
              placeholder: field.placeholder,
              label: field.label,
              type: field.inputType,
              validations: validations,
              isValidations: isValidations,
              validators: validatorArr,
              options: field.options,
            }),
          );
        });
      });
    });

    this.formFields = inputs;
    this.formG = this.toFormGroup(inputs);
    //return of(inputs.sort((a, b) => a.order - b.order));
    return of(inputs);
  }
  validateReferralCode(refCode: any) {
    const postData = {
      workspaceId: environment.constants.workspaceId,
      referralCode: refCode,
    };


    return this.Api.post(this.appUrl + apiEndPoints.Signup.validateReferralCode, postData,);
  }
  uploadFile(file: any, mobile: any, type: any) {
    const body = new FormData();
    body.append('file', file, file.name);
    return this.Api.post(
      this.appUrl +this.service.uploadFile(mobile ,type), body,);
  }

  uploadFileKYC(file: any, mobile: any, type: any, docType: any) {
    const body = new FormData();
    body.append('file', file, file.name);
    return this.Api.post(
      this.appUrl + this.service.uploadFileKYC(mobile ,type ,docType),
      body,
    );
  }
  RegisterUser(payLoad: any) {

    return this.Api.post(this.appUrl +apiEndPoints.Signup.registerUser, payLoad, );
  }
}
