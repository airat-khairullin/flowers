import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
// import Swiper core and required modules
import SwiperCore, {
  EffectFade,
  Keyboard,
  SwiperOptions,
  Controller,
  Mousewheel
} from 'swiper';

import {Breakpoints, LayoutObserver} from "../../../libs/shared/layout/src";


SwiperCore.use([Keyboard, Controller, Mousewheel, EffectFade]);

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public isDesktop: boolean = false;

  constructor(public layoutObserver: LayoutObserver) {
    this.subscriptions.add(
      this.layoutObserver.observe().subscribe((breakpoints: Breakpoints[]) => {
        this.isDesktop = breakpoints.includes(Breakpoints.mrMD);
      })
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
