import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoginComponent} from "../../../features/PreLogin/component/login/login.component";
@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.scss'],
})
export class SuccessPopupComponent implements OnInit {
  message:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private matDialog: MatDialog, private dialogRef: MatDialogRef<SuccessPopupComponent>,) {
    this.message = data.message;
  }

  ngOnInit(): void {}
  login(){
    this.matDialog.open(LoginComponent);
  }
  closeModal() {
    this.dialogRef.close();
  }
}
