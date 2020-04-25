/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/


import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class VariablesService {
  // get jwt token from login for getusers
  public jwtToken$: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public jwtToken = this.jwtToken$.asObservable();

  // users to show in multiple components
  public getUserData$: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public getUserData = this.getUserData$.asObservable();

  // login data
  public loginData$: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public loginData = this.loginData$.asObservable();

  // storing token from query params for resetpassword
  public getTokenEmail$: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public getTokenEmail = this.getTokenEmail$.asObservable();

  // storing  token from reset_password api and sending it to update password via email api
  public getTokenUpdatePassword$: BehaviorSubject<any> = new BehaviorSubject<
    any
  >("");
  public getTokenUpdatePassword = this.getTokenUpdatePassword$.asObservable();

  // for verify email address storing "code" and sending it to get verify email address
  public verifyEmailCodeStore$: BehaviorSubject<any> = new BehaviorSubject<any>(
    ""
  );
  public verifyEmailCodeStore = this.verifyEmailCodeStore$.asObservable();

  // getproject id
  public getprojectID$: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public getprojectID = this.getprojectID$.asObservable();

  // fetchproject
  public fetchProject$: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public fetchProject = this.fetchProject$.asObservable();

  // charts data
  public chartData$: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public chartData = this.chartData$.asObservable();
  // charts data
  public piechartData$: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public piechartData = this.piechartData$.asObservable();
  constructor() { }
}
