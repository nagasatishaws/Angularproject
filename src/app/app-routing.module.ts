/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/

import { RouterModule, Routes } from "@angular/router";

import { AuthLayoutComponent } from "./project-layouts/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./project-layouts/main-layout/main-layout.component";
import { NgModule } from "@angular/core";
import { SigninComponent } from "./forms/signin/signin.component";
import { UsermanagementComponent } from "./intake-components/usermanagement/usermanagement.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/auth/signin", pathMatch: "full" },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "auth",
        loadChildren: "./forms/form.module#FormModule"
      }
    ]
  },
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "mainlayout",
        loadChildren: "./intake-components/intake.module#IntakeModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
