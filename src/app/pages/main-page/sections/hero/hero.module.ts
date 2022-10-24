import {NgModule} from '@angular/core';

import {HeroComponent} from './hero.component';
import {Fake3dModule} from "../../../../shared/fake3d/fake3d.module";


@NgModule({
  declarations: [
    HeroComponent
  ],
  imports: [
    Fake3dModule
  ],
  exports: [
    HeroComponent
  ]
})
export class HeroModule {
}
