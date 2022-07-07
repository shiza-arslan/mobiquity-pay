import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../../pre-auth/components/login/login.component';
import { UowService } from '../../../../data-acsess/uow.service';
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
  constructor(private modalSerivce: NgbModal, private service: UowService) {}

  ngOnInit(): void {
    if (localStorage.getItem('language')) {
      this.selectedLanguage = localStorage.getItem('language');
    }
  }

  openModal() {
    const modalRef = this.modalSerivce.open(LoginComponent, { animation: false, backdrop: false });
  }
  changeLanguage(lang: string) {
    this.service.translateService.setLang(lang);
    this.selectedLanguage = lang;
    localStorage.setItem('language', lang);
  }
}
