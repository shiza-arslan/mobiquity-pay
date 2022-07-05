import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../../pre-auth/components/login/login.component';

@Component({
  selector: 'mobiquity-pay-success-pin',
  templateUrl: './success-pin.component.html',
  styleUrls: ['./success-pin.component.scss'],
})
export class SuccessPinComponent implements OnInit {
  message = 'PIN changed successfully!';
  constructor(public activeModal: NgbActiveModal, private modalSerivce: NgbModal) {}

  ngOnInit(): void {}
  login() {
    this.activeModal.dismiss();
    const modalRef = this.modalSerivce.open(LoginComponent, { animation: false, backdrop: false });
  }
}
