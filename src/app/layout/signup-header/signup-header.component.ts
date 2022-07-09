import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../pages/login/login.component';
import { UowService } from '../../services/uow.service';
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
    if (localStorage.getItem('language')) {
      this.selectedLanguage = localStorage.getItem('language');
    }
  }

  openModal() {
    this.matDialog.open(LoginComponent);
  }
  changeLanguage(lang: string) {
    this.service.translateService.setLang(lang);
    this.selectedLanguage = lang;
    localStorage.setItem('language', lang);
  }
}
