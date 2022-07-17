import { Component, OnInit, ViewChild } from '@angular/core';
import { UowService } from '@mobiquity/services';

@Component({
  selector: 'mobiquity-pay-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.scss'],
})
export class PreLoginComponent implements OnInit {
  language: any;

  translation: any = [];
  constructor(private service: UowService) {}
  ngOnInit(): void {
    this.language = 'en';
    this.service.translateService.language.subscribe((res: any) => {
      this.service.translateService.getLang().subscribe((lang: any) => {
        this.language = lang;
        this.service.translateService.get().subscribe((data: any) => {
          this.translation = data.home;
        });

        console.log('active lang', lang);
      });
    });
    // this.getPreLoginData();
  }
  ngOnChange() {
    this.service.translateService.language.subscribe((res: any) => {
      this.service.translateService.getLang().subscribe((lang: any) => {
        this.language = lang;
        console.log('active lang pre login', lang);
      });
    });
  }
  afterChange(event: any) {
    // this.slickModal.initSlick();
    //this.slickModal.initialized = true;
    // this.slickModal2.initSlick();
  }
}
