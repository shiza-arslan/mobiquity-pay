import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../../pre-auth/components/login/login.component';
@Component({
  selector: 'mobiquity-pay-signup-header',
  templateUrl: './signup-header.component.html',
  styleUrls: ['./signup-header.component.scss'],
})
export class SignupHeaderComponent implements OnInit {
  constructor(private modalSerivce: NgbModal) {}

  ngOnInit(): void {}

  openModal() {
    const modalRef = this.modalSerivce.open(LoginComponent, { animation: false, backdrop: false });
  }
}
