import {NgModule} from '@angular/core';

import {HeaderComponent} from './header.component';
import {LogoModule} from "../logo/logo.module";


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    LogoModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
