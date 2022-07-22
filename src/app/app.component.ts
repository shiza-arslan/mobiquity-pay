import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UowService } from '@mobiquity/services';
import { Subject } from 'rxjs';
import { InactivityPopupComponent } from './shared/components/inactivity-popup/inactivity-popup.component';
import { getWebConfig } from '@mobiquity/webConfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedLanguage: any = 'en';
  textDir = 'ltr';
  userActvity: any;
  Config = getWebConfig();
  inactivitySpan = this.Config.screenSettings.inActivityPrams.inactivitySpan;
  inactivityPopupspan = this.Config.screenSettings.inActivityPrams.inactivityPopupspan;
  userInactive: Subject<any> = new Subject();
  keepAlive: boolean | undefined;
  // sessionStorage.getItem('isLoggedIn') != 'false' && sessionStorage.getItem('isLoggedIn') != null
  constructor(private Service: UowService, private matDialog: MatDialog) {}
  setTimeout() {
    this.userActvity = setTimeout(
      () => this.userInactive.next(undefined),
      this.inactivitySpan - this.inactivityPopupspan,
    );
  }

  @HostListener('window :mousemove') refreshUserState() {
    clearTimeout(this.userActvity);
    this.setTimeout();
  }

  ngOnInit() {
    if (sessionStorage.getItem('isLoggedIn') != 'false' && sessionStorage.getItem('isLoggedIn') != null) {
      this.setTimeout();
      this.userInactive.subscribe(() => {
        // sessionStorage.removeItem('access_token');

        const dialogRef = this.matDialog.open(InactivityPopupComponent, {});

        dialogRef.afterClosed().subscribe((result) => {
          this.keepAlive = result;
          console.log(this.keepAlive);
        });

        if (this.keepAlive) {
          console.log('alive');
          this.setTimeout();
        } else {
          console.log('die');
          setTimeout(() => {
            sessionStorage.removeItem('access_token');
          }, this.inactivityPopupspan);
        }
      });
    } else {
      sessionStorage.setItem('isLoggedIn', 'false');
    }

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
