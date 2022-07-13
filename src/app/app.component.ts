import { Component } from '@angular/core';
import { UowService } from '@mobiquity/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedLanguage: any = 'en';
  textDir = 'ltr';
  constructor(private Service: UowService) {}

  ngOnInit() {
    this.selectedLanguage = localStorage.getItem('language');
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
