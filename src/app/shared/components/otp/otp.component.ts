import { Component, Input, OnInit, Inject } from '@angular/core';
import { UowService } from '@mobiquity/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangePinComponent } from '../change-pin/change-pin.component';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'mobiquity-pay-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  selectedLanguage: any = 'en';
  translation: any;
  mobile: any;
  otp: string = '';
  hasErrors = false;
  errorMessage = '';
  timeLeft: number = 59;
  interval: any;
  isForgotPassword = false;
  isNormalUser = false;
  isRegUser = false;

  //  isForgotPassword = false;
  // @Input() public isForgotPassword: any = false;

  // @Input() public isRegUser: any = false;

  constructor(
    private service: UowService,
    private matDialog: MatDialog,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dialogRef: MatDialogRef<OtpComponent>,
    private route: ActivatedRoute,
    //@Inject(MAT_DIALOG_DATA) public isforgotPassword: boolean,
    //@Inject(MAT_DIALOG_DATA) public isnormalUser: boolean,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.isRegUser = data.isRegUser;
    this.isForgotPassword = data.isForgotPassword;
    this.isNormalUser = data.isNormalUser;
  }

  ngOnInit(): void {
    console.log('normalUser', this.isRegUser);
    this.selectedLanguage = 'en';
    this.mobile = localStorage.getItem('mobile');
    if (localStorage.getItem('language')) {
      this.selectedLanguage = localStorage.getItem('language');
    }
    this.service.translateService.language.subscribe((res: any) => {
      this.service.translateService.get().subscribe((data: any) => {
        this.translation = data.otp;
        this.startTimer();
      });
    });
    this.service.translateService.getLang().subscribe((lang: any) => {
      this.selectedLanguage = lang;
    });
  }
  verifyOTP() {
    this.spinner.show();
    if (this.isForgotPassword) {
      let validationObj = {
        otp: this.otp,
        language: this.selectedLanguage,
        resumeServiceRequestId: localStorage.getItem('serviceRequestId'),
      };
      this.service.loginService.validateOTPVIAFP(validationObj).subscribe(
        async (res: any) => {
          if (res.status === 'PAUSED') {
            // this.activeModal.dismiss();
            this.closeModal();
            this.spinner.hide();
            localStorage.setItem('serviceRequestId', res.serviceRequestId);
            // const modalRef = this.modalSerivce.open(ChangePinComponent, { animation: false, backdrop: false });
            // modalRef.componentInstance.isForgotPassword = true;
            this.matDialog.open(ChangePinComponent, {
              data: true,
            });
          }
        },
        (error: any) => {
          this.spinner.hide();
          if (error.status === 'FAILED') {
            this.hasErrors = true;
            //const modalRef = this.modalSerivce.open(ErrorComponent, { animation: false, backdrop:false});

            this.errorMessage = error.errors[0].message;
          }
        },
      );
    } else if (this.isNormalUser) {
      let confirmObj = {
        otp: this.otp,
        language: this.selectedLanguage,
        resumeServiceRequestId: localStorage.getItem('serviceRequestId'),
      };
      this.service.loginService.loginConfirm(confirmObj).subscribe(
        async (res: any) => {
          if (res.status === 'SUCCEEDED') {
            // this.activeModal.dismiss();
            this.closeModal();
            localStorage.setItem('access_token', res.token.access_token);
            await this.service.loginService.loginSuccessfully();
            this.spinner.hide();
            this.router.navigate(['/']);
          }
        },
        (error: any) => {
          this.spinner.hide();
          if (error.status === 'FAILED') {
            this.hasErrors = true;
            //const modalRef = this.modalSerivce.open(ErrorComponent, { animation: false, backdrop:false});
            this.errorMessage = error.errors[0].message;
          }
        },
      );
    } else {
      let postObj = {
        otp: this.otp,
        resumeServiceRequestId: localStorage.getItem('serviceRequestId'),
      };
      this.service.loginService.verifyOTP(postObj).subscribe(
        async (res: any) => {
          if (res.status === 'SUCCEEDED') {
            this.spinner.hide();
            if (this.isRegUser) {
              this.dialogRef.close(true);
              // this.activeModal.close(true);
            } else {
              // this.activeModal.dismiss();
              this.service.loginService.generateBearer().subscribe(async (res: any) => {
                localStorage.setItem('access_token', res.access_token);
                await this.service.loginService.loginSuccessfully();

                this.router.navigate(['/']);
              });
            }
          }
        },
        (error: any) => {
          this.spinner.hide();
          if (error.status === 'FAILED') {
            this.hasErrors = true;
            this.errorMessage = error.errors[0].message;
          }
        },
      );
    }
  }
  keytab(event: any) {
    let nextInput = event.srcElement.nextElementSibling;
    var target = event.target || event.srcElement;
    var id = target.id;

    if (nextInput == null)
      // check the maxLength from here
      return;
    else nextInput.focus(); // focus if not null
  }
  onOtpChange(otp: any) {
    this.hasErrors = false;
    this.otp = otp;
    this.errorMessage = '';
  }
  reSendOTP() {
    this.hasErrors = false;
    this.service.loginService.generateBearer().subscribe(async (res: any) => {
      localStorage.setItem('access_token', res.access_token);
      this.service.loginService.resendOTP().subscribe(
        async (data: any) => {
          console.log('res resend', data);
          this.hasErrors = true;
          this.errorMessage = data.message;
          this.timeLeft = 59;
          this.startTimer();
        },
        (error: any) => {
          this.hasErrors = true;
          this.errorMessage = 'Something went wrong, please try again';
        },
      );
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
      }
    }, 1000);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
