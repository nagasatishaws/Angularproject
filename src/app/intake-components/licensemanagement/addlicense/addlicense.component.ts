/**
* Author - Lohit
* Version - 1.0
* Create date - 26 september 19
*/


import { Component, OnInit, Optional, Inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import { License } from "../../../intake-models/formmodel";
import { TokenService } from "src/app/services/token.service";
import { SuperAdminService } from "src/app/services/super-admin.service";
import { LicensemanagementComponent } from "../licensemanagement.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-addlicense",
  templateUrl: "./addlicense.component.html",
  styleUrls: ["./addlicense.component.scss"]
})
export class AddlicenseComponent implements OnInit {
  public form: FormGroup;
  public licensedata: License = new License();
  modulelist: any = [];
  clientlist: any = [];
  public buttonFlag: boolean = true;
  public startDate: any = new Date();
  constructor(
    private tokenService: TokenService,
    private alertService: AlertService,
    private superAdminService: SuperAdminService,
    public dialog: MatDialogRef<LicensemanagementComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public getdata: any
  ) {
    this.form = new FormGroup({
      modules: new FormControl("", [Validators.required]),
      noActUsers: new FormControl("", [Validators.required]),
      endDate: new FormControl("", [Validators.required]),
      startDate: new FormControl("", [Validators.required]),
      clientId: new FormControl("", [Validators.required])
    });

    this.getModule();
    this.getClient();

    if (this.getdata) {
      this.licensedata.modules = this.getdata.modules;
      this.licensedata.noActUsers = this.getdata.noActUsers;
      this.licensedata.startDate = this.getdata.startDate;
      this.licensedata.endDate = this.getdata.endDate;
      this.licensedata.clientId = this.getdata.clientId;

      //this.buttonFlag = false;
    } else {
      //this.buttonFlag = true;
    }
    //this.form.reset();
  }

  ngOnInit() { }

  onFormSubmit() {
    this.superAdminService.createLicense(this.licensedata).subscribe(
      (res: any) => {
        if (res.statusCode === "200" || res.statusCode === 200) {
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
   * for listing modules
   */
  getModule() {
    var data = {
      clientId: ""
    };
    this.superAdminService.getModule(data).subscribe((res: any) => {
      this.modulelist = [];
      //console.log(res);
      if (res.statusCode === 200) {
        this.modulelist = res.data;
      }
      //console.log(this.modulelist);
    });
  }

  /**
   * for listing clients
   */
  getClient() {
    var data = {};
    this.superAdminService.getClient(data).subscribe((res: any) => {
      this.clientlist = [];
      //console.log(res);
      if (res.statusCode === 200) {
        this.clientlist = res.data;
      }
      //console.log(this.clientlist);
    });
  }

  errorMessage(field) {
    return this.tokenService.setFormError(this.form, field);
  }
}
