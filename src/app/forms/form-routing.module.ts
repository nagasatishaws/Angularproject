/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/


import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { SigninComponent } from "./signin/signin.component";

import { MainLayoutComponent } from "../project-layouts/main-layout/main-layout.component";
const routes: Routes = [
  // { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },

  {
    path: "signin",
    component: SigninComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule {}
