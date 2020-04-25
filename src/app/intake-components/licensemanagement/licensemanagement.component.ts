/**
* Author - Lohit
* Version - 1.0
* Create date - 26 september 19
*/

import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "@angular/material/dialog";

import { AddlicenseComponent } from "./addlicense/addlicense.component";
import { AlertService } from "src/app/services/alert.service";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { DialogService } from "src/app/services/dialog.service";
import { SuperAdminService } from "src/app/services/super-admin.service";
import { TokenService } from "src/app/services/token.service";
import { VariablesService } from "src/app/variables.service";

@Component({
  selector: "app-licensemanagement",
  templateUrl: "./licensemanagement.component.html",
  styleUrls: ["./licensemanagement.component.scss"]
})
export class LicensemanagementComponent implements OnInit {
  nodata = { 'emptyMessage': '' };
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  public create: boolean = false;
  public update: boolean = false;
  licenselist: any = [];
  filteredItems: any = [];
  //public write:boolean;
  constructor(
    public dialog: MatDialog,
    private variablesService: VariablesService,
    private tokenService: TokenService,
    private superAdminService: SuperAdminService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
    this.nodata.emptyMessage = 'No License to display'
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

    this.getLicense();
  }

  setPermissions(data) {
    if (data) {
      data.roleData.forEach(element => {
        if (element.moduleName == "license_management") {
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

  ngOnInit() { }

  addlicense(): void {
    var modal = this.dialog.open(AddlicenseComponent, {
      height: "auto",
      width: "auto",
      disableClose: true,
      data: ""
    });

    modal.afterClosed().subscribe(result => {
      if (result == "cancel") {
        this.getLicense();
        // console.log("closed--", result);
      }
    });
  }

  /**
   * for listing modules
   */
  getLicense() {
    var data = {};
    this.superAdminService.getLicense(data).subscribe((res: any) => {
      this.licenselist = [];
      // console.log(res);
      if (res.statusCode === "200" || res.statusCode === 200) {
        this.licenselist = res.data;
        this.assignCopy();
      }
      //console.log(this.modulelist);
    });
  }

  /**
   * assigning the source object
   */
  assignCopy() {
    this.filteredItems = Object.assign([], this.licenselist);
  }

  /**
   *
   * @param event
   * search function
   */

  filterItem(event) {
    let value = event.target.value;
    if (!value) {
      this.assignCopy();
    } // when nothing has typed
    this.filteredItems = Object.assign([], this.licenselist).filter(
      item =>
        item.moduleDisplayName.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }

  formatToDate(date) {
    if (date) date = new Date(date.split("T")[0]);
    return date;
  }

  toggle(index) {
    //console.log(this.filteredItems[index]);
    this.dialogService
      .openconfirmDialog(
        "Update Status",
        "Are you sure you want to update the status?"
      )
      .afterClosed()
      .subscribe((result: any) => {
        if (result == "Submit") {
          var data = {
            licenseId: this.filteredItems[index].licenseId,
            status: this.filteredItems[index].status === "active" ? "inactive" : "active"
          };
          this.superAdminService.modifyLicense(data).subscribe(
            (res: any) => {
              if (res.statusCode === 200) {
                this.getLicense();
                this.alertService.success("", res.message);
              } else {
                this.alertService.error("", res.message);
                this.getLicense();
              }
            },
            err => {
              this.alertService.error("", err.error.message);
              this.getLicense();
            }
          );
        } else {
          this.licenselist = [];
          this.getLicense();
          return;
        }
      });
  }
}
