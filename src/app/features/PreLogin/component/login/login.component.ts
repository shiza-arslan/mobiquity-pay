import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UowService } from '../../../../services/uow.service';
import { ElementRef } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { OtpComponent } from '../../../../shared/components/otp/otp.component';
import { ChangePinComponent } from '../../../../shared/components/change-pin/change-pin.component';
import { ForgetPinComponent } from '../../../../shared/components/forget-pin/forget-pin.component';
import { SuccessPinComponent } from '../../../../shared/components/success-pin/success-pin.component';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorPopupComponent } from '../../../../shared/components/error-popup/error-popup.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { getWebConfig } from '@mobiquity/webConfig';
import { config } from 'rxjs';

@Component({
  selector: 'mobiquity-pay-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  selectedLanguage: any = 'en';
  translation: any;
  type = 'password';
  Config = getWebConfig();
  maxLengthUser = this.Config.screenSettings.validations.maxLengthUser;
  maxLengthPIN = this.Config.screenSettings.validations.maxLengthPIN;
  languages = this.Config.screenSettings.languages;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private el: ElementRef,
    private matDialog: MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>,
    private spinner: NgxSpinnerService,
    private service: UowService,
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = 'en';

    if (sessionStorage.getItem('language')) {
      this.selectedLanguage = sessionStorage.getItem('language');
    }
    this.service.translateService.language.subscribe((res: any) => {
      this.service.translateService.get().subscribe((data: any) => {
        this.translation = data.login;
      });
    });
    this.service.translateService.getLang().subscribe((lang: any) => {
      this.selectedLanguage = lang;
    });
    this.loginForm = this.fb.group({
      mobile: ['', Validators.required],
      pin: ['', Validators.required],
    });
  }
  showPassword() {
    if (this.type == 'text') {
      this.type = 'password';
    } else {
      this.type = 'text';
    }
  }
  changeLanguage(lang: string) {
    this.service.translateService.setLang(lang);
    this.selectedLanguage = lang;
    sessionStorage.setItem('language', lang);
  }
  login() {
    this.spinner.show();
    sessionStorage.setItem('mobile', this.loginForm.value.mobile);
    // sessionStorage.setItem('mpin', this.loginForm.value.pin);
    this.service.loginService
      .login({ ...this.loginForm.value, language: this.selectedLanguage })
      .pipe(map((res1: any) => res1))
      .subscribe(
        async (res: any) => {
          if (res.status == 'PAUSED') {
            sessionStorage.setItem('serviceRequestId', res.serviceRequestId);
            // sessionStorage.setItem('access_token', res.access_token);
            this.closeModal();
            this.spinner.hide();
            this.matDialog.open(OtpComponent, {
              data: { isNormalUser: true },
            });
          } else if (res.status == 'SUCCEEDED') {
            //sessionStorage.setItem('access_token', res.token.access_token);
            await this.service.loginService.loginSuccessfully();
            this.spinner.hide();
            // this.activeModal.dismiss();
            this.closeModal();
            this.router.navigate(['/']);
          }
        },
        (error: any) => {
          this.spinner.hide();

          if ((error.status === 'FAILED' && error.errors[0].code === 'AUTH_06') || error.errors[0].code === 'AUTH01') {
            // const modalRef = this.modalSerivce.open(ErrorPopupComponent, { animation: false, backdrop: false });
            // modalRef.componentInstance.errorMessage = error.error.errorUserMsg;
            this.matDialog.open(ErrorPopupComponent, {
              data: error.errorUserMsg,
            });
          } else if (error.status === 'FAILED' && error.errors[0].code === 'FTL01') {
            this.closeModal();
            // this.activeModal.dismiss();
            // const modalRef = this.modalSerivce.open(ChangePinComponent, { animation: false, backdrop: false });
            this.matDialog.open(ChangePinComponent);
          } else {
            // const modalRef = this.modalSerivce.open(ErrorPopupComponent, { animation: false, backdrop: false });
            // modalRef.componentInstance.errorMessage = error.error.errors[0].message;
            this.matDialog.open(ErrorPopupComponent, {
              data: error.errors[0].message,
            });
          }
        },
      );
  }
  forgetPIN() {
    // this.activeModal.dismiss();
    // const modalRef = this.modalSerivce.open(ForgetPinComponent, { animation: false, backdrop: false });
    this.dialogRef.close();
    this.matDialog.open(ForgetPinComponent);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
