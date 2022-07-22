import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/features/PreLogin/component/login/login.component';

@Component({
  selector: 'app-inactivity-popup',
  templateUrl: './inactivity-popup.component.html',
  styleUrls: ['./inactivity-popup.component.scss'],
})
export class InactivityPopupComponent implements OnInit {
  constructor(
    private route: Router,
    private matDialog: MatDialog,
    private dialogRef: MatDialogRef<InactivityPopupComponent>,
  ) {}

  ngOnInit(): void {
    // this.closeModal();
    // console.log('hello close modal');
  }

  keepaLive() {
    this.dialogRef.close(true);
  }
  login() {
    this.closeModal();
    sessionStorage.removeItem('isLoggedIn');
    this.matDialog.open(LoginComponent);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
