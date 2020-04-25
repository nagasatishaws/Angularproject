/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/


import { Component, OnInit } from "@angular/core";

import { TokenService } from "../../services/token.service";
import { NavigationService } from "../project-layout-services/navigation.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { VariablesService } from "./../../variables.service";

@Component({
  selector: "app-project-header",
  templateUrl: "./project-header.component.html",
  styleUrls: ["./project-header.component.scss"]
})
export class ProjectHeaderComponent implements OnInit {
  public logindatastore: any;
  public logoutData: any;
  notifications: any[];
  username: any;

  constructor(
    private navService: NavigationService,
    private variablesService: VariablesService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    // this.variablesService.loginData.subscribe((data: any) => {
    //   this.logindatastore = data;
    //   if (this.logindatastore == "") {
    //     this.formService.currentUser.subscribe((data: any) => {
    //       this.logindatastore = data;
    //     });
    //   }
    // });

    this.notifications = [
      {
        icon: "i-Speach-Bubble-6",
        title: "New message",
        badge: "3",
        text: "James: Hey! are you busy?",
        time: new Date(),
        status: "primary",
        link: "/chat"
      },
      {
        icon: "i-Receipt-3",
        title: "New order received",
        badge: "$4036",
        text: "1 Headphone, 3 iPhone x",
        time: new Date("11/11/2018"),
        status: "success",
        link: "/tables/full"
      },
      {
        icon: "i-Empty-Box",
        title: "Product out of stock",
        text: "Headphone E67, R98, XL90, Q77",
        time: new Date("11/10/2018"),
        status: "danger",
        link: "/tables/list"
      },
      {
        icon: "i-Data-Power",
        title: "Server up!",
        text: "Server rebooted successfully",
        time: new Date("11/08/2018"),
        status: "success",
        link: "/dashboard/v2"
      },
      {
        icon: "i-Data-Block",
        title: "Server down!",
        badge: "Resolved",
        text: "Region 1: Server crashed!",
        time: new Date("11/06/2018"),
        status: "danger",
        link: "/dashboard/v3"
      }
    ];
  }

  ngOnInit() {
    if (this.tokenService.getToken().userData) {
      this.username = this.tokenService.getToken().userData.firstName;
    }
    //console.log("username---", this.tokenService.getToken());
  }

  toggelSidebar() {
    const state = this.navService.sidebarState;
    if (state.childnavOpen && state.sidenavOpen) {
      return (state.childnavOpen = false);
    }
    if (!state.childnavOpen && state.sidenavOpen) {
      return (state.sidenavOpen = false);
    }
    if (!state.sidenavOpen && !state.childnavOpen) {
      state.sidenavOpen = true;
      setTimeout(() => {
        state.childnavOpen = true;
      }, 50);
    }
  }

  logout() {
    this.tokenService.removeToken("intake");
    this.router.navigate(["auth/signin"]);
  }

  // signout() {}
}
