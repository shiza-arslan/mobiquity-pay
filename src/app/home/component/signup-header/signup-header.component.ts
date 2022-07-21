import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../features/PreLogin/component/login/login.component';
import { UowService } from '@mobiquity/services';
@Component({
  selector: 'mobiquity-pay-signup-header',
  templateUrl: './signup-header.component.html',
  styleUrls: ['./signup-header.component.scss'],
})
export class SignupHeaderComponent implements OnInit {
  selectedLanguage: any = 'en';
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
  constructor(private matDialog: MatDialog, private service: UowService) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('language')) {
      this.selectedLanguage = sessionStorage.getItem('language');
    }
  }

  openModal() {
    this.matDialog.open(LoginComponent);
  }
  changeLanguage(lang: string) {
    this.service.translateService.setLang(lang);
    this.selectedLanguage = lang;
    sessionStorage.setItem('language', lang);
  }
}
