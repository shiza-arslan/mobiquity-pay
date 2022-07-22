import { Component, HostListener } from '@angular/core';
import { UowService } from '@mobiquity/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedLanguage: any = 'en';
  textDir = 'ltr';
  userActvity: any;
  userInactive: Subject<any> = new Subject();

  constructor(private Service: UowService) {
    if (sessionStorage.getItem('isLoggedIn')){
      this.setTimeout();
      this.userInactive.subscribe(() => {
        sessionStorage.removeItem('access_token');
        alert('your access_token is remove from session');
      });
    }else{
      sessionStorage.setItem('isLoggedIn', 'false');
    }

  }
  setTimeout() {
    this.userActvity = setTimeout(() => this.userInactive.next(undefined), 6000);
  }

  @HostListener('window :mousemove') refreshUserState() {
    clearTimeout(this.userActvity);
    this.setTimeout();
  }

  ngOnInit() {
    this.selectedLanguage = sessionStorage.getItem('language');
    this.Service.translateService.getLang().subscribe((lang: any) => {
      this.selectedLanguage = lang;
      if (this.selectedLanguage === 'ar') {
        this.textDir = 'rtl';
      } else {
        this.textDir = 'ltr';
      }
    });
  }
}
