import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss'],
})
export class ErrorPopupComponent implements OnInit {
  @Input() public errorMessage: any = '';
  constructor(public activeModal: NgbActiveModal, private modalSerivce: NgbModal) {}

  ngOnInit(): void {}
  close() {
    this.activeModal.dismiss();
  }
}
