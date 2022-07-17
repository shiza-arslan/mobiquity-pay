import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss'],
})
export class ErrorPopupComponent implements OnInit {
  constructor(
    private matDialog: MatDialog,
    private dialogRef: MatDialogRef<ErrorPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public errorMsg: any,
  ) {}
  ngOnInit(): void {}
  closeModal() {
    // this.activeModal.dismiss();
    this.dialogRef.close();
  }
}
