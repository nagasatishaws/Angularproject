/**
* Author - Lohit
* Version - 1.0
* Create date - 25 sep 2019
*/


import { Component, OnInit, Inject, Input, Optional } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Team } from "../../../intake-models/formmodel";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TeammanagementComponent } from "../teammanagement.component";
import { TokenService } from "src/app/services/token.service";
import { AlertService } from "src/app/services/alert.service";
import { SuperAdminService } from "src/app/services/super-admin.service";

@Component({
  selector: "app-createteam",
  templateUrl: "./createteam.component.html",
  styleUrls: ["./createteam.component.scss"]
})
export class CreateteamComponent implements OnInit {
  public teamform: FormGroup;

  public teamdata: Team = new Team();

  public buttonFlag: boolean = true;

  public userlist = [];
  public nameerr: any;

  constructor(
    private tokenService: TokenService,
    private alertService: AlertService,
    private superAdminService: SuperAdminService,
    public dialog: MatDialogRef<TeammanagementComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public getdata: any
  ) {
    this.teamform = new FormGroup({
      teamName: new FormControl("", [Validators.required, Validators.maxLength(32)]),
      listOfUsers: new FormControl("", [Validators.required])
    });

    if (this.getdata) {
      this.teamdata.teamName = this.getdata.teamName;
      this.getdata.listOfUsers.forEach(element => {
        this.teamdata.listOfUsers.push(element.userId);
      });
      //this.teamdata.listOfUsers = this.getdata.listOfUsers;

      this.buttonFlag = false;

      // console.log(this.teamdata.listOfUsers);
    } else {
      this.buttonFlag = true;
    }

    this.getUserList();
  }

  onFormSubmit() {
    var data = { teamName: this.teamdata.teamName, listOfUsers: [] };

    this.userlist.forEach(element => {
      this.teamdata.listOfUsers.forEach(user => {
        if (element.userId === user) {
          data.listOfUsers.push({
            userId: element.userId,
            firstName: element.firstName,
            lastName: element.lastName
          });
        }
      });
    });
    this.superAdminService.createTeam(data).subscribe(
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
    this.teamdata["teamId"] = this.getdata.teamId;
    var data = {
      teamId: this.getdata.teamId,
      teamName: this.teamdata.teamName,
      listOfUsers: []
    };

    this.userlist.forEach(element => {
      this.teamdata.listOfUsers.forEach(user => {
        if (element.userId === user) {
          data.listOfUsers.push({
            userId: element.userId,
            firstName: element.firstName,
            lastName: element.lastName
          });
        }
      });
    });
    this.superAdminService.updateTeam(data).subscribe(
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

  /**
   * for listing users
   */
  getUserList() {
    var data = {
      clientId: "",
      status: "active"
    };
    this.superAdminService.getUser(data).subscribe((res: any) => {
      this.userlist = [];
      // console.log(res);
      if (res.statusCode === 200) {
        this.userlist = res.data;
      }
      //console.log(this.modulelist);
    });
  }

  ngOnInit() {
    this.teamform.controls.teamName.valueChanges.subscribe((data: any) => {
      if (data) {
        this.nameerr = data.length;
      }
    })
  }

  errorMessage(field) {
    return this.tokenService.errorMessageForMaxLength(this.teamform, field);
  }
}
