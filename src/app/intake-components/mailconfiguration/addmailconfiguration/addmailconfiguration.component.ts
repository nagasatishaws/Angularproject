/**
 * Author - Lohit
 * Version - 1.0
 * Create date - 26 september 19
 */

import { MainLayoutComponent } from "./../../../project-layouts/main-layout/main-layout.component";
import { Component, OnInit, Optional, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { mail } from "./../../../intake-models/formmodel";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ModulemanagementComponent } from "../../modulemanagement/modulemanagement.component";
import { TokenService } from "src/app/services/token.service";
import { AlertService } from "src/app/services/alert.service";
import { SuperAdminService } from "src/app/services/super-admin.service";
import { CaseserviceService } from "src/app/services/caseservice.service";

@Component({
  selector: "app-addmailconfiguration",
  templateUrl: "./addmailconfiguration.component.html",
  styleUrls: ["./addmailconfiguration.component.scss"]
})
export class AddmailconfigurationComponent implements OnInit {
  public form: FormGroup;
  public sendflag: Boolean;
  public recieveflag: Boolean;
  public bothflag: Boolean;
  public timeflag: Boolean;
  public hourflag: Boolean;
  public maildata: mail = new mail();

  public hours = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23
  ];
  public minutes = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59
  ];

  servertype = [];
  public buttonFlag: boolean = true;

  public hoursplit: any;
  public minutesplit: any;

  constructor(
    private tokenService: TokenService,
    private alertService: AlertService,
    private caseserviceService: CaseserviceService,
    public dialog: MatDialogRef<ModulemanagementComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public getdata: any
  ) {
    this.form = new FormGroup({
      mailboxName: new FormControl("", [Validators.required]),
      accessType: new FormControl("", [Validators.required]),
      mailServerUserName: new FormControl("", [Validators.required]),
      mailServerPassword: new FormControl("", [Validators.required]),
      mailServerDomain: new FormControl("", [Validators.required]),
      mailServerProtocol: new FormControl("", [Validators.required]),
      sendPort: new FormControl(),
      readPort: new FormControl(),
      interval: new FormControl(),
      recurrence: new FormControl(),
      hour: new FormControl(),
      minute: new FormControl(),
      time: new FormControl()
    });
    // console.log("GETdata :: ", this.getdata);

    if (this.getdata) {
      this.maildata.mailboxName = this.getdata.mailboxName;
      this.maildata.accessType = this.getdata.accessType;
      this.maildata.mailServerProtocol = this.getdata.mailServerProtocol;
      this.maildata.mailServerUserName = this.getdata.mailServerUserName;
      this.maildata.mailServerPassword = this.getdata.mailServerPassword;
      this.maildata.mailServerDomain = this.getdata.mailServerDomain;
      this.maildata.sendPort = this.getdata.sendPort
        ? this.getdata.sendPort
        : "";
      this.maildata.readPort = this.getdata.readPort
        ? this.getdata.readPort
        : "";
      (this.maildata.interval = this.getdata.interval
        ? this.getdata.interval
        : ""),
        (this.maildata.recurrence = this.getdata.recurrence
          ? this.getdata.recurrence
          : ""),
        (this.maildata.hour = this.getdata.hour ? this.getdata.hour : ""),
        (this.maildata.minute = this.getdata.minute ? this.getdata.minute : ""),
        (this.maildata.time = this.getdata.time ? this.getdata.time : ""),
        this.maildata;

      this.buttonFlag = false;

      this.changeAccess();
    } else {
      this.buttonFlag = true;
    }
  }

  ngOnInit() { }

  onFormSubmit() {
    // console.log(this.maildata);

    // console.log("spliting the time", this.maildata.time);

    // console.log("splitted time = ", splittime);

    // console.log("spliting the time ------------", splittime[0]);

    if (this.maildata.interval == "false") {
      let splittime = this.maildata.time.split(":");
      this.maildata.hour = splittime[0];
      this.maildata.minute = splittime[1];
    }

    this.caseserviceService.createMail(this.maildata).subscribe(
      (res: any) => {
        if (res.statusCode === 200) {
          this.alertService.success("", res.message);
          this.dialog.close("cancel");
        } else {
          this.alertService.error("", res.message);
          this.dialog.close("cancel");
        }
      },
      err => {
        this.alertService.error("", err.error.message);
      }
    );
  }

  onFormUpdate() {
    this.maildata["mailServerId"] = this.getdata.mailServerId;
    this.caseserviceService.updateMail(this.maildata).subscribe(
      (res: any) => {
        if (res.statusCode === 200) {
          this.alertService.success("", res.message);
          this.dialog.close("cancel");
        } else {
          this.alertService.error("", res.message);
          this.dialog.close("cancel");
        }
      },
      err => {
        this.alertService.error("", err.error.message);
      }
    );
  }

  send() {
    this.sendflag = true;
    this.recieveflag = false;
    this.bothflag = false;
  }
  recieve() {
    this.sendflag = false;
    this.recieveflag = true;
    this.bothflag = false;
  }
  both() {
    this.sendflag = false;
    this.recieveflag = false;
    this.bothflag = true;
  }

  changeAccess() {
    // console.log(this.maildata);
    if (this.maildata.accessType == "send") {
      this.sendflag = true;
      this.recieveflag = false;
      this.bothflag = true;
    } else if (this.maildata.accessType == "read") {
      this.sendflag = false;
      this.recieveflag = true;
      this.bothflag = true;
    } else if (this.maildata.accessType == "send/read") {
      this.sendflag = true;
      this.recieveflag = true;
      this.bothflag = true;
    } else {
      return;
    }
  }

  intervalchange() {
    // console.log(this.maildata);
    if (this.maildata.interval == "true") {
      this.hourflag = true;
      this.timeflag = false;
    } else if (this.maildata.interval == "false") {
      this.timeflag = true;
      this.hourflag = false;
    } else {
      return;
    }
  }
}
