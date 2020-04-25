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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SuperAdminService } from 'src/app/services/super-admin.service';

@Component({
  selector: "app-updateclient",
  templateUrl: "./updateclient.component.html",
  styleUrls: ["./updateclient.component.scss"]
})
export class UpdateclientComponent implements OnInit {
  public form: FormGroup;
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
    private dialogRef: MatDialogRef<UpdateclientComponent>,
    private superAdminService: SuperAdminService
  ) {
    this.form = new FormGroup({
      clientName: new FormControl("", [Validators.required]),
      industry: new FormControl("", [Validators.required]),
      billingAddress: new FormControl("", [Validators.required]),
      contactPersonName: new FormControl("", [Validators.required]),
      contactPhoneNumber: new FormControl("", [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
      emailId: new FormControl("", [Validators.required, Validators.pattern(/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/)]),
      sessionExpiryTime: new FormControl("", [])
    });

    // console.log("Dialog data:: ", this.data);
    if (this.data !== {}) {
      // console.log(this.data);
      this.clientdata = Object.assign({}, this.data);
      this.clientdata["configParams"]['sessionExpiryTime'] = this.data.configParams.sessionExpiryTime / 60000;

      this.superAdminService.getLicense({}).subscribe(license_data => {
        // console.log("License data:: ", license_data);
        if (license_data["data"].length > 0) {
          this.license_list = license_data["data"];
        }
      });
    }
  }

  ngOnInit() { }

  onFormSubmit() {
    // console.log(this.form);
    // this.superAdminService.createClient(this.form.value).subscribe(result => {
    //   console.log("After creating client:: ", result);
    // });
    this.form.value["clientId"] = this.data.clientId;
    this.dialogRef.close(this.form.value);
  }

  errorMessage(field) {
    return this.tokenService.setFormError(this.form, field);
  }
}
