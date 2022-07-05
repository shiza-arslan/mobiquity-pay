import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UowService } from '../../../../data-acsess/uow.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePinComponent } from '../../../shared/components/change-pin/change-pin.component';
import { OtpComponent } from '../otp/otp.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorPopupComponent } from '../../../../core/components/error-popup/error-popup.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerSupportComponent } from '../customer-support/customer-support.component';

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
    public activeModal: NgbActiveModal,
    private modalSerivce: NgbModal,
    private spinner: NgxSpinnerService,
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
          this.service.loginService.generateBearer().subscribe((res: any) => {
            localStorage.setItem('access_token', res.access_token);
            this.activeModal.dismiss();
            this.spinner.hide();
            const modalRef = this.modalSerivce.open(OtpComponent, { animation: false, backdrop: false });
            modalRef.componentInstance.isForgotPassword = true;
          });

          /* const modalRef = this.modalSerivce.open(OtpComponent, { animation: false, backdrop:false});
          modalRef.componentInstance.isForgotPassword = true;*/
          /* this.router.navigate(['/otp'], {
            queryParams: { isForgotPassword: true },
          });*/
        }
      },
      (error: HttpErrorResponse) => {
        this.spinner.hide();
        console.log('error res', error);
        if (error.error.status === 'FAILED') {
          this.activeModal.dismiss();
          const modalRef = this.modalSerivce.open(ErrorPopupComponent, { animation: false, backdrop: false });
          modalRef.componentInstance.errorMessage = error.error.errors[0].message;
        }
      },
    );
  }
  customerSupport() {
    this.activeModal.dismiss();
    const modalRef = this.modalSerivce.open(CustomerSupportComponent, { animation: false, backdrop: false });
  }
}
