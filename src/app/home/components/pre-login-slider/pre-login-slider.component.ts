import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { NgxSpinnerService } from 'ngx-spinner';
import { UowService } from '@mobiquity/services';

@Component({
  selector: 'mobiquity-pay-pre-login-slider',
  templateUrl: './pre-login-slider.component.html',
  styleUrls: ['./pre-login-slider.component.scss'],
})
export class PreLoginSliderComponent implements OnInit {
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
  constructor(private service: UowService, private spinner: NgxSpinnerService) {}
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @ViewChild('slickModal2') slickModal2!: SlickCarouselComponent;
  ngOnInit(): void {
    this.language = 'en';
    this.service.translateService.language.subscribe((res: any) => {
      this.service.translateService.getLang().subscribe((lang: any) => {
        this.language = lang;
        console.log('active lang', lang);
      });
    });
    this.getPreLoginData();
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
}
