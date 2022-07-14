import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { UowService } from '@mobiquity/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginComponent } from '../../pages/login/login.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'mobiquity-pay-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  language: any;
  translation: any = [];
  constructor(private service: UowService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.language = 'en';
    if (localStorage.getItem('language')) {
      this.language = localStorage.getItem('language');
    }
    this.service.translateService.language.subscribe((res: any) => {
      this.service.translateService.getLang().subscribe((lang: any) => {
        this.language = lang;
        this.service.translateService.get().subscribe((data: any) => {
          this.translation = data.home;
        });
        console.log('active lang', lang);
      });
    });
  }
  isUserLoggedIn() {
    if (localStorage.getItem('isLoggedIn')) {
      //to do
    } else {
      // const modalRef = this.modalSerivce.open(LoginComponent);
      this.matDialog.open(LoginComponent);
    }
  }
}
