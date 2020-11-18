import { Component, OnInit, Input } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-services-carousel',
  templateUrl: './services-carousel.component.html',
  styleUrls: ['./services-carousel.component.scss']
})
export class ServicesCarouselComponent implements OnInit {
  @Input('backgroundGray') public backgroundGray;
  public carouselOptions: NguCarouselConfig;
  public services = [{
    icon: 'dashboard',
    text: `We make the tedious calculations while you consentrate on marketing`,
    title: 'Easy Work Flow'
  }, {
    icon: 'perm_data_setting',
    text: `All transactions are sealed with an SMS notification`,
    title: 'SMS Notifications'
  }, {
    icon: 'storage',
    text: `Real time data are used to inspire you to making smart decisions`,
    title: 'Real Time Analytics'
  }, {
    icon: 'stay_primary_portrait',
    text: `A self intuitive interface software.`,
    title: 'User Friendly Interface'
  }]
  
  constructor() { }

  ngOnInit() {
    this.carouselOptions = {
      grid: { xs: 1, sm: 2, md: 3, lg: 3, all: 0 },
      slide: 2,
      speed: 400,
      interval: {timing: 4000},
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true
    }
  }

}
