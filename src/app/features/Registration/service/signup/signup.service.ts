import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EpConfig } from '../../../../util/utils/ep-config';
import { of } from 'rxjs';
import { FormField } from '../../form-field';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { environment } from '../../../../util/constants/app.constant';
import { apiEndPoints } from '../../../../util/constants/url.constants';
import { Api } from '../../../../services/api';
import { ApiUrlService } from '../../../../services/api-url.service';
@Injectable({
  providedIn: 'root',
})
export class SignupService {
  baseUrl = EpConfig.getMockUrl();
  appUrl = EpConfig.getServerUrl();
  formFields: any;
  formG: FormGroup | any;
  constructor(private http: HttpClient, private api: Api, private apiUrlService: ApiUrlService) {}
  getsignupformData(lang: string) {
    return this.api.get(this.baseUrl + apiEndPoints.Signup.getsignupformData + lang);
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
    return this.api.get(this.appUrl + apiEndPoints.Signup.selfRegistration + lang);
  }
  isUnique(type: any, val: any) {
    return this.api.get(this.appUrl + this.apiUrlService.isEmailExist(type, val));
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
    return this.api.post(this.appUrl + apiEndPoints.Signup.generateBearer, formData, httpOptions);
  }

  getFormControls(inputs: any) {
    const $this = this;
    const promise = new Promise(function (resolve, _reject) {
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

    return this.api.post(this.appUrl + apiEndPoints.Signup.validateReferralCode, postData);
  }
  uploadFile(file: any, mobile: any, type: any) {
    // const body = new FormData();
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Accept: '*/*',
    //   }),
    // };
    // body.append('file', file, file.name);
    // return this.api.post(this.appUrl + this.apiUrlService.uploadFile(mobile, type), httpOptions);
    let body = new FormData();
    body.append('file', file);
    const token = sessionStorage.getItem('access_token');
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryPr0IbOJDCwRgjHMq',
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
    // const body = new FormData();
    // const token = sessionStorage.getItem('access_token');
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Accept: '*/*',
    //     Authorization: `Bearer ${token}`,
    //   }),
    // };
    // body.append('file', file, file.name);
    // return this.api.post(
    //   this.appUrl + `mobiquitypay/dms/v3/doc?uploadedBy=${mobile}&documentType=${type}&documentName=${docType}`,
    //   body,
    //   httpOptions,
    // );
    let body = new FormData();
    body.append('file', file, file.name);
    const token = sessionStorage.getItem('access_token');
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
    const token = sessionStorage.getItem('access_token');

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
