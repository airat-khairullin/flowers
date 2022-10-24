import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {MainLayoutRoutingModule} from "./main-layout-routing.module";
import {MainLayoutComponent} from "./main-layout.component";
import {HeaderModule} from "../../shared/header/header.module";


@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule,
    MainLayoutRoutingModule,
  ]
})
export class MainLayoutModule {
}
