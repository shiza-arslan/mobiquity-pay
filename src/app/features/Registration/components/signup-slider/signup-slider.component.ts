import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-slider',
  templateUrl: './signup-slider.component.html',
  styleUrls: ['./signup-slider.component.scss'],
})
export class SignupSliderComponent implements OnInit {
  slider = [
    {
      body: 'Automate your bill pay and get 30% cashback',
      button: 'Pay now',
    },
    {
      body: 'Automate your bill pay and get 30% cashback',
      button: 'Pay now',
    },
  ];
  slideConfig = {
    items: 2,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    arrows: false,
    infinite: true,
  };
  constructor() {}

  ngOnInit(): void {}
}
