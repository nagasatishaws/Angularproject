/**
 * Author - Biplab Dey
 * Version - 1.0
 * Create date - 20 september 19
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
export class CaseserviceService {
  public apiUrl = environment.dataManagerUrl;

  sourceList: any;
  projectHttpOptions: { headers: HttpHeaders };
  projectHttpOptionsMultipart: { headers: HttpHeaders };

  public csvLabels = {
    "regulatoryReferenceNumber": "Regulatory Reference Number",
    "partnerReference": "Partner Reference",
    "literatureReference": "Literature Reference",
    "safetyDBCaseNum": "Safety DB Case Number",
    "caseId": "Case ID",
    "reportSource": "Report Source",
    "reportType": "Report Type",
    "dateReceived": "Date Received",
    "dateOfThisReport": "Date Of This Report",
    "fileType": "File Type",
    "reporterName": "Reporter Name",
    "country": "Country",
    "age": "Age",
    "ageUnit": "Age Unit",
    "sex": "Sex",
    "weight": "Weight",
    "weightUnit": "Weight Unit",
    "patientIdentifier": "Patient Identifier",
    "randomizationNumber": "Randomization Number",
    "protocolNumber": "Protocol Number",
    "reactionOnsetDate": "Reaction Onset Date",
    "seriousness": "Seriousness",
    "seriousnessCriteria": "Seriousness Criteria",
    "suspectDrug": "Suspect Drug",
    "lotNumber": "Lot Number",
    "tradeName": "Trade Name",
    "therapyDateFrom": "Therapy Date From",
    "therapyDateTo": "Therapy Date To",
    "form": "Form",
    "narrative": "Narrative"
  }

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

      this.projectHttpOptionsMultipart = {
        headers: new HttpHeaders({
          "Content-Type": "multipart/form-data"
        })
      };
    }
  }

  /**
   * create queue api
   * @param data request payload for creating queue
   */
  createQueue(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/create-queue`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * list queue api
   * @param data request payload for listing queue
   */
  listQueue(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/list-queue`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * update queue api
   * @param data request payload for updating queue
   */
  updateQueue(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/update-queue`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * list process case api
   * @param data request payload for listing processing case
   */
  listProcessRef(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/list-process-ref`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * list case api
   * @param data request payload for listing case
   */
  listCase(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/list-case`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  listAllCases(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/list-all-cases`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * create case api
   * @param data request payload for creating case
   */
  CreateCase(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    let urlLink = environment.dpaServiceUrl;
    const url = `${urlLink}/v1/mp/PVCI/init`;
    // const url = `${this.apiUrl}/v1/mp/UI/init`;
    return this.http
      .post(url, data)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * api to unassign an user from a case
   * @param data request paylod for unassign case from user
   */
  unassignCaseFromUser(data): Observable<apiResponse> {
    this.setToken();
    const url = `${this.apiUrl}/unassign-case-from-user`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * api to reassign an user from a case
   * @param data request payload for reassign case from user
   */
  reassignCaseToUser(data): Observable<apiResponse> {
    this.setToken();
    const url = `${this.apiUrl}/reassign-case-to-user`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * assign case to queue
   * @param data request payload for assigning queue to a case
   */
  assignCaseToQueue(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/assign-case-to-queue`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * forward case to queue
   * @param data request payload for forwarding case to a queue
   */
  forwardCaseToQueue(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/forward-case-to-queue`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * assign case to user
   * @param data request payload for assigning user to a case
   */
  assignCaseToUser(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/assign-case-to-user`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * view case api
   * @param data request payload for viewing case
   */
  viewCase(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/view-case`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * view case E2b api
   * @param data request payload for viewing case E2b
   */
  CaseE2b(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/generate-case-e2b`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * view case Email api
   * @param data request payload for viewing case Email
   */
  CaseEmail(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/send-case-by-email`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * view case Csv api
   * @param data request payload for viewing case Csv
   */
  exportCaseAsCsv(data): Observable<any> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/export-case`;
    return this.http
      .post(url, data, {
        headers: new HttpHeaders({
          Authorization: this.tokenService.getToken().jwtToken
        }),
        responseType: "arraybuffer"
      })
      .catch(this.handleError);
  }

  /**
   * for downloading case
   * @param data request payload for downloading case Csv
   */
  CaseDownload(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/download-case-attachments`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * for updating case
   * @param data request payload for updating case
   */
  updateCase(data): Observable<apiResponse> {
    this.setToken();
    this.projectHttpOptionsMultipart.headers = this.projectHttpOptionsMultipart.headers.append('Authorization', this.tokenService.getToken().jwtToken);
    this.projectHttpOptionsMultipart.headers = this.projectHttpOptionsMultipart.headers.delete('Content-Type');
    // let formData = new FormData();
    // formData.append('mappedObj', JSON.stringify(data['mappedObj']));
    const url = `${this.apiUrl}/update-case`;
    return this.http
      .post(url, data, this.projectHttpOptionsMultipart)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * for reject case
   * @param data request payload for rejecting case
   */
  rejectCase(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/reject-case`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * api to create mail
   * @param data request paylod for creating mail
   */
  createMail(data): Observable<apiResponse> {
    this.setToken();
    const url = `${this.apiUrl}/create-mail-server`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * api to listing mail
   * @param data request paylod for listing mail
   */
  listMail(data): Observable<apiResponse> {
    this.setToken();
    const url = `${this.apiUrl}/list-mail-server`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * api to update mail
   * @param data request paylod for updating mail
   */
  updateMail(data): Observable<apiResponse> {
    this.setToken();
    const url = `${this.apiUrl}/edit-mail-server`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * api to download NER audits
   * @param data
   */
  downloadNERAudits(data) {
    this.setToken();
    const url = `${this.apiUrl}/download-excel`;
    return this.http
      .post(url, data, {
        headers: new HttpHeaders({
          Authorization: this.tokenService.getToken().jwtToken
        }),
        responseType: "arraybuffer"
      })
      .catch(this.handleError);
  }

  /**
   * api to get the list of filters for cases.
   */
  getFilterNames() {
    this.setToken();
    const url = `${this.apiUrl}/list-case-filter`;
    return this.http
      .post(
        url,
        {},
        {
          headers: new HttpHeaders({
            Authorization: this.tokenService.getToken().jwtToken
          })
        }
      )
      .catch(this.handleError);
  }

  /**
   * api to get a list of all rules.
   */
  listRules() {
    const url = `${this.apiUrl}/list-rule`;
    return this.http
      .post(
        url,
        {},
        {
          headers: new HttpHeaders({
            Authorization: this.tokenService.getToken().jwtToken
          })
        }
      )
      .catch(this.handleError);
  }

  /**
   * api to add a new rule.
   * @param data
   */
  addRule(data) {
    const url = `${this.apiUrl}/create-rule`;
    return this.http
      .post(url, data, {
        headers: new HttpHeaders({
          Authorization: this.tokenService.getToken().jwtToken
        })
      })
      .catch(this.handleError);
  }

  /**
   * api to update a particular rule.
   * @param data
   */
  updateRule(data) {
    const url = `${this.apiUrl}/update-rule`;
    return this.http
      .post(url, data, {
        headers: new HttpHeaders({
          Authorization: this.tokenService.getToken().jwtToken
        })
      })
      .catch(this.handleError);
  }

  /**
   * duplicate case api
   * @param data request payload for viewing duplicate cases
   */
  duplicateCase(data): Observable<apiResponse> {
    this.setToken();
    //data["jwt"] = this.tokenService.getToken().jwt_token;
    const url = `${this.apiUrl}/duplicate-case`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * @param data
   */
  nerAnalysis(data) {
    const url = `${this.apiUrl}/ner-analysis`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  createCaseTypeIn(data) {
    this.setToken();
    this.projectHttpOptionsMultipart.headers = this.projectHttpOptionsMultipart.headers.append('Authorization', this.tokenService.getToken().jwtToken);
    this.projectHttpOptionsMultipart.headers = this.projectHttpOptionsMultipart.headers.delete('Content-Type');
    const url = `${this.apiUrl}/create-case-ui`;
    // console.log("formData: ", formData.get('mappedObj'));
    return this.http.post(url, data, this.projectHttpOptionsMultipart)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  caseAction(data) {
    this.setToken();
    const url = `${this.apiUrl}/update-case-status`;
    return this.http.post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  caseFollowUpAction(data) {
    this.setToken();
    const url = `${this.apiUrl}/follow-up`;
    return this.http.post(url, data, this.projectHttpOptions)
      .map((response: apiResponse) => {
        return response;
      })
      .catch(this.handleError);
  }

  lineListingReport(data) {
    this.setToken();
    const url = `${this.apiUrl}/create-linelisting-report`;
    return this.http
      .post(url, data, {
        headers: new HttpHeaders({
          Authorization: this.tokenService.getToken().jwtToken
        }),
        responseType: "arraybuffer"
      })
      .catch(this.handleError);
  }

  handleError(error: Response) {
    return Observable.throw(error);
  }
}
