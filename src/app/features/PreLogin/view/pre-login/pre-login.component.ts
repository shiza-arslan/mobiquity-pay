import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'mobiquity-pay-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.scss'],
})
export class PreLoginComponent implements OnInit {
  // language: any;

  // translation: any = [];
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('access_token')) {
      this.authService.generateBearer().subscribe((res: any) => {
        sessionStorage.setItem('access_token', res.access_token);
      });
    }
  }

  // this.language = 'en';
  // this.service.translateService.language.subscribe((res: any) => {
  //   this.service.translateService.getLang().subscribe((lang: any) => {
  //     this.language = lang;
  //     this.service.translateService.get().subscribe((data: any) => {
  //       this.translation = data.home;
  //     });
  //
  //   });
  // });
  // this.getPreLoginData();

  // ngOnChange() {
  //   this.service.translateService.language.subscribe((res: any) => {
  //     this.service.translateService.getLang().subscribe((lang: any) => {
  //       this.language = lang;

  //     });
  //   });
  // }
  afterChange(event: any) {
    // this.slickModal.initSlick();
    //this.slickModal.initialized = true;
    // this.slickModal2.initSlick();
  }
}
