/**
* Author - Lohit
* Version - 1.0
* Create date - 25 sep 2019
*/


import { Component, OnInit, ViewChild } from "@angular/core";

import { AdduserComponent } from "./adduser/adduser.component";
import { AlertService } from "src/app/services/alert.service";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { DialogService } from "src/app/services/dialog.service";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { SuperAdminService } from "src/app/services/super-admin.service";
import { TitleCasePipe } from "@angular/common";
import { TokenService } from "src/app/services/token.service";
import { VariablesService } from "src/app/variables.service";

@Component({
  selector: "app-usermanagement",
  templateUrl: "./usermanagement.component.html",
  styleUrls: ["./usermanagement.component.scss"]
})
export class UsermanagementComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  public nodata = {
    'emptyMessage': '',
  }

  rows = [];
  columns = [];
  active: boolean = true;
  inactive: boolean = false;
  public showInactive = false;

  public user_data: any;
  public create: boolean = false;
  public update: boolean = false;
  userItem$: Observable<any[]>;

  public titleCase = new TitleCasePipe();
  private exclude_list: Array<string> = [
    "_id",
    "client_id",
    "role_id",
    "updated_time",
    "updated_by",
    "last_login",
    "parent_id",
    "password"
  ];
  filteredItems: any[];
  //public write:boolean;
  constructor(
    public dialog: MatDialog,
    private variablesService: VariablesService,
    private tokenService: TokenService,
    private superAdminService: SuperAdminService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {

    this.nodata.emptyMessage = 'No Users Data'

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

    this.getUsers();
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

  adduser() {
    const addUserDialog = this.dialog.open(AdduserComponent, {
      width: "auto",
      height: "auto"
    });

    addUserDialog.afterClosed().subscribe(addUserResult => {
      // console.log("After add user dialog closed:: ", addUserResult);

      if (addUserResult !== undefined) {
        addUserResult.mobileNo = addUserResult.mobileNo.toString();
        //console.log()
        this.superAdminService.createUser(addUserResult).subscribe(
          result => {
            // console.log("After user create:: ", result);
            if (result.statusCode === 200) {
              this.alertService.success("", result.message);
              this.getUsers();
            } else {
              this.alertService.error("", result.message);
            }
          },
          err => {
            if (err.error.stacktrace && err.error.stacktrace.length > 0) {
              this.alertService.error(
                "",
                err.error.stacktrace[0].message.split(":")[0]
              );
            } else {
              this.alertService.error("", err.error.message);
            }
          }
        );
      }
    });
  }

  getUsers() {
    this.rows = [];
    let filter = {};
    // let filter = {
    //   status: this.showInactive === false ? "active" : "inactive"
    // }
    // console.log("Show inactive:: ", this.showInactive);

    if (this.showInactive) {
      filter["status"] = "inactive";
    } else {
      filter["status"] = "active";
    }
    // console.log("Filer object:: ", filter);

    this.superAdminService.getUser(filter).subscribe(user_list => {
      // console.log(user_list);
      // this.columns = [];
      // console.log(client_data['data']);
      this.rows = user_list["data"];
      this.assignCopy();
      // let keys_list = Object.keys(user_list["data"][0]);
      // console.log(keys_list);

      // keys_list.forEach(key => {
      //   if (!this.exclude_list.includes(key)) {
      //     // let keyTitleCase = this.titleCase.transform(key)
      //     let column = {
      //       name: this.titleCase.transform(key.replace("_", " ")),
      //       prop: key
      //     }
      //     this.columns.push(column);
      //   }
      // });
      // this.userItem$ = Observable.create(observer => {
      //   observer.next(this.rows);
      // });
    });
    // this.superAdminService.getUser()
  }

  onRowClick(event) {
    // console.log("Clicked:: ", event);
    if (event.type === "click" && event.column.prop === "firstName") {
      const updateUser = this.dialog.open(AdduserComponent, {
        width: "auto",
        height: "auto",
        data: event.row
      });

      updateUser.afterClosed().subscribe(result => {
        // console.log("After user update closed:: ", result);

        if (result !== undefined) {
          result.mobileNo = result.mobileNo.toString();
          this.superAdminService.updateUser(result).subscribe(
            updateResult => {
              // console.log("After update:: ", updateResult);

              if (updateResult.statusCode === 200) {
                this.getUsers();
                this.alertService.success("", updateResult.message);
              } else {
                this.alertService.error("", updateResult.message);
              }
            },
            err => {
              this.alertService.error("", err.error.message);
            }
          );
        }
      });
    }
  }

  toggle(index, event) {
    //console.log(this.filteredItems[index]);
    this.dialogService
      .openconfirmDialog(
        "Update Status",
        "Are you sure you want to update the status?"
      )
      .afterClosed()
      .subscribe((result: any) => {
        // console.log("Result:: ", result);

        if (result == "Submit") {
          var data = {
            userId: this.tokenService.getElement(
              this.filteredItems,
              index,
              "_id"
            ).userId,
            status:
              this.tokenService.getElement(this.filteredItems, index, "_id")
                .status === "active"
                ? "inactive"
                : "active"
          };
          this.superAdminService.modifyUser(data).subscribe(
            (res: any) => {
              if (res.statusCode === 200) {
                this.getUsers();
                this.alertService.success("", res.message);
              } else {
                this.alertService.error("", res.message);
                this.getUsers();
              }
            },
            err => {
              this.alertService.error("", err.error.message);
              this.getUsers();
            }
          );
        } else if (result === "Cancel") {
          // this.userItem$ = Observable.create(observer => {
          //   observer.next(this.rows);
          // });
          this.getUsers();
          return;
        }
      });
  }

  /**
   * assigning the source object
   */
  assignCopy() {
    this.filteredItems = Object.assign([], this.rows);
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
    this.filteredItems = Object.assign([], this.rows).filter(
      item => item.firstName.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }

  toggleActiveUsers(e) {
    // console.log("Flag:: ", e);
    this.getUsers();
  }
}
