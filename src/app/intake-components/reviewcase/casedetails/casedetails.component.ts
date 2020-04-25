/**
 * Author - Lohit
 * Version - 1.1
 * Create date - 19 oct 2019
 */

import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, OnChanges } from "@angular/core";

import { MatDialog } from "@angular/material";
import { ViewdocComponent } from "./viewdoc/viewdoc.component";
import { ViewemailComponent } from "./viewemail/viewemail.component";
import { AlertService } from "src/app/services/alert.service";
import { CaseserviceService } from "src/app/services/caseservice.service";
import { TokenService } from "src/app/services/token.service";
import { Observable } from "rxjs";
import { DialogService } from "src/app/services/dialog.service";
import { VariablesService } from "src/app/variables.service";
import * as FileSaver from "file-saver";
import { CommonDataService } from 'src/app/services/common-data.service';
import { RouteResolverService } from 'src/app/services/route-resolver.service';
import { RemarkComponent } from '../../remark/remark.component';
import { DatePipe } from '@angular/common';
import { ActionHistoryComponent } from '../../action-history/action-history.component';

@Component({
  selector: "app-casedetails",
  templateUrl: "./casedetails.component.html",
  styleUrls: ["./casedetails.component.scss"]
})
export class CasedetailsComponent implements OnInit {
  public patientBasicInfoFlag: boolean;
  public patientLabReportFlag: boolean;
  public patientRelevantTestFlag: boolean;
  public eventflag: boolean;
  public productflag: boolean;
  public narrativeflag: boolean;
  public casehistoryflag: boolean;

  public reporterInfoFlag: boolean;
  public manuInfoFlag: boolean;
  public concomDrugFlag: boolean;
  public relevantHistoryFlag: boolean;
  public studyDetailsFlag: boolean;
  public caseProcessingFlag: boolean;
  public causalityAssessmentFlag: boolean;
  public suspectDeviceFlag: boolean;
  public seriousnessFlag: boolean;

  public routepath: any;
  public caseId: any;
  public stepper = 1;

  rows = [
    { entity: "on", value: "on", action: "green" },
    { entity: "on", value: "on", action: "red" },
    { entity: "on", value: "on", action: "green" }
  ];

  columns = [{ prop: "entity" }, { prop: "value" }, { prop: "action" }];
  //public assignFlag = false;

  assignFlag$: Observable<boolean>;
  showActionFlag: boolean = false;
  disableAssignFlag: boolean = true;

  // API response of viewCase, individaul case IDs complete data
  viewCase: any = {};

  public nerData: any = {};
  public nerFlag: boolean = false;
  public create: boolean = false;
  public update: boolean = false;

  public nerMappedData: any;
  public caseTypeIn: boolean = false;

  public actionMenu: any;

  public priority: any = "";
  public deadline: number;
  public deadlineUnits: string = "days";
  public eventDescription: any = "";
  public cacheFiles: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private caseserviceService: CaseserviceService,
    private alertService: AlertService,
    private tokenService: TokenService,
    private dialogService: DialogService,
    private variablesService: VariablesService,
    private commonDataService: CommonDataService,
    private resolver: RouteResolverService,
    private datePipe: DatePipe
  ) {
    this.studyDetailsFlag = true;
    this.commonDataService.setRoleActionMatrix();
    this.commonDataService.setActionMenu();
    this.actionMenu = this.commonDataService.getActionMenu();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // console.log("\n\n\nCase Details resolver: ", params);
      this.routepath = params;
      this.caseId = this.routepath.id;
    });
    this.route.data.subscribe(data => {
      // console.log("\n\n\nCase Details resolver data: ", data);
      this.getCase(data.casedata);
    });
  }

  setPermissions(data) {
    if (data) {
      data.roleData.forEach(element => {
        if (element.moduleName === "review_case") {
          if (element.privilege[0] === 1) {
            this.create = true;
          }

          if (element.privilege[2] === 1) {
            this.update = true;
          }
        }
      });
    }
  }

  assignToMe() {
    this.caseserviceService
      .assignCaseToUser({ caseId: [this.routepath.id] })
      .subscribe(
        (res: any) => {
          if (res.statusCode === "200" || res.statusCode === 200) {
            this.alertService.success("", res.message);
            this.disableAssignFlag = true;
            this.router.navigate(['/mainlayout/casedetails/', this.caseId]);
            // this.assignFlag$ = Observable.create(observer => {
            //   observer.next(true);
            // });
          } else {
            this.alertService.error("", res.message);
            this.disableAssignFlag = false;
          }
        },
        err => {
          this.alertService.error("", err.error.message);
          this.disableAssignFlag = false;
        }
      );
  }

  getCase(routeData) {
    // console.log(routeData);
    this.nerFlag = true;
    if (this.caseId && this.caseId !== "unk") {
      this.caseTypeIn = false;

      if (routeData.statusCode === 200 || routeData.statusCode === "200") {
        this.viewCase = routeData.data;
        // this.nerMappedData = Object.assign({}, this.viewCase.nerMappedData);

        if (this.viewCase.finalCaseData && this.viewCase.finalCaseData !== "" && Object.keys(this.viewCase.finalCaseData).length > 0) {
          this.nerData = this.viewCase.finalCaseData;
          this.nerData.header.reportSource = "ClinicalTrials";
        } else {
          this.nerData = this.viewCase.nerMappedData;
          this.nerData.header.reportSource = "ClinicalTrials";
        }

        // if (routeData.data.assignedToUser["userId"]) {
        if (routeData.data.assignedToUser.userId) {
          // this.assignFlag$ = Observable.create(observer => {
          //   observer.next(true);
          // });
          this.disableAssignFlag = true;
          // console.log("this.tokenService.getToken() : ", this.tokenService.getToken());

          if (routeData.data.assignedToUser.userId === this.tokenService.getToken()['userData']['userId']) {
            this.showActionFlag = true;
          } else {
            this.showActionFlag = false;
          }
        } else {
          this.disableAssignFlag = false;
          // this.assignFlag$ = Observable.create(observer => {
          //   observer.next(false);
          // });
          this.showActionFlag = false;
        }
        // }
      } else {
        // console.log("This happened");

        this.router.navigate(["/mainlayout/reviewcase"]);
      }
    } else {
      this.caseTypeIn = true;
      this.nerData = routeData;
      this.nerData.header.reportSource = "ClinicalTrials";
      this.nerData.header.reportType = "INITIAL";
    }
  }

  rejectCase() {
    this.dialogService
      .openconfirmDialog("DisableSource", "Are you sure you want to reject?")
      .afterClosed()
      .subscribe((result: any) => {
        if (result == "Submit") {
          let data = {
            caseId: this.routepath.id
          };
          this.caseserviceService.rejectCase(data).subscribe(
            (res: any) => {
              if (res.statusCode === "200" || res.statusCode === 200) {
                this.alertService.success("", res.message);
                // this.getcaseList();
              } else {
                this.alertService.error("", res.message);
              }
            },
            err => {
              this.alertService.error("", err.error.message);
            }
          );
        } else {
          return;
        }
      });
  }

  createCaseTypeIn() {
    let formData = new FormData();
    formData.append('priority', this.priority);
    formData.append('deadline', (this.deadline) ? this.deadline.toLocaleString() : "");
    formData.append('deadlineUnits', this.deadlineUnits);
    formData.append('eventDescription', this.eventDescription);
    formData.append('mappedObj', JSON.stringify(this.nerData));

    let fileType = {};
    if (this.cacheFiles && this.cacheFiles.length > 0) {
      for (let file of this.cacheFiles) {
        fileType[file._file.name] = file._file.fileType || "";
        formData.append('file', file._file, file._file['name']);
      }
    }

    formData.append('fileType', JSON.stringify(fileType));

    this.caseserviceService.createCaseTypeIn(formData).subscribe((resp: any) => {
      // console.log("Case Type-In API resp: ", resp);
      if (resp.statusCode === "200" || resp.statusCode === 200) {
        this.alertService.success("", resp.message.message || "Case created successfully");
        this.priority = "";
        this.deadline = 0;
        // this.deadlineUnits = "";
        this.eventDescription = "";
        this.router.navigate(['/mainlayout/createcase']);
      }
    }, e => {
      this.alertService.error("", e.error.message || "Error while creating case");
    });
  }

  // test() {
  //   this.router.navigate(['/mainlayout/casedetails/', this.caseId]);
  // }

  save() {
    // console.log("Case details save data:: ", this.nerData);
    this.viewCase['finalCaseData'] = JSON.parse(JSON.stringify(this.nerData));
    let formData = new FormData();
    formData.append('mappedObj', JSON.stringify(this.viewCase));

    let fileType = {};
    if (this.cacheFiles && this.cacheFiles.length > 0) {
      for (let file of this.cacheFiles) {
        fileType[file._file.name] = file._file.fileType || "";
        formData.append('file', file._file, file._file['name']);
      }
    }

    formData.append('fileType', JSON.stringify(fileType));

    this.caseserviceService.updateCase(formData).subscribe((resp: any) => {
      if (resp.statusCode === "200" || resp.statusCode === 200) {
        this.alertService.success("", resp.message);
        this.router.navigate(['/mainlayout/casedetails/', this.caseId]);
        this.cacheFiles = null;
      } else {
        this.alertService.error("", resp.message);
      }
    },
      err => {
        this.alertService.error("", err.error.message);

      });
  }

  approveCase() {
    this.dialogService
      .openconfirmDialog("DisableSource", "Are you sure you want to approved?")
      .afterClosed()
      .subscribe((result: any) => {
        if (result == "Submit") {
          let data = {
            caseId: this.viewCase.caseId,
            // drugName: this.viewCase.drugName,
            // severity: this.viewCase.severity,
            mailReferenceId: this.viewCase.mailReferenceId,
            inputText: this.viewCase.caseId,
            inputDocumentRef: this.viewCase.inputDocumentRef,
            dateRecived: this.viewCase.dateRecived,
            nerResponse: this.viewCase.nerResponse,
            finalNer: this.nerData,
            nerMappedData: this.viewCase.nerMappedData,
            status: "approved"
          };
          this.caseserviceService.updateCase(data).subscribe(
            (res: any) => {
              if (res.statusCode === "200" || res.statusCode === 200) {
                this.alertService.success("", res.message);
                this.assignFlag$ = Observable.create(observer => {
                  observer.next(true);
                });
                // this.getcaseList();
              } else {
                this.alertService.error("", res.message);
              }
            },
            err => {
              this.alertService.error("", err.error.message);
            }
          );
        } else {
          return;
        }
      });
  }

  viewdoc(createCaseFlag: boolean) {
    this.dialog.open(ViewdocComponent, {
      height: "auto",
      minWidth: "700px",
      width: 'auto',
      disableClose: true,
      data: {
        showActionFlag: this.showActionFlag,
        createCaseFlag: createCaseFlag,
        mainFiles: (this.viewCase.finalCaseData && this.viewCase.finalCaseData.fileAttachments)
          ? [...this.viewCase.finalCaseData.fileAttachments, ...this.viewCase.additionalFiles]
          : (this.viewCase.nerMappedData && this.viewCase.nerMappedData.fileAttachments)
            ? [...this.viewCase.nerMappedData.fileAttachments, ...this.viewCase.additionalFiles]
            : [],
        cacheFiles: (this.cacheFiles && this.cacheFiles.length > 0) ? this.cacheFiles : []
      }
    }).afterClosed().subscribe(resp => {
      if (resp && resp.length > 0) {
        this.cacheFiles = resp;
        if (!this.caseTypeIn) {
          this.save();
        }
      }
    });
  }

  viewmail() {
    this.dialog.open(ViewemailComponent, {
      height: "auto",
      width: "500px",
      disableClose: true,
      data: {
        subject: this.viewCase.mailSubject,
        body: this.viewCase.inputext,
        sender: this.viewCase.mailSender,
        receiver: this.viewCase.mailReceiver
      }
    });
  }

  patientBasicInfo() {
    this.patientBasicInfoFlag = true;
    this.patientLabReportFlag = false;
    this.patientRelevantTestFlag = false;
    this.eventflag = false;
    this.productflag = false;
    this.narrativeflag = false;
    this.casehistoryflag = false;
    this.reporterInfoFlag = false;
    this.manuInfoFlag = false;
    this.concomDrugFlag = false;
    this.relevantHistoryFlag = false;
    this.studyDetailsFlag = false;
    this.caseProcessingFlag = false;
    this.causalityAssessmentFlag = false;
    this.suspectDeviceFlag = false;
    this.seriousnessFlag = false;
  }

  patientLabReports() {
    this.patientBasicInfoFlag = false;
    this.patientLabReportFlag = true;
    this.patientRelevantTestFlag = false;
    this.eventflag = false;
    this.productflag = false;
    this.narrativeflag = false;
    this.casehistoryflag = false;
    this.reporterInfoFlag = false;
    this.manuInfoFlag = false;
    this.concomDrugFlag = false;
    this.relevantHistoryFlag = false;
    this.studyDetailsFlag = false;
    this.caseProcessingFlag = false;
    this.causalityAssessmentFlag = false;
    this.suspectDeviceFlag = false;
    this.seriousnessFlag = false;
  }

  patientRelevantTests() {
    this.patientBasicInfoFlag = false;
    this.patientLabReportFlag = false;
    this.patientRelevantTestFlag = true;
    this.eventflag = false;
    this.productflag = false;
    this.narrativeflag = false;
    this.casehistoryflag = false;
    this.reporterInfoFlag = false;
    this.manuInfoFlag = false;
    this.concomDrugFlag = false;
    this.relevantHistoryFlag = false;
    this.studyDetailsFlag = false;
    this.caseProcessingFlag = false;
    this.causalityAssessmentFlag = false;
    this.suspectDeviceFlag = false;
    this.seriousnessFlag = false;
  }

  event() {
    this.patientBasicInfoFlag = false;
    this.patientLabReportFlag = false;
    this.patientRelevantTestFlag = false;
    this.eventflag = true;
    this.productflag = false;
    this.narrativeflag = false;
    this.casehistoryflag = false;
    this.reporterInfoFlag = false;
    this.manuInfoFlag = false;
    this.concomDrugFlag = false;
    this.relevantHistoryFlag = false;
    this.studyDetailsFlag = false;
    this.caseProcessingFlag = false;
    this.causalityAssessmentFlag = false;
    this.suspectDeviceFlag = false;
    this.seriousnessFlag = false;
  }

  product() {
    this.patientBasicInfoFlag = false;
    this.patientLabReportFlag = false;
    this.patientRelevantTestFlag = false;
    this.eventflag = false;
    this.productflag = true;
    this.narrativeflag = false;
    this.casehistoryflag = false;
    this.reporterInfoFlag = false;
    this.manuInfoFlag = false;
    this.concomDrugFlag = false;
    this.relevantHistoryFlag = false;
    this.studyDetailsFlag = false;
    this.caseProcessingFlag = false;
    this.causalityAssessmentFlag = false;
    this.suspectDeviceFlag = false;
    this.seriousnessFlag = false;
  }

  narrative() {
    this.patientBasicInfoFlag = false;
    this.patientLabReportFlag = false;
    this.patientRelevantTestFlag = false;
    this.eventflag = false;
    this.productflag = false;
    this.narrativeflag = true;
    this.casehistoryflag = false;
    this.reporterInfoFlag = false;
    this.manuInfoFlag = false;
    this.concomDrugFlag = false;
    this.relevantHistoryFlag = false;
    this.studyDetailsFlag = false;
    this.caseProcessingFlag = false;
    this.causalityAssessmentFlag = false;
    this.suspectDeviceFlag = false;
    this.seriousnessFlag = false;
  }

  caseHistory() {
    this.patientBasicInfoFlag = false;
    this.patientLabReportFlag = false;
    this.patientRelevantTestFlag = false;
    this.eventflag = false;
    this.productflag = false;
    this.narrativeflag = false;
    this.casehistoryflag = true;
    this.reporterInfoFlag = false;
    this.manuInfoFlag = false;
    this.concomDrugFlag = false;
    this.relevantHistoryFlag = false;
    this.studyDetailsFlag = false;
    this.caseProcessingFlag = false;
    this.causalityAssessmentFlag = false;
    this.suspectDeviceFlag = false;
    this.seriousnessFlag = false;
  }

  reporterInfo() {
    this.patientBasicInfoFlag = false;
    this.patientLabReportFlag = false;
    this.patientRelevantTestFlag = false;
    this.eventflag = false;
    this.productflag = false;
    this.narrativeflag = false;
    this.casehistoryflag = false;
    this.reporterInfoFlag = true;
    this.manuInfoFlag = false;
    this.concomDrugFlag = false;
    this.relevantHistoryFlag = false;
    this.studyDetailsFlag = false;
    this.caseProcessingFlag = false;
    this.causalityAssessmentFlag = false;
    this.suspectDeviceFlag = false;
    this.seriousnessFlag = false;
  }

  manufacturerInfo() {
    this.patientBasicInfoFlag = false;
    this.patientLabReportFlag = false;
    this.patientRelevantTestFlag = false;
    this.eventflag = false;
    this.productflag = false;
    this.narrativeflag = false;
    this.casehistoryflag = false;
    this.reporterInfoFlag = false;
    this.manuInfoFlag = true;
    this.concomDrugFlag = false;
    this.relevantHistoryFlag = false;
    this.studyDetailsFlag = false;
    this.caseProcessingFlag = false;
    this.causalityAssessmentFlag = false;
    this.suspectDeviceFlag = false;
    this.seriousnessFlag = false;
  }

  concomitantMedication() {
    this.patientBasicInfoFlag = false;
    this.patientLabReportFlag = false;
    this.patientRelevantTestFlag = false;
    this.eventflag = false;
    this.productflag = false;
    this.narrativeflag = false;
    this.casehistoryflag = false;
    this.reporterInfoFlag = false;
    this.manuInfoFlag = false;
    this.concomDrugFlag = true;
    this.relevantHistoryFlag = false;
    this.studyDetailsFlag = false;
    this.caseProcessingFlag = false;
    this.causalityAssessmentFlag = false;
    this.suspectDeviceFlag = false;
    this.seriousnessFlag = false;
  }

  relevantHistory() {
    this.patientBasicInfoFlag = false;
    this.patientLabReportFlag = false;
    this.patientRelevantTestFlag = false;
    this.eventflag = false;
    this.productflag = false;
    this.narrativeflag = false;
    this.casehistoryflag = false;
    this.reporterInfoFlag = false;
    this.manuInfoFlag = false;
    this.concomDrugFlag = false;
    this.relevantHistoryFlag = true;
    this.studyDetailsFlag = false;
    this.caseProcessingFlag = false;
    this.causalityAssessmentFlag = false;
    this.suspectDeviceFlag = false;
    this.seriousnessFlag = false;
  }

  studyDetails() {
    this.patientBasicInfoFlag = false;
    this.patientLabReportFlag = false;
    this.patientRelevantTestFlag = false;
    this.eventflag = false;
    this.productflag = false;
    this.narrativeflag = false;
    this.casehistoryflag = false;
    this.reporterInfoFlag = false;
    this.manuInfoFlag = false;
    this.concomDrugFlag = false;
    this.relevantHistoryFlag = false;
    this.studyDetailsFlag = true;
    this.caseProcessingFlag = false;
    this.causalityAssessmentFlag = false;
    this.suspectDeviceFlag = false;
    this.seriousnessFlag = false;
  }

  caseProcessing() {
    this.patientBasicInfoFlag = false;
    this.patientLabReportFlag = false;
    this.patientRelevantTestFlag = false;
    this.eventflag = false;
    this.productflag = false;
    this.narrativeflag = false;
    this.casehistoryflag = false;
    this.reporterInfoFlag = false;
    this.manuInfoFlag = false;
    this.concomDrugFlag = false;
    this.relevantHistoryFlag = false;
    this.studyDetailsFlag = false;
    this.caseProcessingFlag = true;
    this.causalityAssessmentFlag = false;
    this.suspectDeviceFlag = false;
    this.seriousnessFlag = false;
  }

  causalityAssessment() {
    this.patientBasicInfoFlag = false;
    this.patientLabReportFlag = false;
    this.patientRelevantTestFlag = false;
    this.eventflag = false;
    this.productflag = false;
    this.narrativeflag = false;
    this.casehistoryflag = false;
    this.reporterInfoFlag = false;
    this.manuInfoFlag = false;
    this.concomDrugFlag = false;
    this.relevantHistoryFlag = false;
    this.studyDetailsFlag = false;
    this.caseProcessingFlag = false;
    this.causalityAssessmentFlag = true;
    this.suspectDeviceFlag = false;
    this.seriousnessFlag = false;
  }

  suspectDevice() {
    this.patientBasicInfoFlag = false;
    this.patientLabReportFlag = false;
    this.patientRelevantTestFlag = false;
    this.eventflag = false;
    this.productflag = false;
    this.narrativeflag = false;
    this.casehistoryflag = false;
    this.reporterInfoFlag = false;
    this.manuInfoFlag = false;
    this.concomDrugFlag = false;
    this.relevantHistoryFlag = false;
    this.studyDetailsFlag = false;
    this.caseProcessingFlag = false;
    this.causalityAssessmentFlag = false;
    this.suspectDeviceFlag = true;
    this.seriousnessFlag = false;
  }

  seriousness() {
    this.patientBasicInfoFlag = false;
    this.patientLabReportFlag = false;
    this.patientRelevantTestFlag = false;
    this.eventflag = false;
    this.productflag = false;
    this.narrativeflag = false;
    this.casehistoryflag = false;
    this.reporterInfoFlag = false;
    this.manuInfoFlag = false;
    this.concomDrugFlag = false;
    this.relevantHistoryFlag = false;
    this.studyDetailsFlag = false;
    this.caseProcessingFlag = false;
    this.causalityAssessmentFlag = false;
    this.suspectDeviceFlag = false;
    this.seriousnessFlag = true;
  }

  /**
   *
   * @param arg based on the arg the apis will get called,
   *
   * this is the api for exporting and sending mail
   */
  export(arg) {
    var data = {
      caseId: this.routepath.id
    };
    // console.log("EXPORT DATA::: ", this.nerData);
    if (arg == "csv") {
      // let data = [];

      // for (let key in this.nerData) {
      //   for (let keys in this.nerData[key]) {
      //     if (keys === "caseId") {
      //       data.push({
      //         TAB: key,
      //         FIELD: this.caseserviceService.csvLabels[keys],
      //         VALUE: this.routepath.id
      //       });
      //     } else {
      //       data.push({
      //         TAB: key,
      //         FIELD: this.caseserviceService.csvLabels[keys],
      //         VALUE: this.nerData[key][keys].toString()
      //       });
      //     }
      //   }
      // }

      // this.tokenService.exportAsExcelFile(
      //   data,
      //   "report_" + this.viewCase.caseId
      // );
      this.caseserviceService.exportCaseAsCsv({ caseId: this.caseId }).subscribe(
        (resp: any) => {
          let blob = new Blob([resp], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          });
          var a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "Case-" + this.routepath.id + ".xlsx";
          a.click();
        },
        err => {
          this.alertService.error("", err.error.message || "Error while exporting as CSV.");
        }
      );
    } else if (arg == "mail") {
      this.caseserviceService.CaseEmail(data).subscribe(
        (res: any) => {
          if (res.statusCode === "200" || res.statusCode === 200) {
            this.alertService.success("", res.message);
          } else {
            this.alertService.error("", res.message);
          }
        },
        err => {
          this.alertService.error("", err.error.message);
        }
      );
    } else if (arg == "xml") {
      this.caseserviceService.CaseE2b(data).subscribe(
        (res: any) => {
          if (res.statusCode === "200" || res.statusCode === 200) {
            this.alertService.success("", res.message);
          } else {
            this.alertService.error("", res.message);
          }
        },
        err => {
          this.alertService.error("", err.error.message);
        }
      );
    }
  }

  downloadAuditReport() {
    let data1 = {
      caseId: this.routepath.id
    };

    this.caseserviceService.downloadNERAudits(data1).subscribe(
      data => {
        let blob = new Blob([data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "CaseReport-" + this.routepath.id + ".xlsx";
        a.click();
      },
      err => {
        this.alertService.error("", err.error.message || "Case ID not found or Case not Signed Off");
      }
    );
  }

  selectActionContent(event) {
    // console.log("Action menu handler: ", event);
    if (event['content'] && event['content']['value'] === "duplicate") {
      this.caseserviceService.listAllCases({ caseId: this.caseId }).subscribe((resp: any) => {
        if (resp.statusCode === "200") {
          this.dialog.open(RemarkComponent, {
            data: {
              statusTitle: "Remarks",
              statusText: "Please enter the reason for the action.",
              showSubmit: true,
              submitText: "Submit",
              showCancel: true,
              cancelText: "Cancel",
              remark: "",
              originalCaseId: "",
              originalCaseIdNeeded: true,
              caseList: resp['data'] || []
            },
            width: "500px",
            height: "auto",
            disableClose: true
          }).afterClosed().subscribe(resp => {
            // console.log(resp);
            if (resp !== undefined) {
              let actionData = {
                action: event['content']['value'] || "",
                caseId: this.caseId || "",
                remark: resp['remark'] || "",
                originalCaseId: (resp['originalCaseIdNeeded']) ? resp['originalCaseId'] : ""
              }
              this.caseserviceService.caseAction(actionData).subscribe((caseResp: any) => {
                // console.log("Action response: ", caseResp);
                if (caseResp.statusCode === 200 || caseResp.statusCode === "200") {
                  this.alertService.success("", caseResp.message);
                  // this.router.navigate(['/mainlayout/casedetails/', this.caseId]);
                  this.router.navigate(['/mainlayout/reviewcase']);
                } else {
                  this.alertService.error("", "Error while updating case status.");
                }
              });
            }
          });
        }
      });
    }

    if (event['content'] && event['content']['value'] === "followup") {
      this.caseserviceService.listAllCases({ caseId: this.caseId }).subscribe((resp: any) => {
        if (resp.statusCode === "200") {
          this.dialog.open(RemarkComponent, {
            data: {
              statusTitle: "Remarks",
              statusText: "Please enter the reason for the action.",
              showSubmit: true,
              submitText: "Submit",
              showCancel: true,
              cancelText: "Cancel",
              remark: "",
              originalCaseId: "",
              originalCaseIdNeeded: true,
              caseList: resp['data'] || []
            },
            width: "500px",
            height: "auto",
            disableClose: true
          }).afterClosed().subscribe(resp => {
            // console.log(resp);
            if (resp !== undefined) {
              let actionData = {
                action: event['content']['value'] || "",
                currentCaseId: this.caseId || "",
                remark: resp['remark'] || "",
                parentCaseId: (resp['originalCaseIdNeeded']) ? resp['originalCaseId'] : ""
              }
              this.caseserviceService.caseFollowUpAction(actionData).subscribe((caseResp: any) => {
                // console.log("Action response: ", caseResp);
                if (caseResp.statusCode === 200 || caseResp.statusCode === "200") {
                  this.alertService.success("", caseResp.message);
                  this.router.navigate(['/mainlayout/reviewcase']);
                } else {
                  this.alertService.error("", "Error while marking case as followup.");
                }
              }, e => {
                this.alertService.error("", e.error.message || "Error while marking case as followup.");
              });
            }
          });
        }
      });
    }

    if (event['content'] && (event['content']['value'] === "subforqr"
      || event['content']['value'] === "subformr" || event['content']['value'] === "rettoqr"
      || event['content']['value'] === "rettode" || event['content']['value'] === "archive"
      || event['content']['value'] === "delete" || event['content']['value'] === "closed"
      || event['content']['value'] === "rettomr")) {
      this.dialog.open(RemarkComponent, {
        data: {
          statusTitle: "Remarks",
          statusText: "Please enter the reason for the action.",
          showSubmit: true,
          submitText: "Submit",
          showCancel: true,
          cancelText: "Cancel",
          remark: "",
          originalCaseId: "",
          originalCaseIdNeeded: false
        },
        width: "500px",
        height: "auto",
        disableClose: true
      }).afterClosed().subscribe(resp => {
        // console.log(resp);
        if (resp !== undefined) {
          let actionData = {
            action: event['content']['value'] || "",
            caseId: this.caseId || "",
            remark: resp['remark'] || ""
          }
          this.caseserviceService.caseAction(actionData).subscribe((caseResp: any) => {
            // console.log("Action response: ", caseResp);
            if (caseResp.statusCode === 200 || caseResp.statusCode === "200") {
              this.alertService.success("", caseResp.message);
              // this.router.navigate(['/mainlayout/casedetails/', this.caseId]);
              this.router.navigate(['/mainlayout/reviewcase']);
            } else {
              this.alertService.error("", "Error while updating case status.");
            }
          }, e => {
            this.alertService.error("", e.error.message || "Error while updating case status.");
          });
        }
      });
    }

    if (event['content'] && event['content']['value'] === "audit_trail") {
      this.downloadAuditReport();
    }

    if (event['content'] && event['content']['value'] === "action_history") {
      this.dialog.open(ActionHistoryComponent, {
        data: {
          statusTitle: "Action History",
          statusText: "",
          showSubmit: false,
          submitText: "",
          showCancel: true,
          cancelText: "Cancel",
          statusHistory: this.viewCase.statusHistory || []
        },
        minWidth: "500px",
        width: 'auto',
        // minHeight: '500px',
        height: "auto",
        disableClose: true
      });
    }
  }

  formatDateToString(date) {
    if (date) {
      let formatedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      return formatedDate;
    }
  }

  formateStringToDate(date, firstLevel, secondLevel) {
    if (new Date(date)) {
      (firstLevel) ? (secondLevel) ? this.nerData[firstLevel][secondLevel] = new Date(date).toISOString() : "" : ""
    }
  }
}
