/**
* Author - Biplab
* Version - 1.0
* Create date - 19 oct 2019
*/

import { Component, OnInit, Input } from "@angular/core";
import { VariablesService } from 'src/app/variables.service';
import { TokenService } from 'src/app/services/token.service';
import { SuperAdminService } from 'src/app/services/super-admin.service';

@Component({
  selector: "app-narrative",
  templateUrl: "./narrative.component.html",
  styleUrls: ["./narrative.component.scss"]
})
export class NarrativeComponent implements OnInit {
  @Input() caseId: string;
  @Input() assignflag: string;
  @Input() data: any;

  public create: boolean = false;
  public update: boolean = false;

  constructor(
    private variablesService: VariablesService,
    private tokenService: TokenService
  ) { }

  setPermissions(data) {
    if (data) {
      data.roleData.forEach(element => {
        if (element.moduleName === "review_case") {
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
    // this.variablesService.loginData.subscribe((res: any) => {
    //   // console.log("sidebar----", res);
    //   //this.defaultMenu = [];
    //   if (res) {
    //     this.setPermissions(res);
    //   } else {
    //     let data = this.tokenService.getToken();
    //     //console.log("data---", data);

    //     this.setPermissions(data);
    //   }
    // });
  }
}
