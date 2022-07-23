import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UowService } from '@mobiquity/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../../../features/PreLogin/component/login/login.component';
import { SuccessPinComponent } from '../success-pin/success-pin.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorPopupComponent } from '../error-popup/error-popup.component';
import { getWebConfig } from '@mobiquity/webConfig';

@Component({
  selector: 'mobiquity-pay-change-pin',
  templateUrl: './change-pin.component.html',
  styleUrls: ['./change-pin.component.scss'],
})
export class ChangePinComponent implements OnInit {
  selectedLanguage: any = 'en';
  translation: any;
  errorMessage = '';
  hasErrors = false;
  mobile: any;
  type = 'password';
  resetForm!: FormGroup;
  Config = getWebConfig();

  maxLengthPIN = this.Config.screenSettings.validations.maxLengthPIN;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private service: UowService,
    private dialogRef: MatDialogRef<ChangePinComponent>,
    @Inject(MAT_DIALOG_DATA) public isForgotPassword: boolean,
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = 'en';
    this.mobile = sessionStorage.getItem('mobile');
    if (sessionStorage.getItem('language')) {
      this.selectedLanguage = sessionStorage.getItem('language');
    }
    this.service.translateService.language.subscribe((res: any) => {
      this.service.translateService.get().subscribe((data: any) => {
        this.translation = data.forgotPin;
      });
    });
    this.service.translateService.getLang().subscribe((lang: any) => {
      this.selectedLanguage = lang;
    });
    this.resetForm = this.fb.group({
      pin: ['', Validators.required],
      confirmPin: ['', Validators.required],
    });
  }
  onFocusOutEvent(event: any) {
    if (this.resetForm.value.confirmPin === '' || this.resetForm.value.pin === '') return;
    if (this.resetForm.value.pin !== this.resetForm.value.confirmPin) {
      this.hasErrors = true;
      this.errorMessage = "PIN doesn't match.";
    } else {
      this.hasErrors = false;
      this.errorMessage = '';
    }
  }
  changePin() {
    if (this.resetForm.invalid || this.hasErrors) return;
    if (this.isForgotPassword) {
      this.service.loginService.resetPIN({ ...this.resetForm.value, language: this.selectedLanguage }).subscribe(
        async (res: any) => {
          this.closeModal();

          if (res.status === 'SUCCEEDED') {
            this.matDialog.open(SuccessPinComponent);
          }
        },
        (error: any) => {
          if (error.status === 'FAILED') {
            this.closeModal();
            this.matDialog.open(ErrorPopupComponent, {
              data: error.errors[0].message,
            });
          }
        },
      );
    } else {
      this.service.loginService
        .changePin({ ...this.resetForm.value, language: this.selectedLanguage, mobile: this.mobile })
        .subscribe(
          async (res: any) => {
            this.closeModal();
            if (res.status === 'SUCCEEDED') {
              this.matDialog.open(SuccessPinComponent);

            }
          },
          (error: any) => {
            if (error.status === 'FAILED') {
              this.closeModal();

              this.matDialog.open(ErrorPopupComponent, {
                data: error.errors[0].message,
              });
            }
          },
        );
    }
  }
  showPassword() {
    if (this.type == 'text') {
      this.type = 'password';
    } else {
      this.type = 'text';
    }
  }
  closeModal() {
    this.dialogRef.close();
  }
}
