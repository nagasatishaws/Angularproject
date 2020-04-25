/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/

import {
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  PB_DIRECTION,
  POSITION,
  SPINNER
} from "./ngx-ui-loader";

import { AngularMaterialModule } from "./angular-material.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormModule } from "./forms/form.module";
import { HttpClientModule } from "@angular/common/http";
import { IntakeRoutingModule } from "./intake-components/intake-routing.module";
import { LayoutsModule } from "./project-layouts/layouts.module";
import { NgModule } from "@angular/core";
import { ToastrModule } from "ngx-toastr";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#00ACC1",
  bgsOpacity: 0,
  bgsPosition: "bottom-right",
  bgsSize: 60,
  bgsType: "three-strings",
  blur: 5,
  fgsColor: "#9370DB",
  fgsPosition: "center-center",
  fgsSize: 60,
  fgsType: "three-strings",
  gap: 18,
  logoPosition: "center-center",
  logoSize: 120,
  logoUrl: "",
  masterLoaderId: "master",
  overlayBorderRadius: "0",
  overlayColor: "rgba(40, 40, 40, 0.8)",
  pbColor: "#00ACC1",
  pbDirection: "ltr",
  pbThickness: 3,
  hasProgressBar: false,
  text: "Loading...",
  textColor: "#9370DB",
  textPosition: "center-center",
  threshold: 500
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IntakeRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormModule,
    AngularMaterialModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule, // import this module for showing loader automatically when navigating between app routes
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    }),
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 10000,
      closeButton: true,
      preventDuplicates: true
    }),
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
