import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'mobiquity-pay-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss'],
})
export class CustomerSupportComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<CustomerSupportComponent>) {}

  ngOnInit(): void {
    //window.scrollTo(0, 0)
  }

  closeModal() {
    this.dialogRef.close();
  }
}
