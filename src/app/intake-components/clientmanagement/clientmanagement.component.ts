/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 19 september 19
*/

import { Component, OnInit } from "@angular/core";

import { AddclientComponent } from "./addclient/addclient.component";
import { AlertService } from 'src/app/services/alert.service';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialog } from "@angular/material/dialog";
import { SuperAdminService } from "src/app/services/super-admin.service";
import { TitleCasePipe } from "@angular/common";
import { TokenService } from "src/app/services/token.service";
import { UpdateclientComponent } from "./updateclient/updateclient.component";
import { VariablesService } from "src/app/variables.service";

@Component({
  selector: "app-clientmanagement",
  templateUrl: "./clientmanagement.component.html",
  styleUrls: ["./clientmanagement.component.scss"]
})
export class ClientmanagementComponent implements OnInit {
  nodata = { 'emptyMessage': '' };
  rows = [];
  // columns = [{ prop: "name" }, { name: "Gender" }, { name: "Company" }];
  columns = [];

  public create: boolean = false;
  public update: boolean = false;
  private titleCase = new TitleCasePipe();
  filteredItems: any = [];
  //public write:boolean;
  constructor(
    public dialog: MatDialog,
    private variablesService: VariablesService,
    private tokenService: TokenService,
    private superAdminService: SuperAdminService,
    private dialogService: DialogService,
    private alertService: AlertService
  ) {
    this.nodata.emptyMessage = 'No Clients to display'
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
    this.getClient();
  }

  setPermissions(data) {
    if (data) {
      data.roleData.forEach(element => {
        if (element.moduleName == "client_management") {
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

  addclient() {
    const openAddClient = this.dialog.open(AddclientComponent, {
      width: "auto",
      height: "500px",
      disableClose: true,
    });

    openAddClient.afterClosed().subscribe(result => {
      if (result !== undefined) {
        result["configParams"] = {
          sessionExpiryTime: parseInt(result["sessionExpiryTime"]) * 60000
        };
        delete result["sessionExpiryTime"];
        this.superAdminService.createClient(result).subscribe(
          createResult => {
            if (createResult.statusCode === 200) {
              this.alertService.success("", createResult.message);
              this.getClient();
            } else {
              this.alertService.error("", createResult.message);
            }
          },
          err => {
            this.alertService.error("", err.error.message);
          }
        );
      }
    });
  }

  getClient() {
    this.superAdminService.getClient({}).subscribe(client_data => {
      // console.log("Client data:: ", client_data);
      // this.columns = [];
      // console.log(client_data['data']);
      this.rows = client_data["data"];
      this.assignCopy();
    });
  }

  onRowClick(event) {
    //console.log("Clicked:: ", event);
    if (event.type === "click" && event.column.prop === "clientName") {
      const updateClient = this.dialog.open(UpdateclientComponent, {
        width: "auto",
        height: "500px",
        data: event.row
      });

      updateClient.afterClosed().subscribe(result => {
        if (result !== undefined) {
          result["configParams"] = {
            sessionExpiryTime: parseInt(result["sessionExpiryTime"]) * 60000
          };
          this.superAdminService.updateClient(result).subscribe(
            createResult => {
              if (createResult.statusCode === 200) {
                this.getClient();
                this.alertService.success("", createResult.message);
              } else {
                this.alertService.error("", createResult.message);
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

  toggle(index) {
    // console.log(index);
    // console.log(
    //   "this.filteredItems[index]---",
    //   this.tokenService.getElement(this.filteredItems, index, "clientId")
    // );
    // return false;
    this.dialogService
      .openconfirmDialog(
        "Update Status",
        "Are you sure you want to update the status?"
      )
      .afterClosed()
      .subscribe((result: any) => {
        if (result == "Submit") {
          var data = {
            clientId: this.tokenService.getElement(
              this.filteredItems,
              index,
              "clientId"
            ).clientId,
            status:
              this.tokenService.getElement(
                this.filteredItems,
                index,
                "clientId"
              ).status === "active"
                ? "inactive"
                : "active"
          };
          this.superAdminService.modifyClient(data).subscribe(
            (res: any) => {
              if (res.statusCode === 200) {
                this.getClient();
                this.alertService.success("", res.message);
              } else {
                this.alertService.error("", res.message);
                this.getClient();
              }
            },
            err => {
              this.alertService.error("", err.error.message);
              this.getClient();
            }
          );
        } else {
          this.filteredItems = [];
          this.getClient();
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
      item => item.clientName.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }
}
