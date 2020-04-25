/**
* Author - Trinadh
* Version - 1.0
* Create date - 26 september 19
*/

import { Component, OnInit } from "@angular/core";

import { AddmailconfigurationComponent } from "./addmailconfiguration/addmailconfiguration.component";
import { AlertService } from "src/app/services/alert.service";
import { CaseserviceService } from "src/app/services/caseservice.service";
import { DialogService } from "src/app/services/dialog.service";
import { MatDialog } from "@angular/material";
import { SuperAdminService } from "src/app/services/super-admin.service";
import { TokenService } from "src/app/services/token.service";
import { VariablesService } from "src/app/variables.service";

@Component({
  selector: "app-mailconfiguration",
  templateUrl: "./mailconfiguration.component.html",
  styleUrls: ["./mailconfiguration.component.scss"]
})
export class MailconfigurationComponent implements OnInit {
  mailconfig: any;
  public nodata = {
    'emptyMessage': ''
  };
  updateflag: Boolean;
  configureflag: Boolean;

  public create: boolean = false;
  public update: boolean = false;
  public maillist: any = [];
  filteredItems: any = [];
  //public write:boolean;
  constructor(
    public dialog: MatDialog,
    private variablesService: VariablesService,
    private tokenService: TokenService,
    private superAdminService: SuperAdminService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private caseserviceService: CaseserviceService
  ) {
    this.nodata.emptyMessage = 'No Mail Server Data';
    this.variablesService.loginData.subscribe((res: any) => {
      // console.log("sidebar----", res);
      //this.defaultMenu = [];
      if (res) {
        this.setPermissions(res);
      } else {
        let data = this.tokenService.getToken();
        //console.log("data---", data);
        this.setPermissions(data);
      }
    });
    this.getMail(); //calling list modules
  }

  ngOnInit() { }

  setPermissions(data) {
    if (data) {
      data.roleData.forEach(element => {
        if (element.moduleName === "mail_management") {
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

  /**
   * for listing mails
   */
  getMail() {
    // this.maillist = [];
    let data = {
      clientId: ""
    };
    this.caseserviceService.listMail(data).subscribe((res: any) => {
      // console.log("Module API result:: ", res);
      if (res.statusCode === 200) {
        this.maillist = Object.assign([], res.data);
      }
      // console.log(this.maillist);
    });
  }

  addmail() {
    let modal = this.dialog.open(AddmailconfigurationComponent, {
      height: "auto",
      width: "500px",
      disableClose: true,
      data: ""
    });

    modal.afterClosed().subscribe(result => {
      if (result == "cancel") {
        this.getMail();
        // console.log("closed--", result);
      }
    });
  }

  editmail(index) {
    // console.log("jkghkjdahsgfydsgifg", this.maillist[index]);

    let modal = this.dialog.open(AddmailconfigurationComponent, {
      height: "auto",
      width: "500px",
      disableClose: true,
      data: this.maillist[index]
    });

    modal.afterClosed().subscribe(result => {
      if (result == "cancel") {
        // this.maillist = [];
        this.getMail();
        // console.log("closed--", result);
      }
    });
  }
}
