import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  ResolveEnd,
  ResolveStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router
} from "@angular/router";
import { ToastRef, ToastrService } from "ngx-toastr";

import { TokenService } from "../../services/token.service";
import { SharedAnimations } from "src/app/animations/animation";
import { Signin } from "../fromModel";
import { VariablesService } from "./../../variables.service";

import { SigninService } from "../../services/signin.service";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
  animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
  public loading: boolean;
  public loadingText: string;
  public currentUser;
  public user_info;
  public hide = true;
  public form: FormGroup;
  public signindata: Signin = new Signin();
  public signindatastore: any;
  public errorMessageStore: any;
  public roleStore: any;
  public configData: any;
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private variablesService: VariablesService,
    private signinService: SigninService,
    private alertService: AlertService
  ) {
    this.form = new FormGroup({
      emailId: new FormControl("", [Validators.required, Validators.pattern(/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/)]),
      password: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(30)])
    });
    this.tokenService.removeToken("intake");
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      //console.log("event", event);

      if (
        event instanceof RouteConfigLoadStart ||
        event instanceof ResolveStart
      ) {
        this.loadingText = "Loading Dashboard Module...";

        this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.loading = false;
      }
    });
  }

  // signInFunction
  onFormSubmit() {
    if (this.form.valid) {
      this.signinService.signIn(this.form.value).subscribe(
        (signInData: any) => {
          // console.log('signInData = ', signInData);

          this.signindatastore = signInData;

          if (this.signindatastore && this.signindatastore != "") {
            if (this.signindatastore.statusCode == 200) {
              this.loading = true;
              this.loadingText = "Sigining in...";
              if (this.signindatastore) {
                this.tokenService.setToken(this.signindatastore);
                this.form.reset();
                this.router.navigate([
                  "/mainlayout" + this.signindatastore.roleData[0].redirectUrl
                ]);
                this.variablesService.loginData$.next(this.signindatastore);
                this.alertService.success("", this.signindatastore.message);

                //location.reload();
              } else {
                this.alertService.success("", this.signindatastore.message);
                return;
              }
            } else {
              this.alertService.error("", this.signindatastore.message);
              return;
            }
          } else {
            this.alertService.error("", this.signindatastore.message);
            return;
          }
        },
        (error: any) => {
          // console.log(error);
          this.errorMessageStore = error.error;
          if (this.errorMessageStore.statusCode == 403) {
            this.alertService.error("", this.errorMessageStore.message);
            this.form.controls.password.setErrors((error: any) => {
              this.errorMessage("email id");
            });
          } else if (this.errorMessageStore.statusCode == 404) {
            this.alertService.info("", this.errorMessageStore.message);
            this.form.controls.emailId.setErrors((error: any) => {
              this.errorMessage("password");
            });
          } else {
            this.alertService.error("", error.error.message);
            return;
          }
        }
      );
    } else {
      return;
    }
    //this.router.navigate(["mainlayout/licensemanagement"]);
  }

  errorMessage(field) {
    return this.tokenService.setFormError(this.form, field);
  }

  // getErrorEmail() {
  //   return this.form.get("email_id").hasError("required")
  //     ? "Field is required"
  //     : "";
  // }
  // getErrorPassword() {
  //   return this.form.get("password").hasError("required")
  //     ? "Field is required"
  //     : "";
  // }
}
