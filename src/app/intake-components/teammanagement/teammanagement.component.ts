/**
* Author - Lohit
* Version - 1.0
* Create date - 25 sep 2019
*/


import { Component, OnInit, ViewChild } from "@angular/core";

import { CreateteamComponent } from "./createteam/createteam.component";
import { MatDialog } from "@angular/material/dialog";
import { DialogService } from "src/app/services/dialog.service";
import { AlertService } from "src/app/services/alert.service";
import { SuperAdminService } from "src/app/services/super-admin.service";
import { TokenService } from "src/app/services/token.service";
import { VariablesService } from "src/app/variables.service";

@Component({
  selector: "app-teammanagement",
  templateUrl: "./teammanagement.component.html",
  styleUrls: ["./teammanagement.component.scss"]
})
export class TeammanagementComponent implements OnInit {
  nav_position: string = "end";

  showFiller = false;

  // @ViewChild(CreateteamComponent, { static: false }) create: CreateteamComponent;
  public createdata: any = {};
  public editdata: any = {};
  public name: string;
  public cardflag: boolean = false;
  public trueflag: boolean = true;
  public falseflag: boolean = false;
  removable = true;
  teamusers = [];

  public create: boolean = false;
  public update: boolean = false;
  public teamlist = [];
  filteredItems = [];
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

    this.getTeamList();
  }

  setPermissions(data) {
    if (data) {
      data.roleData.forEach(element => {
        if (element.moduleName == "team_management") {
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

  createteam() {
    this.createdata = this.dialog.open(CreateteamComponent, {
      width: "auto",
      height: "auto",
      data: "",
      disableClose: true
    });
    this.createdata.afterClosed().subscribe(result => {
      if (result == "cancel") {
        this.getTeamList();
        // console.log("closed--", result);
      }
    });
  }

  editteam(index) {
    this.editdata = this.dialog.open(CreateteamComponent, {
      width: "auto",
      height: "auto",
      disableClose: true,
      data: this.tokenService.getElement(this.filteredItems, index, "_id")
    });
    this.editdata.afterClosed().subscribe(result => {
      if (result == "cancel") {
        this.getTeamList();
        // console.log("closed--", result);
      }
    });
  }

  viewusers(team) {
    this.cardflag = true;
    // console.log(team);
    this.name = team.teamName;

    this.teamusers = team.listOfUsers;
    // console.log(team.users);
  }

  /**
   * for listing modules
   */
  getTeamList() {
    var data = {
      clientId: "",
      status: "active"
    };
    this.superAdminService.getTeam(data).subscribe((res: any) => {
      this.teamlist = [];
      // console.log(res);
      if (res.statusCode === 200) {
        if (res.data) {
          this.teamlist = res.data;
          this.assignCopy();
        }
      }
      //console.log(this.modulelist);
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
            teamId: this.tokenService.getElement(
              this.filteredItems,
              index,
              "_id"
            ).teamId,
            status:
              this.tokenService.getElement(this.filteredItems, index, "_id")
                .status === "active"
                ? "inactive"
                : "active",
            teamName: this.tokenService.getElement(
              this.filteredItems,
              index,
              "_id"
            ).teamName,
            listOfUsers: this.tokenService.getElement(
              this.filteredItems,
              index,
              "_id"
            ).listOfUsers
          };

          this.superAdminService.updateTeam(data).subscribe(
            (res: any) => {
              if (res.statusCode === 200) {
                this.getTeamList();
                this.alertService.success("", res.message);
              } else {
                this.alertService.error("", res.message);
                this.getTeamList();
              }
            },
            err => {
              this.alertService.error("", err.error.message);
              this.getTeamList();
            }
          );
        } else {
          this.getTeamList();
          return;
        }
      });
  }

  /**
   * assigning the source object
   */
  assignCopy() {
    this.filteredItems = Object.assign([], this.teamlist);
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
    this.filteredItems = Object.assign([], this.teamlist).filter(
      item => item.teamName.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }
}
