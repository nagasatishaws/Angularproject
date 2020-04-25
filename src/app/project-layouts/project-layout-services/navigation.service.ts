/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/


import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { VariablesService } from "../../variables.service";
import { TokenService } from "../../services/token.service";

export interface IMenuItem {
  id?: string;
  title?: string;
  description?: string;
  type: string; // Possible values: link/dropDown/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
  active?: boolean;
}
export interface IChildItem {
  id?: string;
  parentId?: string;
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
  active?: boolean;
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

interface ISidebarState {
  sidenavOpen?: boolean;
  childnavOpen?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class NavigationService {
  public sidebarState: ISidebarState = {
    sidenavOpen: true,
    childnavOpen: false
  };
  defaultMenu = [];
  menuItems$: Observable<any[]>;
  constructor(
    private variablesService: VariablesService,
    private tokenService: TokenService
  ) {
    this.defaultMenu = [];
    this.variablesService.loginData.subscribe((res: any) => {
      // console.log("sidebar----", res);
      //this.defaultMenu = [];
      // console.log("this.defaultMenu---", this.defaultMenu.length);
      // if (this.defaultMenu.length === 0) {
      if (res) {
        this.setPermissions(res);
      } else {
        let data = this.tokenService.getToken();
        //console.log("data---", data);
        this.setPermissions(data);
      }
      //}
    });
  }

  /**
   *
   * @param data for setting permissions
   */
  setPermissions(data) {
    this.defaultMenu = [];

    if (data) {
      data.roleData.forEach(element => {
        if (element.privilege[1] === 1) {
          this.defaultMenu.push({
            name: element.moduleDisplayName,
            type: "link",
            icon: element.icon ? element.icon : "i-Bar-Chart",
            state: "/mainlayout" + element.redirectUrl
          });
        }
      });
      //console.log("this.defaultMenu--", this.defaultMenu);
      this.menuItems$ = Observable.create(observer => {
        observer.next(this.defaultMenu);
      });
    }
  }
}
