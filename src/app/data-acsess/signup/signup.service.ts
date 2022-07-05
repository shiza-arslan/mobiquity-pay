import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EpConfig } from '../../core/configs/ep-config';
import { of } from 'rxjs';
import { FormField } from '../../core/models/form-field';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { environment } from '../../core/configs/constants/app.constant';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  baseUrl = EpConfig.getMockUrl();
  appUrl = EpConfig.getServerUrl();
  formFields: any;
  formG: FormGroup | any;
  constructor(private http: HttpClient) {}
  getsignupformData(lang: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
      }),
    };
    return this.http.get(this.baseUrl + 'categoryProfile/' + lang, httpOptions);
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
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get(this.appUrl + 'mobiquitypay/self-registration/data/' + lang, httpOptions);
  }
  isUnique(type: any, val: any) {
    const token = localStorage.getItem('access_token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get(
      this.appUrl +
        `/mobiquitypay/v1/user-management/validate/uniqueness?uniqueIdType=${type}&uniqunessValue=${val}&workspaceId=SUBSCRIBER\\`,
      httpOptions,
    );
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
    return this.http.post(this.appUrl + 'mobiquitypay/oauth/token', formData, httpOptions);
  }

  getFormControls(inputs: any) {
    var $this = this;
    let promise = new Promise(function (resolve, reject) {
      resolve($this.createControls(inputs));
    });
    return promise;
  }
  createControls(schema: any) {
    const inputs: FormField<string>[] = [];
    schema.forEach((step: any) => {
      let sections = step.sections;
      sections.forEach((section: any) => {
        let fields = section.fields;
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
    let postData = {
      workspaceId: environment.constants.workspaceId,
      referralCode: refCode,
    };
    const token = localStorage.getItem('access_token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }),
    };
    //this.httpOptions.headers.append('Authorization',`Bearer ${token}`)
    return this.http.post(this.appUrl + `/mobiquitypay/v1/referral/referrer-user`, postData, httpOptions);
  }
  uploadFile(file: any, mobile: any, type: any) {
    let body = new FormData();
    body.append('file', file, file.name);
    const token = localStorage.getItem('access_token');
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.post(
      this.appUrl + `mobiquitypay/dms/v3/doc?uploadedBy=${mobile}&documentType=${type}`,
      body,
      httpOptions,
    );
  }

  uploadFileKYC(file: any, mobile: any, type: any, docType: any) {
    let body = new FormData();
    body.append('file', file, file.name);
    const token = localStorage.getItem('access_token');
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.post(
      this.appUrl + `mobiquitypay/dms/v3/doc?uploadedBy=${mobile}&documentType=${type}&documentName=${docType}`,
      body,
      httpOptions,
    );
  }
  RegisterUser(payLoad: any) {
    const token = localStorage.getItem('access_token');
    // console.log('token',token)
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(this.appUrl + `mobiquitypay/v1/ums/user/self`, payLoad, httpOptions);
  }
}
