import { Inject, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DOCUMENT } from '@angular/common';

import { LayoutModule, LayoutObserver } from '@sc/sdk/layout';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    LayoutModule
  ],
  providers: []
})
export class LayoutStoriesModule {
  constructor(
    private layoutObserver: LayoutObserver,
    @Inject(DOCUMENT) private document: any) {

    this.layoutObserver.injectTo(this.document.body).subscribe();
  }
}
