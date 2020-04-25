/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/



import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { apiResponse } from "../intake-models/signinmodel";
import { environment } from "../../environments/environment";
import { TokenService } from "./token.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

@Injectable({
  providedIn: "root"
})
export class SuperAdminService {
  public apiUrl = environment.userServiceUrl;
  sourceList: any;
  projectHttpOptions: { headers: HttpHeaders };
  constructor(public http: HttpClient, public tokenService: TokenService) {
    this.setToken();
  }

  setToken() {
    if (this.tokenService.getToken()) {
      this.projectHttpOptions = {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: this.tokenService.getToken().jwtToken
        })
      };
    }
  }

  /**-------------------- module start------------------- */

  /**
   * module creation api
   * @param data request payload for creating module
   */
  createModule(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/create-module`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * module listing api
   * @param data request payload for getting module
   */
  getModule(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/list-module`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * module updating api
   * @param data request payload for updating module
   */
  updateModule(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/update-module`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * module modifying api
   * @param data request payload for modifying module
   */
  modifyModule(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/module-status`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }
  /** --------------------------module end -------------------------- */

  /**-------------------- role start------------------- */

  /**
   * role creation api
   * @param data request payload for creating role
   */
  createRole(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/create-role`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * role listing api
   * @param data request payload for getting role
   */
  getRole(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/list-role`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * role updating api
   * @param data request payload for updating role
   */
  updateRole(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/update-role`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * role modifying api
   * @param data request payload for modifying role
   */
  modifyRole(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/role-status`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }
  /** --------------------------role end -------------------------- */

  /**-------------------- client start------------------- */

  /**
   * client creation api
   * @param data request payload for creating client
   */
  createClient(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/create-client`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * client listing api
   * @param data request payload for getting client
   */
  getClient(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/list-client`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * client updating api
   * @param data request payload for updating client
   */
  updateClient(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/update-client`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * client modifying api
   * @param data request payload for modifying client
   */
  modifyClient(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/client-status`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }
  /** --------------------------client end -------------------------- */

  /**-------------------- License start------------------- */

  /**
   * license creation api
   * @param data request payload for creating license
   */
  createLicense(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/create-license`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * license listing api
   * @param data request payload for getting license
   */
  getLicense(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/list-license`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * license modifying api
   * @param data request payload for modifying license
   */
  modifyLicense(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/license-status`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * Get module list from License collection
   * @param data request payload for getting module list
   */
  getModuleFromLicense(data): Observable<apiResponse> {
    this.setToken();
    const url = `${this.apiUrl}/get-license`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }
  /** --------------------------license end -------------------------- */

  /**-------------------- user start------------------- */

  /**
   * client creation api
   * @param data request payload for creating client
   */
  createUser(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/create-user`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * user listing api
   * @param data request payload for getting user
   */
  getUser(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/list-user`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * user updating api
   * @param data request payload for updating user
   */
  updateUser(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/update-user`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * user modifying api
   * @param data request payload for modifying user
   */
  modifyUser(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/user-status`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }
  /** --------------------------user end -------------------------- */

  /**-------------------- team start------------------- */

  /**
   * team creation api
   * @param data request payload for creating team
   */
  createTeam(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/create-team`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * team listing api
   * @param data request payload for getting team
   */
  getTeam(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/list-team`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * team updating api
   * @param data request payload for updating team
   */
  updateTeam(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/update-team`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**********************************team ends******************* */

  /**
   * list severity api
   * @param data request payload for listing severity
   */
  getSeverity(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/list-severity`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  handleError(error: Response) {
    return Observable.throw(error);
  }
}
