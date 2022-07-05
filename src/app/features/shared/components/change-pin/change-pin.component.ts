import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UowService } from '../../../../data-acsess/uow.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../../pre-auth/components/login/login.component';
import { SuccessPinComponent } from '../success-pin/success-pin.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorPopupComponent } from '../../../../core/components/error-popup/error-popup.component';

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
  @Input() public isForgotPassword: any = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private modalSerivce: NgbModal,
    private service: UowService,
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = 'en';
    this.mobile = localStorage.getItem('mobile');
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
      this.service.loginService.generateBearer().subscribe(async (res: any) => {
        localStorage.setItem('access_token', res.access_token);
        this.service.loginService.resetPIN({ ...this.resetForm.value, language: this.selectedLanguage }).subscribe(
          async (res: any) => {
            this.activeModal.dismiss();

            if (res.status === 'SUCCEEDED') {
              const modalRef = this.modalSerivce.open(SuccessPinComponent, { animation: false, backdrop: false });

              // this.router.navigate(['/login']);
              // redirect to  login after popup
            }
          },
          (error: HttpErrorResponse) => {
            if (error.error.status === 'FAILED') {
              this.activeModal.dismiss();
              const modalRef = this.modalSerivce.open(ErrorPopupComponent, { animation: false, backdrop: false });
              modalRef.componentInstance.errorMessage = error.error.errors[0].message;
            }
          },
        );
      });
    } else {
      this.service.loginService
        .changePin({ ...this.resetForm.value, language: this.selectedLanguage, mobile: this.mobile })
        .subscribe(
          async (res: any) => {
            this.activeModal.dismiss();
            if (res.status === 'SUCCEEDED') {
              const modalRef = this.modalSerivce.open(SuccessPinComponent, { animation: false, backdrop: false });

              // this.router.navigate(['/login']);
              // redirect to  login after popup
            }
          },
          (error: HttpErrorResponse) => {
            if (error.error.status === 'FAILED') {
              this.activeModal.dismiss();
              const modalRef = this.modalSerivce.open(ErrorPopupComponent, { animation: false, backdrop: false });
              modalRef.componentInstance.errorMessage = error.error.errors[0].message;
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
}
