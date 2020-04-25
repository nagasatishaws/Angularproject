/**
* Author - Biplab
* Version - 1.0
* Create date - 25 sep 2019
*/


import { Component, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "@angular/material/dialog";

import { AddroleComponent } from "./addrole/addrole.component";
import { VariablesService } from "src/app/variables.service";
import { TokenService } from "src/app/services/token.service";
import { SuperAdminService } from "src/app/services/super-admin.service";
import { AlertService } from "src/app/services/alert.service";
import { DialogService } from "src/app/services/dialog.service";

@Component({
  selector: "app-rolemanagement",
  templateUrl: "./rolemanagement.component.html",
  styleUrls: ["./rolemanagement.component.scss"]
})
export class RolemanagementComponent implements OnInit {
  public create: boolean = false;
  public update: boolean = false;
  public appRoles: any = [];
  public modifyObject: any = {};
  roleIndex: any;
  clientIndx: any;
  //public write:boolean;
  constructor(
    public dialog: MatDialog,
    private variablesService: VariablesService,
    private tokenService: TokenService,
    private superAdminService: SuperAdminService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
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

    this.getRole();
  }

  setPermissions(data) {
    if (data) {
      data.roleData.forEach(element => {
        if (element.moduleName == "role_management") {
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

  addrole() {
    var modal = this.dialog.open(AddroleComponent, {
      height: "auto",
      width: "auto",
      disableClose: true,
      data: ""
    });

    modal.afterClosed().subscribe(result => {
      if (result == "cancel") {
        // console.log("closed--", result);
        this.getRole();
      }
    });
  }

  /**
   * get list of roles
   */
  getRole() {
    var data = {
      clientId: ""
    };
    this.superAdminService.getRole(data).subscribe((res: any) => {
      // console.log("role--", res);
      if (res.statusCode == 200) {
        this.appRoles = res.data;
        this.modifyObject = {};
      }

      //console.log(this.modulelist);
    });
  }

  editrole(index, rIndex) {
    var modal = this.dialog.open(AddroleComponent, {
      height: "auto",
      width: "auto",
      disableClose: true,
      data: { index: index, rIndex: rIndex }
    });

    modal.afterClosed().subscribe(result => {
      if (result == "cancel") {
        this.getRole();
        // console.log("closed--", result);
      }
    });
  }

  modifyAccess() {
    // console.log(this.modifyObject);
    if (!this.modifyObject.clientId) {
      this.alertService.warning("", "Nothing to modify");
      return false;
    }

    this.superAdminService.updateRole(this.modifyObject).subscribe(
      (res: any) => {
        if (res.statusCode === 200) {
          this.alertService.success("", res.message);
          this.permissions = [];
          this.getRole();
          //this.dialog.close("cancel");
        } else {
          this.alertService.error("", res.message);
          //this.dialog.close("cancel");
        }
      },
      err => {
        this.alertService.error("", err.error.message);
      }
    );
  }
  permissions = [];
  clickPermissions(
    clientId,
    roleName,
    roleId,
    roleDisplayName,
    perVal,
    permissions,
    roles,
    permissionIndex,
    clientIndex,
    roleIndex
  ) {
    // console.log(
    //   "Args perVal:: ",
    //   this.appRoles[clientIndex].roleList[roleIndex]["_id"]
    // );
    // console.log("Args roles:: ", roles);
    // console.log("Args Permission:: ", permissions);
    // console.log("Permission index:: ", permissionIndex);

    //this.permissions = [];

    this.modifyObject = {};

    let priVal = perVal.value ? 1 : 0;

    this.modifyObject["clientId"] = clientId;
    this.modifyObject["roleName"] = roleName;
    this.modifyObject["roleId"] = roleId;
    this.modifyObject["roleDisplayName"] = roleDisplayName;
    this.modifyObject["_id"] = this.appRoles[clientIndex].roleList[roleIndex][
      "_id"
    ];
    roles[permissionIndex].privilege[parseInt(perVal.key)] = priVal;
    // console.log("Privilege:: ", roles[permissionIndex]);

    // if (roles[permissionIndex].privilege[1] === 1) {
    if (this.permissions.length > 0) {
      this.permissions.forEach((permission, index) => {
        if (permission["moduleName"] === roles[permissionIndex].moduleName) {
          this.permissions[index].privilege = roles[permissionIndex].privilege;
        } else {
          this.permissions.push({
            moduleName: roles[permissionIndex].moduleName,
            privilege: roles[permissionIndex].privilege,
            moduleDisplayName: roles[permissionIndex].moduleDisplayName,
            redirectUrl: roles[permissionIndex].redirectUrl
          });
        }
      });
    } else {
      this.permissions.push({
        moduleName: roles[permissionIndex].moduleName,
        privilege: roles[permissionIndex].privilege,
        moduleDisplayName: roles[permissionIndex].moduleDisplayName,
        redirectUrl: roles[permissionIndex].redirectUrl
      });
    }

    // }
    // console.log(this.permissions);

    // const filteredArr = this.permissions.reduce((acc, current) => {
    //   const x = acc.find(item => item.moduleName === current.moduleName);
    //   if (!x) {
    //     return acc.concat([current]);
    //   } else {
    //     return acc;
    //   }
    // }, []);

    // this.modifyObject["permissions"] = filteredArr;
    this.modifyObject["permissions"] = roles;
    // console.log(filteredArr);

    // console.log(this.modifyObject);
  }
}
