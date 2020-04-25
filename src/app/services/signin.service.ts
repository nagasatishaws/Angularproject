/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/


import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { getSignin } from "../intake-models/signinmodel";
import { environment } from "../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

@Injectable({
  providedIn: "root"
})
export class SigninService {
  public apiUrl = environment.userServiceUrl;
  projectHttpOptions: { headers: HttpHeaders };
  constructor(public http: HttpClient) { }

  /**
   *
   * @param body | signin object
   */
  signIn(body): Observable<getSignin> {
    const url = `${this.apiUrl}/login`;
    return this.http
      .post(url, body, {})
      .map((response: getSignin) => {
        return response;
      })
      .catch(this.handleError);
  }

  handleError(error: Response) {
    return Observable.throw(error);
  }
}
