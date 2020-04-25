/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/


import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SigninComponent } from "./signin/signin.component";

import { FormRoutingModule } from "./form-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommoncomponentsModule } from "../common-components/commoncomponents.module";

import { LayoutsModule } from "../project-layouts/layouts.module";
import { AngularMaterialModule } from "../angular-material.module";

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    CommoncomponentsModule
  ]
})
export class FormModule {}
