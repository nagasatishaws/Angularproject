/**
* Author - Lohit
* Version - 1.0
* Create date - 25 sep 2019
*/


import { Component, OnInit, Optional, Inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import { Role } from "../../../intake-models/formmodel";
import { TokenService } from "src/app/services/token.service";
import { AlertService } from "src/app/services/alert.service";
import { SuperAdminService } from "src/app/services/super-admin.service";
import { RolemanagementComponent } from "../rolemanagement.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import * as _ from "lodash";

@Component({
  selector: "app-addrole",
  templateUrl: "./addrole.component.html",
  styleUrls: ["./addrole.component.scss"]
})
export class AddroleComponent implements OnInit {
  public form: FormGroup;
  public roledata: Role = new Role();
  clientlist: any = [];
  modulelist: any = [];
  getdata: any = [];
  public buttonFlag: boolean = true;
  isSuperAdmin: boolean = false;
  public nameerr: any;
  public diserr: any;

  constructor(
    private tokenService: TokenService,
    private alertService: AlertService,
    private superAdminService: SuperAdminService,
    public dialog: MatDialogRef<RolemanagementComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({
      roleName: new FormControl("", [Validators.required, Validators.maxLength(32)]),
      roleDisplayName: new FormControl("", [Validators.required, Validators.maxLength(32)]),
      clientId: new FormControl("", [Validators.required]),
      moduleName: new FormControl("", [Validators.required])
    });

    let user_details = this.tokenService.getToken()["userData"];

    if (this.data) {
      var obj = {
        clientId: ""
      };
      this.superAdminService.getRole(obj).subscribe((res: any) => {
        // console.log("role--", res);
        if (res.statusCode == 200) {
          this.getdata = res.data[this.data.index].roleList[this.data.rIndex];
          this.roledata.roleName = this.getdata.roleName;
          this.roledata.roleDisplayName = this.getdata.roleDisplayName;
          this.roledata.clientId = this.getdata.clientId;
          this.buttonFlag = false;

          this.getClient();
          this.superAdminService
            .getLicense({ clientId: this.getdata.clientId })
            .subscribe(module_list => {
              if (module_list.statusCode === 200) {
                this.modulelist = module_list["data"][0]["modules"];
                this.roledata["moduleName"] = [];
                this.getdata["permissions"].forEach(modulename => {
                  this.roledata.moduleName.push(modulename.moduleName);
                });
              }
            });

          if (user_details && user_details["clientId"]) {
            this.isSuperAdmin = false;
            this.setModulesList(user_details["clientId"]);

          } else {

            this.isSuperAdmin = true;
          }
        }

        //console.log(this.modulelist);
      });
    } else {
      if (user_details && user_details["clientId"]) {
        this.isSuperAdmin = false;
        this.getClient();
        this.setModulesList(user_details["clientId"]);
        this.roledata.clientId = user_details["clientId"];
      } else {
        this.getClient();
        this.isSuperAdmin = true;
      }
    }

    // console.log(this.roledata);
    //this.form.reset();
  }

  ngOnInit() {
    this.form.controls.roleName.valueChanges.subscribe((data: any) => {

      if (data) {
        this.nameerr = data.length;
      }

    })

    this.form.controls.roleDisplayName.valueChanges.subscribe((data: any) => {
      if (data) {
        this.diserr = data.length;
      }
    })

  }

  onFormSubmit() {
    var permissions = [];

    this.roledata.moduleName.forEach(element => {
      this.modulelist.forEach(moduleObject => {
        if (moduleObject.moduleName === element) {
          permissions.push({
            moduleName: moduleObject.moduleName,
            moduleDisplayName: moduleObject.moduleDisplayName,
            redirectUrl: moduleObject.redirectUrl,
            privilege: [0, 1, 0, 0]
          });
        }
      });
    });
    this.roledata["permissions"] = permissions;
    // console.log(this.roledata);
    this.superAdminService.createRole(this.roledata).subscribe(
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
    let permissions = [];
    let oldPermissionsList = Object.assign([], this.getdata.permissions);

    this.roledata.moduleName.forEach(moduleName => {
      let findPermissionIndex = _.findIndex(oldPermissionsList, { moduleName: moduleName });
      // console.log("Permission index:: ", findPermissionIndex);
      if (findPermissionIndex !== -1) {
        permissions.push(this.getdata.permissions[findPermissionIndex]);
      } else {
        this.modulelist.forEach(modules => {
          if (moduleName === modules.moduleName) {
            permissions.push({
              moduleName: modules.moduleName,
              moduleDisplayName: modules.moduleDisplayName,
              redirectUrl: modules.redirectUrl,
              privilege: [0, 1, 0, 0]
            });
          }
        });
      }
    });

    this.roledata["permissions"] = permissions;
    this.roledata["roleId"] = this.getdata["roleId"];

    // console.log("Final role data:: ", this.roledata);

    this.superAdminService.updateRole(this.roledata).subscribe(
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


  /*
  onFormUpdate() {
    var permissions = [];
    // console.log("Get data:: ", this.getdata);
    // console.log("Role data:: ", this.roledata);

    // this.roledata['permissions'] = [];
    this.roledata.moduleName.forEach(element => {
      this.getdata.permissions.forEach(moduleObject => {
        if (moduleObject.moduleName === element) {
          permissions.push(moduleObject);
        } else {
          this.modulelist.forEach(modules => {
            if (element === modules.moduleName) {
              permissions.push({
                moduleName: modules.moduleName,
                moduleDisplayName: modules.moduleDisplayName,
                redirectUrl: modules.redirectUrl,
                privilege: [0, 1, 0, 0]
              });
            }
          });
        }
      });
    });

    // this.getdata.moduleName.forEach(getDataModule => {
    //   this.roledata.moduleName.forEach(element => {
    //     if (getDataModule.moduleName === element.moduleName) {
    //       permissions = this.getdata.permissions;
    //     } else {
    //       // this.modulelist.forEach(moduleObject => {
    //       //   this.roledata.moduleName.forEach(element => {
    //       //     if (moduleObject.moduleName === element.moduleName) {
    //       //       permissions.push({
    //       //         moduleName: element.moduleName,
    //       //         moduleDisplayName: element.moduleDisplayName,
    //       //         redirectUrl: element.redirectUrl,
    //       //         privilege: [0, 1, 0, 0]
    //       //       });
    //       //     }
    //       //   });
    //       // });
    //       permissions.push({
    //         moduleName: element.moduleName,
    //         moduleDisplayName: element.moduleDisplayName,
    //         redirectUrl: element.redirectUrl,
    //         privilege: [0, 1, 0, 0]
    //       });
    //     }
    //   });
    // });

    this.roledata["permissions"] = permissions;
    this.roledata["roleId"] = this.getdata["roleId"];
    // console.log("Final role update:: ", this.roledata);

    this.superAdminService.updateRole(this.roledata).subscribe(
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

  */

  /**
   * for listing clients
   */

  getClient() {
    var data = {};
    this.superAdminService.getClient(data).subscribe((res: any) => {
      this.clientlist = [];
      //console.log(res);
      if (res.statusCode === 200) {
        this.clientlist = res.data;
      }
      //console.log(this.clientlist);
    });
  }

  errorMessage(field) {
    return this.tokenService.errorMessageForMaxLength(this.form, field);
  }

  setModulesList(clientId) {
    this.superAdminService.getLicense({ clientId: clientId }).subscribe(
      result => {
        // console.log("Module data:: ", result["data"]);
        if (result.statusCode === 200) {
          this.modulelist = result["data"][0]["modules"];
        }
      },
      err => {
        this.alertService.error("", "Module not found");
      }
    );
  }
}
