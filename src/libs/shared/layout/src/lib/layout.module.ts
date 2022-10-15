import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointPipe } from './breakpoint.pipe';

@NgModule({
  declarations: [BreakpointPipe],
  exports: [
    BreakpointPipe
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule {
}
