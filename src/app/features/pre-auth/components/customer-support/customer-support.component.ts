import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'mobiquity-pay-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss'],
})
export class CustomerSupportComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    //window.scrollTo(0, 0)
  }
}
