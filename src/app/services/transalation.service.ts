import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  public language = new BehaviorSubject<string>('en');
  selectedLanguage: any;
  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('language')) {
      this.selectedLanguage = sessionStorage.getItem('language');
      document.querySelector('html')?.setAttribute('lang', this.selectedLanguage);
      this.language.next(this.selectedLanguage);
      this.get();
    }

    this.language.subscribe((res: any) => {
      // console.log('res', res);
      document.querySelector('html')?.setAttribute('lang', res);
      this.get();
    });
  }
  get() {
    return this.http.get(`assets/i18n/${this.language.value}.json`);
  }

  getLang() {
    return this.language.asObservable();
  }

  setLang(lang: string) {
    this.language.next(lang);
    this.get();
  }
}
