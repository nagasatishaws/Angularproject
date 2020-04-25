/**
* Author - Lohit
* Version - 1.0
* Create date - 25 sep 2019
*/

import { Component, OnInit, Inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import { User } from "../../../intake-models/formmodel";
import { TokenService } from "src/app/services/token.service";
import { SuperAdminService } from "src/app/services/super-admin.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-adduser",
  templateUrl: "./adduser.component.html",
  styleUrls: ["./adduser.component.scss"]
})
export class AdduserComponent implements OnInit {
  public form: FormGroup;
  public userdata: User = new User();
  public client_list: any;
  public role_list: any;
  public showRoleList: boolean = false;
  public updateFlag: boolean = false;
  public nameerr: any;
  public lsnameerr: any;

  constructor(
    private tokenService: TokenService,
    private superAdminService: SuperAdminService,
    private dialogRef: MatDialogRef<AdduserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({
      clientId: new FormControl("", [Validators.required]),
      emailId: new FormControl("", [
        Validators.required,
        Validators.pattern(
          /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
        )
      ]),
      firstName: new FormControl("", [
        Validators.required,
        Validators.maxLength(32)
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.maxLength(32)
      ]),
      mobileNo: new FormControl("", [
        Validators.required,
        Validators.min(1000000000),
        Validators.max(9999999999)
      ]),
      department: new FormControl("", [Validators.required]),
      designation: new FormControl("", [
        Validators.required,
        Validators.maxLength(32)
      ]),
      roleId: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200)
      ])
    });

    if (this.data) {
      // console.log("Edit user data:: ", this.data);
      this.superAdminService.getClient({}).subscribe(client_data => {
        // console.log("Client data:: ", client_data);
        this.client_list = client_data["data"];
        this.superAdminService
          .getRole({ clientId: this.data["clientId"] })
          .subscribe((role_data: any) => {
            // console.log("Role data:: ", role_data);

            if (role_data.data && role_data.data.length > 0) {
              role_data.data.forEach(element => {
                if (this.data["clientId"] === element.clientId) {
                  this.userdata = Object.assign({}, this.data);
                  this.updateFlag = true;
                  this.showRoleList = true;
                  this.role_list = element.roleList;
                }
              });
            }
          });
      });

      // console.log("this.userdata---", this.userdata);
    } else {
      this.superAdminService.getClient({}).subscribe(client_data => {
        this.client_list = client_data["data"];
      });
    }
    // console.log("Update flag:: ", this.updateFlag);

    //this.form.reset();
  }

  ngOnInit() {
    this.form.controls.firstName.valueChanges.subscribe((data: any) => {
      if (data) {
        this.nameerr = data.length;
      }
    });

    this.form.controls.lastName.valueChanges.subscribe((data: any) => {
      if (data) {
        this.lsnameerr = data.length;
      }
    });
  }

  onFormSubmit() {
    // console.log(this.form);
    this.dialogRef.close(this.form.value);
  }

  onFormUpdate() {
    this.form.value["userId"] = this.userdata["userId"];
    this.dialogRef.close(this.form.value);
  }

  errorMessage(field) {
    return this.tokenService.errorMessageForMaxLength(this.form, field);
  }

  setRolesForClient(e) {
    // console.log("On Client select:: ", e);
    this.role_list = [];
    this.userdata.clientId = e.value;
    this.showRoleList = true;

    let roleObject = {
      clientId: e.value
    };
    this.superAdminService.getRole(roleObject).subscribe((role_data: any) => {
      //console.log("Role data:: ", role_data);
      if (role_data.data && role_data.data.length > 0) {
        role_data.data.forEach(element => {
          if (e.value === element.clientId) {
            this.role_list = element.roleList;
          }
        });
      }
    });
  }

  errorMessageMobile(field) {
    //console.log("field---", form.get(field));
    if (this.form.get(field).hasError("required")) {
      return "Field is required";
    } else {
      if (this.form.get(field).status === "VALID") {
        return "";
      } else {
        return "Mobile number should be 10 digits";
      }
    }
  }
}
