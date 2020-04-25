/**
* Author - Biplab
* Version - 1.0
* Create date - 15 september 19
*/


import { Component, OnInit, Inject, Optional } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import { getModule } from "../../../intake-models/formmodel";
import { TokenService } from "src/app/services/token.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ModulemanagementComponent } from "../modulemanagement.component";
import { AlertService } from "src/app/services/alert.service";
import { SuperAdminService } from "../../../services/super-admin.service";
@Component({
  selector: "app-addmodule",
  templateUrl: "./addmodule.component.html",
  styleUrls: ["./addmodule.component.scss"]
})
export class AddmoduleComponent implements OnInit {
  public form: FormGroup;
  public moduledata: getModule = new getModule();
  public buttonFlag: boolean = true;
  public nameerr: any;
  public dinameerr: any;
  public reameerr: any;

  constructor(
    private tokenService: TokenService,
    private alertService: AlertService,
    private superAdminService: SuperAdminService,
    public dialog: MatDialogRef<ModulemanagementComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public getdata: any
  ) {
    this.form = new FormGroup({
      moduleName: new FormControl("", [
        Validators.required,
        Validators.maxLength(32)
      ]),
      moduleDisplayName: new FormControl("", [
        Validators.required,
        Validators.maxLength(32)
      ]),
      redirectUrl: new FormControl("", [
        Validators.required,
        Validators.maxLength(32)
      ])
    });

    if (this.getdata) {
      this.moduledata.moduleName = this.getdata.moduleName;
      this.moduledata.moduleDisplayName = this.getdata.moduleDisplayName;
      this.moduledata.redirectUrl = this.getdata.redirectUrl;

      this.buttonFlag = false;
    } else {
      this.buttonFlag = true;
    }
  }

  ngOnInit() {
    // this.form.controls.moduleName.valueChanges.subscribe((data: any) => {
    //   if (data) {
    //     this.nameerr = data.length;
    //   }
    // })
    // this.form.controls.moduleDisplayName.valueChanges.subscribe((data: any) => {
    //   if (data) {
    //     this.dinameerr = data.length;
    //   }
    // })
    // this.form.controls.redirectUrl.valueChanges.subscribe((data: any) => {
    //   if (data) {
    //     this.reameerr = data.length;
    //   }
    // })
  }

  onFormSubmit() {
    this.superAdminService.createModule(this.moduledata).subscribe(
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
    this.moduledata["moduleId"] = this.getdata.moduleId;
    this.superAdminService.updateModule(this.moduledata).subscribe(
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
    return this.tokenService.errorMessageForMaxLength(this.form, field);
  }
}
