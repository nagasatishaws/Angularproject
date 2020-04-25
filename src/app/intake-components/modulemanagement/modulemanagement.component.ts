/**
* Author - Biplab
* Version - 1.0
* Create date - 14 september 19
*/


import { Component, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "@angular/material/dialog";

import { AddmoduleComponent } from "./addmodule/addmodule.component";
import { AlertService } from "src/app/services/alert.service";
import { DialogService } from "src/app/services/dialog.service";
import { SuperAdminService } from "../../services/super-admin.service";
import { TokenService } from "src/app/services/token.service";
import { VariablesService } from "src/app/variables.service";

@Component({
  selector: "app-modulemanagement",
  templateUrl: "./modulemanagement.component.html",
  styleUrls: ["./modulemanagement.component.scss"]
})
export class ModulemanagementComponent implements OnInit {
  public nodata = {
    'emptyMessage': ''
  };
  public create: boolean = false;
  public update: boolean = false;
  public modulelist: any = [];
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
    this.nodata.emptyMessage = 'No Modules to display'
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
    this.getModule(); //calling list modules
  }

  setPermissions(data) {
    if (data) {
      data.roleData.forEach(element => {
        if (element.moduleName === "module_management") {
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

  /**
   * for listing modules
   */
  getModule() {
    var data = {
      clientId: ""
    };
    this.superAdminService.getModule(data).subscribe((res: any) => {
      this.modulelist = [];
      // console.log("Module API result:: ", res);
      if (res.statusCode === 200) {
        this.modulelist = res.data;
        this.assignCopy();
      }
      //console.log(this.modulelist);
    });
  }

  addmodule() {
    var modal = this.dialog.open(AddmoduleComponent, {
      height: "auto",
      width: "auto",
      disableClose: true,
      data: ""
    });

    modal.afterClosed().subscribe(result => {
      if (result == "cancel") {
        this.getModule();
        // console.log("closed--", result);
      }
    });
  }

  editmodule(index) {
    var modal = this.dialog.open(AddmoduleComponent, {
      height: "auto",
      width: "auto",
      disableClose: true,
      data: this.tokenService.getElement(this.filteredItems, index, "_id")
    });

    modal.afterClosed().subscribe(result => {
      if (result == "cancel") {
        this.getModule();
        // console.log("closed--", result);
      }
    });
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
            moduleId: this.tokenService.getElement(
              this.filteredItems,
              index,
              "_id"
            ).moduleId,
            status:
              this.tokenService.getElement(this.filteredItems, index, "_id")
                .status === "active"
                ? "inactive"
                : "active"
          };
          this.superAdminService.modifyModule(data).subscribe(
            (res: any) => {
              if (res.statusCode === 200) {
                this.getModule();
                this.alertService.success("", res.message);
              } else {
                this.alertService.error("", res.message);
                this.getModule();
              }
            },
            err => {
              this.alertService.error("", err.error.message);
              this.getModule();
            }
          );
        } else {
          // this.modulelist = [];
          this.filteredItems = [];
          this.getModule();
          // this.assignCopy();
          return;
        }
      });
  }

  /**
   * assigning the source object
   */
  assignCopy() {
    this.filteredItems = Object.assign([], this.modulelist);
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
    this.filteredItems = Object.assign([], this.modulelist).filter(
      item =>
        item.moduleDisplayName.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }
}
