import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../../home/components/login/login.component';

@Component({
  selector: 'mobiquity-pay-success-pin',
  templateUrl: './success-pin.component.html',
  styleUrls: ['./success-pin.component.scss'],
})
export class SuccessPinComponent implements OnInit {
  message = 'PIN changed successfully!';
  constructor(private matDialog: MatDialog, private dialogRef: MatDialogRef<SuccessPinComponent>) {}

  ngOnInit(): void {}
  login() {
    this.matDialog.open(LoginComponent);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
