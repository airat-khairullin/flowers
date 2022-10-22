import {NgModule} from '@angular/core';
import {SwiperModule} from "swiper/angular";

import {MainPageComponent} from './main-page.component';
import {MainPageRoutingModule} from './main-page-routing.module';


@NgModule({
  declarations: [MainPageComponent],
  imports: [
    MainPageRoutingModule,
    SwiperModule
  ]
})
export class MainPageModule {
}
