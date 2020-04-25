/**
 * Author - Biplab
 * Version - 1.0
 * Create date - 25 sep 2019
 */

import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../services/auth.guard";
import { CasedetailsComponent } from "./reviewcase/casedetails/casedetails.component";
import { CasemanagementComponent } from "./casemanagement/casemanagement.component";
import { ClientmanagementComponent } from "./clientmanagement/clientmanagement.component";
import { CreatecaseComponent } from "./createcase/createcase.component";
import { CreatequeueComponent } from "./createqueue/createqueue.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EventComponent } from "./reviewcase/casedetails/event/event.component";
import { LicensemanagementComponent } from "./licensemanagement/licensemanagement.component";
import { MailconfigurationComponent } from "./mailconfiguration/mailconfiguration.component";
import { ModulemanagementComponent } from "./modulemanagement/modulemanagement.component";
import { NarrativeComponent } from "./reviewcase/casedetails/narrative/narrative.component";
import { NgModule } from "@angular/core";
import { PagenotfoundComponent } from "../common-components/pagenotfound/pagenotfound.component";
import { PatientComponent } from "./reviewcase/casedetails/patient/patient.component";
import { ProductComponent } from "./reviewcase/casedetails/product/product.component";
import { ReviewcaseComponent } from "./reviewcase/reviewcase.component";
import { RolemanagementComponent } from "./rolemanagement/rolemanagement.component";
import { TeammanagementComponent } from "./teammanagement/teammanagement.component";
import { UsermanagementComponent } from "./usermanagement/usermanagement.component";
import { HomeComponent } from "./home/home.component";
import { CaserulesComponent } from './caserules/caserules.component';
import { DuplicatecheckComponent } from './duplicatecheck/duplicatecheck.component';
import { CraPiHomeComponent } from './cra-pi-home/cra-pi-home.component';
import { AnalyticsComponent } from './analytics/analytics.component';

import { CasehistoryComponent } from './casehistory/casehistory.component';

// Route Resolvers
import { StudyConfigApidataResolverService } from './intake-resolvers/study-config-apidata-resolver.service';
import { PsurReportsComponent } from './psur-reports/psur-reports.component';
import { AnalyticsDashComponent } from './analytics-dash/analytics-dash.component';
import { AeSignalsComponent } from './ae-signals/ae-signals.component';
import { AeSigAletsComponent } from './ae-sig-alets/ae-sig-alets.component';
import { AeSigCasetrendsComponent } from './ae-sig-casetrends/ae-sig-casetrends.component';
import { AeSigActCatalogComponent } from './ae-sig-act-catalog/ae-sig-act-catalog.component';
import { AeSigNarrativesComponent } from './ae-sig-narratives/ae-sig-narratives.component';
import { RouteResolverService } from '../services/route-resolver.service';
import { LineListingComponent } from './line-listing/line-listing.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "licensemanagement",
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "home",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "licensemanagement",
    component: LicensemanagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "modulemanagement",
    component: ModulemanagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "rolemanagement",
    component: RolemanagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "usermanagement",
    component: UsermanagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "clientmanagement",
    component: ClientmanagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "teammanagement",
    component: TeammanagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "createqueue",
    component: CreatequeueComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "createcase",
    component: CreatecaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "reviewcase",
    component: ReviewcaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "casedetails/:id",
    component: CasedetailsComponent,
    resolve: { casedata: RouteResolverService },
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard]
  },
  {
    path: "casemanagement",
    component: CasemanagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "mailconfiguration",
    component: MailconfigurationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "cthome",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "cra-pi-home",
    component: CraPiHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "caserules",
    component: CaserulesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "duplicatecheck/:id",
    component: DuplicatecheckComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    component: AnalyticsDashComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "line-listing",
    component: LineListingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "analytics",
    component: AnalyticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "psur-reports",
    component: PsurReportsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "aesignals",
    component: AeSignalsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "alerts",
        component: AeSigAletsComponent
      },
      {
        path: "case-trends",
        component: AeSigCasetrendsComponent
      },
      {
        path: "action-catalogs",
        component: AeSigActCatalogComponent
      },
      {
        path: "narratives",
        component: AeSigNarrativesComponent
      }
    ]
  },
  {
    path: "pagenotfound",
    component: PagenotfoundComponent
  },
  { path: "**", redirectTo: "pagenotfound", pathMatch: "full" }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntakeRoutingModule { }
