/**
* Author - Lohit
* Version - 1.0
* Create date - 25 september 19
*/


import { Component, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "@angular/material/dialog";

import { AddqueueComponent } from "./addqueue/addqueue.component";
import { AlertService } from "src/app/services/alert.service";
import { CaseserviceService } from "src/app/services/caseservice.service";
import { DialogService } from "src/app/services/dialog.service";
import { Observable } from "rxjs";
import { SuperAdminService } from "../../services/super-admin.service";
import { TokenService } from "src/app/services/token.service";
import { VariablesService } from "src/app/variables.service";

@Component({
  selector: "app-createqueue",
  templateUrl: "./createqueue.component.html",
  styleUrls: ["./createqueue.component.scss"]
})
export class CreatequeueComponent implements OnInit {
  queuedata: any;
  public nodata = {
    'emptyMessage': '',
  };
  public create: boolean = false;
  public update: boolean = false;
  public queuelist: any = [];
  public clientFlag: boolean = false;

  queueItem$: Observable<any[]>;

  public clientlist = [];
  public clientId: any;
  public filteredItems = [];

  constructor(
    public dialog: MatDialog,
    private variablesService: VariablesService,
    private tokenService: TokenService,
    private superAdminService: SuperAdminService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private caseserviceService: CaseserviceService
  ) {
    //console.log(this.tokenService.getToken());
    this.nodata.emptyMessage = 'No Queue data'

  }

  setPermissions(data) {
    if (data) {
      data.roleData.forEach(element => {
        if (element.moduleName == "queue_management") {
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

  ngOnInit() {
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

    if (this.tokenService.getToken().userData.clientId) {
      this.clientFlag = true;
      this.getQueue();
    } else {
      this.superAdminService.getClient({}).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.clientlist = res.data;
          this.clientId = this.clientlist[0].clientId;
          this.clientFlag = false;
        }
        this.getQueue();
        //console.log("this.clientlist----", this.clientlist);
      });
    }
  }

  addqueue() {
    this.queuedata = this.dialog.open(AddqueueComponent, {
      height: "auto",
      width: "500px",
      disableClose: true
    });

    this.queuedata.afterClosed().subscribe(result => {
      if (result == "cancel") {
        this.getQueue();
        // console.log("closed--", result);
      }
    });
  }

  editmodule(index) {
    //this.filteredItems[index]["clientId"] = this.clientId;
    let modal = this.dialog.open(AddqueueComponent, {
      height: "auto",
      width: "500px",
      disableClose: true,
      data: this.tokenService.getElement(this.filteredItems, index, "_id")
    });

    modal.afterClosed().subscribe(result => {
      if (result == "cancel") {
        this.getQueue();
        //delete this.filteredItems[index]["clientId"];
        // console.log("closed--", result);
      }
    });
  }

  getQueue() {
    this.queuelist = [];
    let data;
    if (this.clientFlag) {
      data = {};
    } else {
      data = { clientId: this.clientId };
    }
    this.caseserviceService.listQueue(data).subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.queuelist = res.data;
        // console.log("Queue data:: ", res.data);

        this.queueItem$ = Observable.create(observer => {
          observer.next(this.queuelist);
        });
      }

      this.assignCopy();
      //console.log("queue-----", this.queuelist);
    });
  }

  /**
   * assigning the source object
   */
  assignCopy() {
    this.filteredItems = Object.assign([], this.queuelist);
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
    this.filteredItems = Object.assign([], this.queuelist).filter(
      item =>
        item.queueName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.drugName.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }
}
