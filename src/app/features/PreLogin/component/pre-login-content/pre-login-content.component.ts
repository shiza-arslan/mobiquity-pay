import { Component, OnInit } from '@angular/core';
import { UowService } from '@mobiquity/services';
@Component({
  selector: 'mobiquity-pay-pre-login-content',
  templateUrl: './pre-login-content.component.html',
  styleUrls: ['./pre-login-content.component.scss'],
})
export class PreLoginContentComponent implements OnInit {
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

        console.log('active lang content', lang);
      });
    });
  }
}
