/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/


import { NgModule, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

import { ProjectSidebarComponent } from "./project-sidebar/project-sidebar.component";
import { ProjectHeaderComponent } from "./project-header/project-header.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { SharedPipesModule } from "../common-components/pipes/shared-pipes.module";
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component";
import { IntakeModule } from "../intake-components/intake.module";
const components = [
  MainLayoutComponent,
  ProjectHeaderComponent,
  ProjectSidebarComponent,
  AuthLayoutComponent
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    SharedPipesModule,
    PerfectScrollbarModule,
    IntakeModule
  ]
})
export class LayoutsModule {}
