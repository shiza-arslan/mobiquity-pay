import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../pages/login/login.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UowService } from '../../services/uow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mobiquity-pay-welcome-header',
  templateUrl: './welcome-header.component.html',
  styleUrls: ['./welcome-header.component.scss'],
})
export class WelcomeHeaderComponent implements OnInit {
  selectedLanguage: any = 'en';
  isLoggedIn: any = false;
  userData: any;
  BalanceInquiry: any;
  translation: any = [];
  languages = [
    {
      label: 'English',
      lang: 'en',
    },
    {
      label: 'Arabic',
      lang: 'ar',
    },
    {
      label: 'French',
      lang: 'french',
    },
    {
      label: 'Spanish',
      lang: 'spanish',
    },
  ];
  constructor(private matDialog: MatDialog, private service: UowService, private route: Router) {}

  ngOnInit(): void {
    localStorage.setItem('language', this.selectedLanguage);
    if (localStorage.getItem('language')) {
      this.selectedLanguage = localStorage.getItem('language');
    }

    this.service.translateService.getLang().subscribe((lang: any) => {
      this.selectedLanguage = lang;
    });

    if (localStorage.getItem('isLoggedIn')) {
      this.isLoggedIn = localStorage.getItem('isLoggedIn');
    } else {
      this.service.loginService.getIsLoggedIn().subscribe((data: any) => {
        this.isLoggedIn = data;
      });

      this.service.loginService.getUser().subscribe((data: any) => {
        this.userData = data;
      });
      this.service.loginService.getSecurityProfile().subscribe((data: any) => {
        this.BalanceInquiry = data;
      });
      this.service.translateService.language.subscribe((res: any) => {
        this.service.translateService.get().subscribe((data: any) => {
          this.translation = data.header;
          console.log(this.translation, 'translation');
        });
      });
    }
  }
  ngOnChange() {
    this.service.translateService.language.subscribe((res: any) => {
      this.service.translateService.getLang().subscribe((lang: any) => {
        this.selectedLanguage = lang;
        console.log('active lang pre login', lang);
      });
    });
  }

  isUserLoggedIn() {
    if (localStorage.getItem('isLoggedIn')) {
      //to do
    } else {
      this.matDialog.open(LoginComponent);
    }
  }
}
