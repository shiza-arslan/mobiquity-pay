import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UowService } from '@mobiquity/services';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ChangePinComponent } from '../change-pin/change-pin.component';
import { OtpComponent } from '../otp/otp.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorPopupComponent } from '../error-popup/error-popup.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerSupportComponent } from '../customer-support/customer-support.component';
import { SuccessPinComponent } from '../success-pin/success-pin.component';

@Component({
  selector: 'mobiquity-pay-forget-pin',
  templateUrl: './forget-pin.component.html',
  styleUrls: ['./forget-pin.component.scss'],
})
export class ForgetPinComponent implements OnInit {
  selectedLanguage: any = 'en';
  translation: any;
  FGPin!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private matDialog: MatDialog,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<ForgetPinComponent>,
    private service: UowService,
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = 'en';
    if (localStorage.getItem('language')) {
      this.selectedLanguage = localStorage.getItem('language');
    }
    this.service.translateService.language.subscribe((res: any) => {
      this.service.translateService.get().subscribe((data: any) => {
        this.translation = data.forgotPin;
      });
    });
    this.service.translateService.getLang().subscribe((lang: any) => {
      this.selectedLanguage = lang;
      console.log('active lang', lang);
    });
    this.FGPin = this.fb.group({
      mobile: ['', Validators.required],
    });
  }
  forgetPin() {
    this.spinner.show();
    console.log(this.FGPin.value.mobile);
    if (this.FGPin.invalid) return;
    localStorage.setItem('mobile', this.FGPin.value.mobile);
    this.service.loginService.forgetPin({ mobile: this.FGPin.value.mobile, language: this.selectedLanguage }).subscribe(
      (res: any) => {
        localStorage.setItem('serviceRequestId', res.serviceRequestId);
        if (res.status === 'PAUSED') {
          // this.service.loginService.generateBearer().subscribe((res: any) => {
          // localStorage.setItem('access_token', res.access_token);
          // this.activeModal.dismiss();
          this.closeModal();
          this.spinner.hide();
          // const modalRef = this.modalSerivce.open(OtpComponent, { animation: false, backdrop: false });
          // modalRef.componentInstance.isForgotPassword = true;
          this.matDialog.open(OtpComponent, {
            data: { isForgotPassword: true },
          });
          //  });

          /* const modalRef = this.modalSerivce.open(OtpComponent, { animation: false, backdrop:false});
          modalRef.componentInstance.isForgotPassword = true;*/
          /* this.router.navigate(['/otp'], {
            queryParams: { isForgotPassword: true },
          });*/
        }
      },
      (error: any) => {
        this.spinner.hide();
        console.log('error res', error);
        if (error.status === 'FAILED') {
          // this.activeModal.dismiss();
          this.closeModal();
          // const modalRef = this.modalSerivce.open(ErrorPopupComponent, { animation: false, backdrop: false });
          // modalRef.componentInstance.errorMessage = error.error.errors[0].message;
          this.matDialog.open(ErrorPopupComponent, {
            data: error.errors[0].message,
          });
        }
      },
    );
  }
  customerSupport() {
    // this.activeModal.dismiss();
    this.closeModal();
    // const modalRef = this.modalSerivce.open(CustomerSupportComponent, { animation: false, backdrop: false });
    this.matDialog.open(CustomerSupportComponent);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
