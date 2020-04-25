import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VariablesService } from 'src/app/variables.service';
import { TokenService } from 'src/app/services/token.service';
import { SuperAdminService } from 'src/app/services/super-admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { AddcaserulesComponent } from './addcaserules/addcaserules.component';
import { CaseserviceService } from 'src/app/services/caseservice.service';

@Component({
  selector: 'app-caserules',
  templateUrl: './caserules.component.html',
  styleUrls: ['./caserules.component.scss']
})
export class CaserulesComponent implements OnInit {
  public nodata = {
    'emptyMessage': ''
  };
  public create: boolean = false;
  public update: boolean = false;
  filteredItems: any = [];
  //public write:boolean;
  constructor(
    public dialog: MatDialog,
    private variablesService: VariablesService,
    private tokenService: TokenService,
    private superAdminService: SuperAdminService,
    private alertService: AlertService,
    private caseService: CaseserviceService
  ) {
    this.nodata.emptyMessage = 'No Rules to display'
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
    this.listRules(); //calling list rules
  }

  setPermissions(data) {
    if (data) {
      data.roleData.forEach(element => {
        if (element.moduleName === "caserule") {
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

  /**
   * for listing modules
   */
  listRules() {
    this.caseService.listRules().subscribe((res: any) => {
      if (res.statusCode === 200 || res.statusCode === "200") {
        this.filteredItems = Object.assign([], res.data);
      }
    });
  }

  addrule() {
    var modal = this.dialog.open(AddcaserulesComponent, {
      height: "auto",
      width: "500px",
      disableClose: true,
      data: ""
    });

    modal.afterClosed().subscribe(result => {
      if (result == "cancel") {
        this.listRules();
      }
    });
  }

  editRule(index) {
    var modal = this.dialog.open(AddcaserulesComponent, {
      height: "auto",
      width: "auto",
      disableClose: true,
      data: this.tokenService.getElement(this.filteredItems, index, "_id")
    });

    modal.afterClosed().subscribe(result => {
      if (result == "cancel") {
        this.listRules();
      }
    });
  }

}
