import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

// import Swiper core and required modules
import SwiperCore, {
  EffectFade,
  Keyboard,
  SwiperOptions,
  Controller,
  Mousewheel
} from 'swiper';


SwiperCore.use([Keyboard, Controller, Mousewheel, EffectFade]);

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  public config: SwiperOptions = {
    keyboard: true,
    mousewheel: true,
    direction: 'vertical',
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
  };
}
