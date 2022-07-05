import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../../pre-auth/components/login/login.component';
import { UowService } from '../../../../data-acsess/uow.service';

@Component({
  selector: 'mobiquity-pay-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  selectedLanguage: any = 'en';
  isLoggedIn: any = false;
  userData: any;
  BalanceInquiry: any;
  translation: any;
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

  constructor(private modalSerivce: NgbModal, private service: UowService) {}

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
  changeLanguage(lang: string) {
    this.service.translateService.setLang(lang);
    this.selectedLanguage = lang;
    localStorage.setItem('language', lang);
  }

  openModal() {
    const modalRef = this.modalSerivce.open(LoginComponent, { animation: false, backdrop: false });
  }
  logOut() {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
    this.userData = null;
    this.BalanceInquiry = null;
  }
}
