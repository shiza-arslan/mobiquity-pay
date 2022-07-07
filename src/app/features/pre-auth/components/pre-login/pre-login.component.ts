import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { UowService } from '../../../../data-acsess/uow.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginComponent } from '../login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'mobiquity-pay-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.scss'],
})
export class PreLoginComponent implements OnInit {
  language: any;
  preLoginData: any;
  first_slider: any;
  second_slider: any;
  slideConfig = {
    items: 4,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    arrows: false,
    infinite: true,
  };

  translation: any;
  constructor(private service: UowService, private spinner: NgxSpinnerService, private modalSerivce: NgbModal) {}
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @ViewChild('slickModal2') slickModal2!: SlickCarouselComponent;
  ngOnInit(): void {
    this.language = 'en';
    this.spinner.show();
    if (localStorage.getItem('language')) {
      this.language = localStorage.getItem('language');
    }
    this.service.translateService.language.subscribe((res: any) => {
      this.service.translateService.getLang().subscribe((lang: any) => {
        this.language = lang;
        this.service.translateService.get().subscribe((data: any) => {
          this.translation = data.home;
        });
        this.spinner.show();
        console.log('active lang', lang);
        this.getPreLoginData();
      });
    });
    // this.getPreLoginData();
  }
  ngOnChange() {
    this.service.translateService.language.subscribe((res: any) => {
      this.service.translateService.getLang().subscribe((lang: any) => {
        this.language = lang;
        console.log('active lang pre login', lang);
        this.spinner.show();
        this.getPreLoginData();
      });
    });
  }
  getPreLoginData() {
    this.first_slider = [];
    // this.slickModal.slides = [];
    this.second_slider = [];
    this.service.preLoginService.getPreLoginData(this.language).subscribe((data: any) => {
      this.preLoginData = data;

      this.first_slider = this.preLoginData.bannersfirst.en;
      this.second_slider = this.preLoginData.bannerssecond.en;
      console.log(this.first_slider);
      console.log(this.second_slider);
      // this.slickModal.unslick();
      // this.slickModal2.unslick();

      this.spinner.hide();
    });
  }
  afterChange(event: any) {
    // this.slickModal.initSlick();
    //this.slickModal.initialized = true;
    // this.slickModal2.initSlick();
  }
  isUserLoggedIn() {
    if (localStorage.getItem('isLoggedIn')) {
      //to do
    } else {
      const modalRef = this.modalSerivce.open(LoginComponent);
    }
  }
}
