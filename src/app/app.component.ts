/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/


import { Component } from "@angular/core";
import { NgxUiLoaderService } from "./ngx-ui-loader";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(public demoService: NgxUiLoaderService) {}
  title = "CaseIntake";
}
