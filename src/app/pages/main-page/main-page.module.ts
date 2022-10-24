import {NgModule} from '@angular/core';
import {SwiperModule} from "swiper/angular";
import {CommonModule} from "@angular/common";

import {MainPageComponent} from './main-page.component';
import {MainPageRoutingModule} from './main-page-routing.module';
import {HeroModule} from "./sections/hero/hero.module";


@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    SwiperModule,
    HeroModule
  ]
})
export class MainPageModule {
}
