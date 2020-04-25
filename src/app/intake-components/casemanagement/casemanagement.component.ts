/**
* Author - Lohit
* Version - 1.0
* Create date - 24 september 19
*/


import { Component, OnInit } from '@angular/core';

import { AlertService } from 'src/app/services/alert.service';
import { CaseserviceService } from 'src/app/services/caseservice.service';
import { SuperAdminService } from 'src/app/services/super-admin.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-casemanagement',
  templateUrl: './casemanagement.component.html',
  styleUrls: ['./casemanagement.component.scss']
})
export class CasemanagementComponent implements OnInit {
  public nodata = {
    'emptyMessage': ''
  };

  public rows = [];
  public action: string = "";
  public isSuperAdmin: boolean = false;

  public userList = [];
  public queueList = [];
  public clientsList = [];
  public userData: string = "";
  public queueId: string = "";
  public caseData = {
    data: "",
    checked: false
  };
  public showClientList: boolean = false;
  public showQueueList: boolean = false;

  constructor(
    private caseService: CaseserviceService,
    private superAdminService: SuperAdminService,
    private alertService: AlertService,
    private tokenService: TokenService
  ) {
    this.nodata.emptyMessage = 'No Case Data'
    this.getCases();

    let userDetail = this.tokenService.getToken();
    if (userDetail && userDetail["clientId"]) {
      this.isSuperAdmin = false;
      this.clientsList = [];
    } else {
      this.isSuperAdmin = true;
    }
  }

  ngOnInit() {
  }

  getCases() {
    this.rows = [];
    this.caseService.listCase({}).subscribe(caseData => {
      // console.log("list of cases:: ", caseData);
      if (caseData.statusCode.toString() === "200" || caseData.statusCode === 200) {
        caseData["data"].map(row => row.action = false);
        this.rows = caseData["data"];
        // console.log(this.rows);
      }
    });
  }

  onActionSelect() {
    this.queueList = [];
    this.userList = [];
    this.showClientList = false;
    this.showQueueList = false;
    switch (this.action) {
      case "assign":
        this.setUserList();
        break;

      case "unassign":
        // this.unassignCaseFromUser();
        break;

      case "reassign":
        this.setUserList();
        break;

      case "forwardToQueue":
        // this.setClientsList();
        // this.showClientList = true;
        this.showQueueList = true;
        this.setQueueList();
        break;

      default:
        break;
    }
  }

  onClientSelect() {
    this.setQueueList();
    this.showQueueList = true;
  }

  onSubmit() {
    switch (this.action) {
      case "assign":
        this.reassignCaseToUser();
        break;

      case "unassign":
        this.unassignCaseFromUser();
        break;

      case "reassign":
        this.reassignCaseToUser();
        break;

      case "forwardToQueue":
        this.forwardCaseToQueue();
        break;

      default:
        break;
    }
  }

  // checkSingleSelect() {
  //   let select = false;
  //   let data = {};

  //   for (let i = 0; i < this.rows.length; i++) {
  //     if (this.rows[i]["action"]) {
  //       select = true;
  //       data = this.rows[i];
  //       break;
  //     }
  //   }

  //   // this.rows.forEach(row => {
  //   //   console.log("Check data:: ", row);

  //   //   if (row['action'] === true) {
  //   //     console.log("True");
  //   //     select = true;
  //   //     data = row;
  //   //     // return { select: true, data: row };
  //   //   } else {
  //   //     console.log("False");
  //   //     select = false;
  //   //     data = {};
  //   //   }
  //   // });

  //   return { select, data };
  // }

  // setActionInRow(receivedRow, action) {
  //   this.rows.forEach(row => {
  //     if (row.caseData === receivedRow.caseData) {
  //       row.action = action;
  //     }
  //   });

  //   console.log("After setting action:: ", this.rows);
  // }


  // onRowSelect(index) {
  //   console.log(index);

  //   // this.rows[index].action = !this.rows[index].action;
  //   console.log("Row action:: ", this.rows[index]);

  //   if (!this.caseData.checked && this.caseData.data === "") {
  //     console.log("case checked");

  //     this.caseData.data = this.rows[index].caseId;
  //     this.caseData.checked = true;
  //   } else if (this.caseData.checked && this.caseData.data !== this.rows[index].caseId) {
  //     this.caseData.data = this.rows[index].caseId;
  //   } else if (this.caseData.checked && this.caseData.data === this.rows[index].caseId) {
  //     this.caseData.data = "";
  //     this.caseData.checked = false;
  //   }
  // }


  onRowSelect(event) {
    if (event.type === "click" && event.column.prop === "caseId") {
      // this.caseId.data = event.row.caseId;
      // console.log(this.caseId);

      // if (this.caseId.checked && this.caseId.data != event.row.caseId) {
      //   this.caseId.data = event.row.caseId;
      // } else if(this.caseId.checked && this.caseId.data == event.row.caseId){
      //   this.caseId.data = "";
      //   this.caseId.checked = false;
      // } else {
      //   this.caseId.data = "";
      //   this.caseId.checked = false;
      // }

      if (!this.caseData.checked && this.caseData.data === "") {
        // console.log("case checked");

        this.caseData.data = event.row.caseId;
        this.caseData.checked = true;
      } else if (this.caseData.checked && this.caseData.data !== event.row.caseId) {
        this.caseData.data = event.row.caseId;
      } else if (this.caseData.checked && this.caseData.data === event.row.caseId) {
        this.caseData.data = "";
        this.caseData.checked = false;
      }

      // let check = this.checkSingleSelect();
      // console.log("Check response:: ", check);
      // if (check["select"]) {
      //   console.log("Already selected");
      //   this.setActionInRow(check["data"], false);
      //   this.setActionInRow(event.row, true);
      // }
      // else {
      //   console.log("Not selected");
      //   this.setActionInRow(event.row, true);
      // }

      // console.log(event);
    }
  }

  /**
   * Methods activated upon clicking Save button
   */
  reassignCaseToUser() {

    let reassignObject = {
      userId: this.userData["userId"],
      caseId: this.caseData.data,
      userName: this.userData["firstName"]
    }
    // console.log("Case assigned/reassigned to user:: ", reassignObject);

    this.caseService.reassignCaseToUser(reassignObject).subscribe(result => {
      // console.log("Assign/Reassign result:: ", result);

      if (result.statusCode.toString() === "200" || result.statusCode === 200) {
        this.alertService.success("", result.message);
        this.clearDataAfterAction();
        this.getCases();
      }
    }, err => {
      this.alertService.error("", err.error.message);
    });
  }

  unassignCaseFromUser() {

    let unassignObject = {
      caseId: this.caseData.data
    }

    // console.log("Case unassigned from user::", unassignObject);
    this.caseService.unassignCaseFromUser(unassignObject).subscribe(result => {
      // console.log("Unassign result:: ", result);

      if (result.statusCode.toString() === "200" || result.statusCode === 200) {
        this.alertService.success("", result.message);
        this.clearDataAfterAction();
        this.getCases();
      }
    }, err => {
      this.alertService.error("", err.error.message);
    });
  }

  forwardCaseToQueue() {

    let forwardObject = {
      queueId: this.queueId,
      caseId: this.caseData.data
    }

    this.queueList.forEach(queue => {
      if (queue.queueId === this.queueId) {
        forwardObject["queueName"] = queue.queueName
      }
    });

    // console.log("Case forwarded to queue:: ", forwardObject);
    this.caseService.forwardCaseToQueue(forwardObject).subscribe(result => {
      // console.log("Forward case to queue result:: ", result);

      if (result.statusCode.toString() === "200" || result.statusCode === 200) {
        this.alertService.success("", result.message);
        this.clearDataAfterAction();
        this.getCases();
      }
    }, err => {
      this.alertService.error("", err.error.message);
    });
  }

  /**
   * Methods activated upon selection of Action dropdown
   */
  setUserList() {
    this.superAdminService.getUser({ status: 'active' }).subscribe(userData => {
      // console.log("User Data:: ", userData);
      if (userData.statusCode === 200) {
        this.userList = userData["data"];
      }
    });
  }

  setQueueList() {
    this.caseService.listQueue({}).subscribe(result => {
      // console.log("List queue result:: ", result);
      if (result.statusCode === 200 || result.statusCode.toString() === "200") {
        this.queueList = result["data"];
        // console.log("Queue list after success:: ", this.queueList);
      }
    });
  }

  setClientsList() {
    this.superAdminService.getClient({}).subscribe(result => {
      // console.log("Clients result:: ", result);
      if (result.statusCode === 200) {
        this.clientsList = result["data"];
      }
    });
  }

  clearDataAfterAction() {
    this.caseData = {
      data: "",
      checked: false
    }
    this.userList = [];
    this.queueList = [];
    this.showClientList = false;
    this.showQueueList = false;
    this.queueId = "";
    this.action = "";
    this.userData = "";
  }

}
