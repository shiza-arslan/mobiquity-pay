import { Component, Input, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { UowService } from '@mobiquity/services';
import { getWebConfig } from '@mobiquity/webConfig';
@Component({
  selector: 'mobiquity-pay-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  currentRoute: string = '';
  activatedRoute: any;
  showSignupHeader: boolean | undefined;
  showLogoHeader: boolean | undefined;
  showWelcomeHeader: boolean | undefined;
  showFooter: boolean | undefined;
  showNavigation: boolean | undefined;
  isTokenRefresh: boolean = false;
  tokenExpiryTime: number | undefined;
  refreshTokenTime: number | undefined;
  config = getWebConfig();
  constructor(private router: Router, private services: UowService) {
    this.getCurrentRoute();
  }
  async getCurrentRoute() {
    return await new Promise<void>((resolve, reject) => {
      this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((x: any) => {
        this.currentRoute = x.url;
        if (this.currentRoute == '/') {
          this.showSignupHeader = false;
          this.showLogoHeader = true;
          this.showWelcomeHeader = true;
          this.showNavigation = true;
          this.showFooter = true;
        } else if (this.currentRoute == '/signup') {
          this.showSignupHeader = true;
          this.showLogoHeader = false;
          this.showWelcomeHeader = false;
          this.showNavigation = false;
          this.showFooter = false;
        } else if (this.currentRoute == '/access-denied') {
          this.showSignupHeader = false;
          this.showLogoHeader = false;
          this.showWelcomeHeader = false;
          this.showNavigation = false;
          this.showFooter = false;
        }
      });
    });
  }
  ngOnInit(): void {
    this.services.authService.getJWTBearerToken().then(() => {
      this.tokenExpiryTime = Number(sessionStorage.getItem('token_expiry_time'));
      this.refreshTokenTime = this.tokenExpiryTime - this.config.screenSettings.AuthConfig.refreshTokenBrforeExpiry;
      sessionStorage.setItem('isTokenRefresh', this.isTokenRefresh == false ? 'false' : 'true');
      setTimeout(() => {
        this.isTokenRefresh = true;
        this.services.authService.getJWTBearerToken();
      }, this.refreshTokenTime * 1000);
    });
  }
  ngOnChange() {}
}
