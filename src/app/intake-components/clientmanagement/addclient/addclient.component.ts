/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 19 september 19
*/


import { Component, OnInit, Inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import { Client } from "../../../intake-models/formmodel";
import { TokenService } from "src/app/services/token.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { SuperAdminService } from "src/app/services/super-admin.service";

@Component({
  selector: "app-addclient",
  templateUrl: "./addclient.component.html",
  styleUrls: ["./addclient.component.scss"]
})
export class AddclientComponent implements OnInit {
  public form: FormGroup;
  public industrylenError: any;
  public clientlenError: any;
  submitted = false;
  public clientdata: any = {
    clientName: "",
    industry: "",
    billingAddress: "",
    contactPersonName: "",
    contactPhoneNumber: "",
    emailId: "",
    configParams: { sessionExpiryTime: "" }
  };
  public license_list: any;
  constructor(
    private tokenService: TokenService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddclientComponent>,
    private superAdminService: SuperAdminService
  ) {
    this.form = new FormGroup({
      clientName: new FormControl("", [Validators.required, Validators.maxLength(32)]),
      industry: new FormControl("", [Validators.required, Validators.maxLength(32)]),
      billingAddress: new FormControl("", [Validators.required]),
      contactPersonName: new FormControl("", [Validators.required]),
      contactPhoneNumber: new FormControl("", [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
      emailId: new FormControl("", [Validators.required, Validators.pattern(/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/)]),
      sessionExpiryTime: new FormControl("", [])
    });

    // console.log("clientdata=====", this.clientdata);

    // console.log("Dialog data:: ", this.data);
    // if (this.data !== {}) {
    //   this.clientdata = Object.assign({}, this.data);
    //   this.clientdata['session_expiry_time'] = this.data.config_params.session_expiry_time;
    // }
    this.superAdminService.getLicense({}).subscribe(license_data => {
      // console.log("License data:: ", license_data);
      if (license_data["data"].length > 0) {
        this.license_list = license_data["data"];
      }
    });

  }
  industryError(data) {
    // console.log(data);

    // console.log(this.form.controls.industry.value, 'dvgfsdfd');

  }


  ngOnInit() {
    this.form.controls.industry.valueChanges.subscribe((data: any) => {
      // console.log(data.length);
      if (data) {
        this.industrylenError = data.length;
      }

    })

    this.form.controls.clientName.valueChanges.subscribe((data: any) => {
      // console.log(data.length);
      if (data) {
        this.clientlenError = data.length;
      }
    })
  }



  onFormSubmit() {
    // console.log(this.form);
    // this.superAdminService.createClient(this.form.value).subscribe(result => {
    //   console.log("After creating client:: ", result);
    // });
    this.form.value.emailId = this.form.value.emailId.toLowerCase();
    this.dialogRef.close(this.form.value);
  }

  errorMessage(field) {
    return this.tokenService.errorMessageForMaxLength(this.form, field);
  }
}
