import { Component, OnInit, Optional, Inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import { Queue } from "../../../intake-models/formmodel";
import { TokenService } from "src/app/services/token.service";
import { SuperAdminService } from "src/app/services/super-admin.service";
import { CaseserviceService } from "src/app/services/caseservice.service";
import { CreatequeueComponent } from "../createqueue.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AlertService } from "src/app/services/alert.service";
import { element } from "protractor";

@Component({
  selector: "app-addqueue",
  templateUrl: "./addqueue.component.html",
  styleUrls: ["./addqueue.component.scss"]
})
export class AddqueueComponent implements OnInit {
  public form: FormGroup;
  public userlist: any;
  public queuedata = {
    queueName: "",
    drugName: "",
    clientId: "",
    roleId: "",
    status: "",
    severity: "",
    userList: []
    // team: [],
  };

  public severitylist: any = [];
  public statusList: any = [];
  public clientlist: any = [];
  public roleList: any = [];

  public buttonFlag: boolean = true;
  public clientFlag: boolean = false;
  constructor(
    private tokenService: TokenService,
    private alertService: AlertService,
    private superAdminService: SuperAdminService,
    private caseserviceService: CaseserviceService,
    public dialog: MatDialogRef<CreatequeueComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public getdata: any
  ) {
    //console.log("this.getdata---", this.getdata);
    this.getUser();
    // this.getTeam();
    this.getClient();
    this.getSeverity();
    this.getRoles();
    this.statusList = [
      { label: "DATA ENTRY", value: "data entry" },
      { label: "QUALITY REVIEW", value: "quality review" },
      { label: "MEDICAL REVIEW", value: "medical review" },
      { label: "DUPLICATE", value: "duplicate" },
      { label: "ARCHIVE", value: "archive" },
      { label: "DELETE", value: "delete" },
      { label: "SIGN OFF", value: "sign off" },
      { label: "FOLLOW UP", value: "followup" }
    ]

    this.form = new FormGroup({
      queueName: new FormControl("", [Validators.required]),
      drugName: new FormControl("", []),
      clientId: new FormControl("", []),
      roleId: new FormControl("", []),
      status: new FormControl("", []),
      severity: new FormControl("", []),
      userList: new FormControl("", [])
    });
    //console.log(this.getdata);
    if (this.getdata) {
      this.buttonFlag = false;
      this.queuedata.drugName = this.getdata.drugName;
      this.queuedata.queueName = this.getdata.queueName;
      this.queuedata.clientId = this.getdata.clientId;
      this.queuedata.roleId = this.getdata.roleId;
      this.queuedata.status = this.getdata.status;
      this.queuedata.severity = this.getdata.severity;
      this.queuedata.userList = this.getdata.userList;
      this.form.controls['userList'].setValue(this.getdata.currentUser);
      // console.log("this.form.controls['userList'] : ", this.form.controls['userList']);
      // if (this.getdata.userList) {
      //   this.getdata.userList.forEach(element => {
      //     this.form.controls['userList'].
      //   });
      // }
    }

    if (this.tokenService.getToken().userData.clientId) {
      this.clientFlag = true;
    }
  }

  ngOnInit() { }

  getUser() {
    this.superAdminService
      .getUser({ status: "active" })
      .subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.userlist = res.data;
        }
      });
  }

  // getTeam() {
  //   this.superAdminService
  //     .getTeam({ status: "active" })
  //     .subscribe((res: any) => {
  //       if (res.statusCode === 200) {
  //         this.teamlist = res.data;
  //       }
  //     });
  // }

  getRoles() {
    this.superAdminService.getRole({}).subscribe(resp => {
      this.roleList = Object.assign([], resp['data'][0]['roleList']);
    });
  }

  getClient() {
    this.superAdminService.getClient({}).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.clientlist = res.data;
      }
    });
  }

  getSeverity() {
    this.superAdminService.getSeverity({}).subscribe((res: any) => {
      if (res.statusCode === 200 && res.data && res.data.length > 0) {
        this.severitylist = res.data;
      }
    });
  }

  // team(data, e) {
  //   console.log("data---", data);
  //   console.log("this.queuedata.team----", this.queuedata.team);
  //   //this.userModel = ["user_x1C6zQ-----"];

  //   // if (this.userModel.length === 0) {
  //   //   this.queuedata.currentUser = [];
  //   // }
  //   this.queuedata.currentUser = [];

  //   this.queuedata.team.forEach(element => {
  //     element.forEach(elements => {
  //       this.queuedata.currentUser.push(elements.userId);
  //     });
  //   });
  //   // data.listOfUsers.forEach(element => {
  //   //   this.userModel.push(element.userId);
  //   // });
  //   // console.log("after---", this.userModel);
  //   // this.userModel.forEach((element, index) => {
  //   //   this.queuedata.currentUser.forEach(user => {
  //   //     if (user === element) {
  //   //       this.userModel = this.userModel.splice(index, index);
  //   //     }
  //   //   });
  //   // });

  //   // this.queuedata.currentUser = this.userModel;
  //   // console.log(this.userModel);
  //   // console.log(this.queuedata.currentUser);
  // }

  onFormSubmit() {
    let data = {
      queueName: this.queuedata.queueName,
      drugName: this.queuedata.drugName,
      clientId: (this.clientFlag) ? "" : this.queuedata.clientId,
      roleId: this.queuedata.roleId,
      status: this.queuedata.status,
      severity: this.queuedata.severity,
      userList: this.queuedata.userList
    };
    // console.log("data: ", data);
    // if (this.clientFlag) {
    //   data = {
    //     queueName: this.queuedata.queueName,
    //     drugName: this.queuedata.drugName,
    //     clientId: "",
    //     severity: this.queuedata.severity,
    //     currentUser: []
    //   };
    // } else {
    //   data = {
    //     queueName: this.queuedata.queueName,
    //     drugName: this.queuedata.drugName,
    //     clientId: this.queuedata.clientId,
    //     severity: this.queuedata.severity,
    //     currentUser: []
    //   };
    // }

    // this.queuedata.currentUser.forEach(element => {
    //   this.userlist.forEach(user => {
    //     if (element === user.userId) {
    //       data.currentUser.push({
    //         userId: element,
    //         userName: user.firstName,
    //         assignedOn: new Date()
    //       });
    //     }
    //   });
    // });

    this.caseserviceService.createQueue(data).subscribe((res: any) => {
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
    let data = {
      queueId: this.getdata.queueId,
      queueName: this.queuedata.queueName,
      drugName: this.queuedata.drugName,
      // clientId: (this.clientFlag) ? "" : this.queuedata.clientId,
      roleId: this.queuedata.roleId,
      status: this.queuedata.status,
      severity: this.queuedata.severity,
      userList: this.queuedata.userList
    };
    // this.queuedata.currentUser.forEach(element => {
    //   this.userlist.forEach(user => {
    //     if (element === user.userId) {
    //       data.currentUser.push({
    //         userId: element,
    //         userName: user.firstName,
    //         assignedOn: new Date()
    //       });
    //     }
    //   });
    // });
    this.caseserviceService.updateQueue(data).subscribe(
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

  errorMessage(field) {
    //console.log("field---", this.form.get(field));
    if (this.form.get(field).status === "VALID") {
      return "";
    } else {
      return "Invalid text";
    }
    //return this.tokenService.setFormError(this.form, field);
  }
}
