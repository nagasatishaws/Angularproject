/**
* Author - Biplab
* Version - 1.0
* Create date - 25 sep 2019
*/


import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AddclientComponent } from "./clientmanagement/addclient/addclient.component";
import { AddlicenseComponent } from "./licensemanagement/addlicense/addlicense.component";
import { AddmailconfigurationComponent } from "./mailconfiguration/addmailconfiguration/addmailconfiguration.component";
import { AddmoduleComponent } from "./modulemanagement/addmodule/addmodule.component";
import { AddqueueComponent } from "./createqueue/addqueue/addqueue.component";
import { AddroleComponent } from "./rolemanagement/addrole/addrole.component";
import { AdduserComponent } from "./usermanagement/adduser/adduser.component";
import { AngularMaterialModule } from "./../angular-material.module";
import { AuthGuard } from "../services/auth.guard";
// import { BsDropdownModule } from "ngx-bootstrap/dropdown";

// import { BsDropdownModule } from 'ngx-bootstrap';

import { CasedetailsComponent } from "./reviewcase/casedetails/casedetails.component";
import { CasemanagementComponent } from "./casemanagement/casemanagement.component";
import { ClientmanagementComponent } from "./clientmanagement/clientmanagement.component";
import { CommonModule, DatePipe } from "@angular/common";
import { CreatecaseComponent } from "./createcase/createcase.component";
import { CreatequeueComponent } from "./createqueue/createqueue.component";
import { CreateteamComponent } from "./teammanagement/createteam/createteam.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ErrorInterceptor } from "../services/error.interceptor";
import { EventComponent } from "./reviewcase/casedetails/event/event.component";
import { FileUploadModule } from "ng2-file-upload";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LicensemanagementComponent } from "./licensemanagement/licensemanagement.component";
import { MailconfigurationComponent } from "./mailconfiguration/mailconfiguration.component";
import { ModulemanagementComponent } from "./modulemanagement/modulemanagement.component";
import { NarrativeComponent } from "./reviewcase/casedetails/narrative/narrative.component";
import { NgModule } from "@angular/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxEchartsModule } from "ngx-echarts";
import { PagenotfoundComponent } from "./../common-components/pagenotfound/pagenotfound.component";
import { PatientComponent } from "./reviewcase/casedetails/patient/patient.component";
import { ProductComponent } from "./reviewcase/casedetails/product/product.component";
import { ReviewcaseComponent } from "./reviewcase/reviewcase.component";
import { RolemanagementComponent } from "./rolemanagement/rolemanagement.component";
import { RouterModule } from "@angular/router";
import { StatusComponent } from "./modals/status/status.component";
import { TeammanagementComponent } from "./teammanagement/teammanagement.component";
import { UpdateclientComponent } from "./clientmanagement/updateclient/updateclient.component";
import { UsermanagementComponent } from "./usermanagement/usermanagement.component";
import { ViewdocComponent } from "./reviewcase/casedetails/viewdoc/viewdoc.component";
import { ViewemailComponent } from "./reviewcase/casedetails/viewemail/viewemail.component";

import { OrderModule } from 'ngx-order-pipe';
import { HomeComponent } from './home/home.component';
import { FullCalendarModule } from '@fullcalendar/angular';
//import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CraPiHomeComponent } from './cra-pi-home/cra-pi-home.component';
import { CaserulesComponent } from './caserules/caserules.component';
import { DuplicatecheckComponent } from './duplicatecheck/duplicatecheck.component';
import { AddcaserulesComponent } from './caserules/addcaserules/addcaserules.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { PocComponentComponent } from './poc-component/poc-component.component';
import { CasehistoryComponent } from './casehistory/casehistory.component';
import { LangTextSelectionComponent } from './common-utility-components/lang-text-selection/lang-text-selection.component';
import { CodeDictVersComponent } from './common-utility-components/code-dict-vers/code-dict-vers.component';
import { ContextMappingNameComponent } from './common-utility-components/context-mapping-name/context-mapping-name.component';
import { CreateItemGroupReferenceComponent } from './common-utility-components/create-item-group-reference/create-item-group-reference.component';
import { OidPdffilenamePresentationoidComponent } from './common-utility-components/oid-pdffilename-presentationoid/oid-pdffilename-presentationoid.component';
import { ActionMenuComponent } from './common-utility-components/action-menu/action-menu.component';
import { StudyConfigApidataResolverService } from './intake-resolvers/study-config-apidata-resolver.service';
import { ChartJsComponent } from './chart-js/chart-js.component';
import { ChartsModule } from 'ng2-charts-x';
import { PsurReportsComponent } from './psur-reports/psur-reports.component';
import { AnalyticsDashComponent } from './analytics-dash/analytics-dash.component';
import { AeSignalsComponent } from './ae-signals/ae-signals.component';
import { AeSigAletsComponent } from './ae-sig-alets/ae-sig-alets.component';
import { AeSigCasetrendsComponent } from './ae-sig-casetrends/ae-sig-casetrends.component';
import { AeSigActCatalogComponent } from './ae-sig-act-catalog/ae-sig-act-catalog.component';
import { AeSigNarrativesComponent } from './ae-sig-narratives/ae-sig-narratives.component';
import { ConcomitantDrugComponent } from './reviewcase/casedetails/concomitant-drug/concomitant-drug.component';
import { RelevantHistoryComponent } from './reviewcase/casedetails/relevant-history/relevant-history.component';
import { ManufacturerInfoComponent } from './reviewcase/casedetails/manufacturer-info/manufacturer-info.component';
import { StudyDetailsComponent } from './reviewcase/casedetails/study-details/study-details.component';
import { FileAttachmentsComponent } from './reviewcase/casedetails/file-attachments/file-attachments.component';
import { ReporterInfoComponent } from './reviewcase/casedetails/reporter-info/reporter-info.component';
import { PinfoLabDetailsComponent } from './reviewcase/casedetails/pinfo-lab-details/pinfo-lab-details.component';
import { PinfoRelevantTestsComponent } from './reviewcase/casedetails/pinfo-relevant-tests/pinfo-relevant-tests.component';
import { CaseProcessingComponent } from './reviewcase/casedetails/case-processing/case-processing.component';
import { MedicalReviewComponent } from './reviewcase/casedetails/medical-review/medical-review.component';
import { ProdDeviceDetailsComponent } from './reviewcase/casedetails/prod-device-details/prod-device-details.component';
import { RemarkComponent } from './remark/remark.component';
import { ActionHistoryComponent } from './action-history/action-history.component';
import { SeriousnessComponent } from './reviewcase/casedetails/seriousness/seriousness.component';
import { LineListingComponent } from './line-listing/line-listing.component';
import { NumericInput } from '../services/numericInput.directive';

@NgModule({
  declarations: [
    UsermanagementComponent,
    LicensemanagementComponent,
    ModulemanagementComponent,
    RolemanagementComponent,
    ClientmanagementComponent,
    AddlicenseComponent,
    AddmoduleComponent,
    AddclientComponent,
    UpdateclientComponent,
    AddroleComponent,
    AdduserComponent,
    StatusComponent,
    TeammanagementComponent,
    CreateteamComponent,
    PagenotfoundComponent,
    CreatequeueComponent,
    CreatecaseComponent,
    ReviewcaseComponent,
    CasedetailsComponent,
    CasemanagementComponent,
    AddqueueComponent,
    MailconfigurationComponent,
    AddmailconfigurationComponent,
    PagenotfoundComponent,
    PatientComponent,
    EventComponent,
    ProductComponent,
    NarrativeComponent,
    ViewdocComponent,
    ViewemailComponent,
    DashboardComponent,
    HomeComponent,
    CraPiHomeComponent,
    CaserulesComponent,
    DuplicatecheckComponent,
    AddcaserulesComponent,
    AnalyticsComponent,
    PocComponentComponent,
    CasehistoryComponent,
    LangTextSelectionComponent,
    CodeDictVersComponent,
    ContextMappingNameComponent,
    CreateItemGroupReferenceComponent,
    OidPdffilenamePresentationoidComponent,
    // StudyCodelistitemsFormComponent,
    ActionMenuComponent,
    ChartJsComponent,
    PsurReportsComponent,
    AnalyticsDashComponent,
    AeSignalsComponent,
    AeSigAletsComponent,
    AeSigCasetrendsComponent,
    AeSigActCatalogComponent,
    AeSigNarrativesComponent,
    ReporterInfoComponent,
    ConcomitantDrugComponent,
    RelevantHistoryComponent,
    ManufacturerInfoComponent,
    StudyDetailsComponent,
    FileAttachmentsComponent,
    PinfoLabDetailsComponent,
    PinfoRelevantTestsComponent,
    CaseProcessingComponent,
    MedicalReviewComponent,
    ProdDeviceDetailsComponent,
    RemarkComponent,
    ActionHistoryComponent,
    SeriousnessComponent,
    LineListingComponent,
    NumericInput
  ],
  imports: [
    // BsDropdownModule.forRoot(),
    CommonModule,
    AngularMaterialModule,
    NgxEchartsModule,
    NgxDatatableModule,
    FileUploadModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    OrderModule,
    FullCalendarModule,
    ChartsModule
    //Ng2SmartTableModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    StudyConfigApidataResolverService,
    DatePipe
  ],
  entryComponents: [
    AddlicenseComponent,
    AddmoduleComponent,
    AddroleComponent,
    AddclientComponent,
    AdduserComponent,
    AddqueueComponent,
    CreateteamComponent,
    AddmailconfigurationComponent,
    StatusComponent,
    UpdateclientComponent,
    AdduserComponent,
    StatusComponent,
    ViewdocComponent,
    ViewemailComponent,
    AddcaserulesComponent,
    PocComponentComponent,
    RemarkComponent,
    ActionHistoryComponent
  ]
})
export class IntakeModule { }
