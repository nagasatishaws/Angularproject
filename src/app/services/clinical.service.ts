import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

export class ClinicalService {

  public collectFormData$: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public collectFormData = this.collectFormData$.asObservable();

  public formConfigData$: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public formConfigData = this.formConfigData$.asObservable();
  public studyAPIData$: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public studyAPIData = this.studyAPIData$.asObservable();

  public measurementUnits$: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public measurementUnits = this.measurementUnits$.asObservable();
  public cdmsCodeList$: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public cdmsCodeList = this.cdmsCodeList$.asObservable();
  public cdmsRangeChecks$: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public cdmsRangeChecks = this.cdmsRangeChecks$.asObservable();

  public storeItemRefDataForItemGroupDef: any = {};
  public editedbackDataOfItemRefGroupDef: any = {};

  public apiUrl = environment.clinicalService;
  public projectHttpOptions: { headers: HttpHeaders };

  constructor(private http: HttpClient, public tokenService: TokenService) {
    this.setToken();
  }

  setToken() {
    if (this.tokenService.getToken()) {
      this.projectHttpOptions = {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: this.tokenService.getToken().jwtToken
          // "X-Client-Id": this.tokenService.getToken().userData.clientId
        })
      };
    }
  }

  // Function to extract Form Data from Study
  extractFormDataFromStudy(studyData: any, formId: string, eventId: string) {
    if (studyData) {
      for (let event of studyData['studyEventData']) {
        if (event['studyEventOID'] === eventId) {
          for (let form of event['formData']) {
            if (form['formOID'] === formId) {
              return form;
            }
          }
        }
      }
      return {};
    }
  }


  //   /**
  // * getting site data
  // * @param data request payload
  // */
  //   getSite(data): Observable<any> {
  //     const url = `${this.apiUrl}/siteGroup?page=${data.page}&size=${data.size}`;
  //     return this.http
  //       .get(url, this.projectHttpOptions)
  //       .catch(this.handleError);
  //   }

  /**
* getting Locations data according to new APIs
*
*/
  getLocationGroups() {
    const url = `${this.apiUrl}/getLocationGroups`
    return this.http
      .get(url, this.projectHttpOptions)
      .catch(this.handleError);
  }

  //   /**
  // * getting getStudyBasedOnSiteId
  // * @param data request payload
  // */
  //   getStudyBasedOnSiteId(data): Observable<any> {
  //     const url = `${this.apiUrl}/studyBasedOnSiteId/${data}`;
  //     return this.http
  //       .get(url, this.projectHttpOptions)
  //       .catch(this.handleError);
  //   }

  /**
  * getting getStudyBasedOnLocationId
  * @param data request payload
  */
  getStudyBasedOnLocationId(data): Observable<any> {
    const url = `${this.apiUrl}/getStudyBasedOnLocationId/${data}`;
    return this.http
      .get(url, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
* getting getSubjectsBasedOnStudyIdAndLocationId
* @param data request payload
*/
  getSubjectsBasedOnStudyIdAndLocationId(data): Observable<any> {
    const url = `${this.apiUrl}/getSubjectsBasedOnStudyId/${data.studyId}`;
    return this.http
      .get(url, this.projectHttpOptions)
      .catch(this.handleError);
  }



  /**
* getting subject based on Study ID
* @param data request payload
*/
  getStudy(data): Observable<any> {
    const url = `${this.apiUrl}/study/${data}`;
    return this.http
      .get(url, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
* Save Evee=nt data
* @param data input payload
*/
  saveClinicalData(data): Observable<any> {
    // const url = `${this.apiUrl}/saveClinicalData`;
    const url = `${this.apiUrl}/saveFormData`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
* getting events based on Study ID
* @param data request payload
*/
  getStudyEventsBasedOnStudyId(data): Observable<any> {
    const url = `${this.apiUrl}/study/${data}`;
    return this.http
      .get(url, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
* getting getVisitsBasedOnSubjectID
* @param data request payload
*/

  getVisitsBasedOnSubjectID(data): Observable<any> {
    const url = `${this.apiUrl}/fetchVisitsBasedOnSubjectId/${data}`;
    return this.http
      .get(url, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
* getting Measurement Units for Study Configuration
*/
  getCdmsMeasurementUnit(): Observable<any> {
    const url = `${this.apiUrl}/cdmsMeasurementUnit?page=0&size=100`;
    return this.http
      .get(url, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
* Creating the new Measurement Units for Study Configuration
  data is the input body for the api
*/
  postCdmsMeasurementUnit(data): Observable<any> {
    const url = `${this.apiUrl}/cdmsMeasurementUnit`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
* Updating the already Present Measurement Unit for Study Configuration
  data is the input body for the api
*/
  updateCdmsMeasurementUnit(data): Observable<any> {
    const url = `${this.apiUrl}/cdmsMeasurementUnit/${data.id}`;
    return this.http
      .put(url, data, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
* Updating the already Present Measurement Unit for Study Configuration
data is the input body for the api
*/
  postNewCodelist(data): Observable<any> {
    const url = `${this.apiUrl}/cdmsCodeList`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
* Updating the already Present Measurement Unit for Study Configuration
data is the input body for the api
*/
  updateCodeList(data): Observable<any> {
    const url = `${this.apiUrl}/cdmsCodeList/${data.id}`;
    return this.http
      .put(url, data, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
 * Deleting the already Present Measurement Unit for Study Configuration
 data is the input body for the api
 */
  deleteCodeList(data): Observable<any> {
    const url = `${this.apiUrl}/cdmsCodeList/${data.id}`;
    return this.http
      .delete(url, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
* Deleting the already Present Measurement Unit for Study Configuration
data is the input body for the api
*/
  deleteCdmsMeasurementUnit(data): Observable<any> {
    const url = `${this.apiUrl}/cdmsMeasurementUnit/${data.id}`;
    return this.http
      .delete(url, this.projectHttpOptions)
      .catch(this.handleError);
  }


  /**
   *
   * @param data Fetching Form Data Based On ID
   */
  fetchFormDataBasedOnId(data: any): Observable<any> {
    const url = `${this.apiUrl}/getFormData`;
    return this.http
      .get(url, { params: data, headers: this.projectHttpOptions.headers })
      .catch(this.handleError);
  }

  /**
   * @param data Fetching Study Data
   */
  getStudyData(data: any): Observable<any> {
    const url = `${this.apiUrl}/getStudyData`;
    return this.http
      .get(url, { params: data, headers: this.projectHttpOptions.headers })
      .catch(this.handleError);
  }

  /**
   * @param Data Study Configurations - Fetch Study Item Data
   */
  getStudyItemDefs(data: any): Observable<any> {
    const url = `${this.apiUrl}/cdmsItemDef`;
    return this.http
      .get(url, { params: data, headers: this.projectHttpOptions.headers })
      .catch(this.handleError);
  }

  /**
   * @param Data Fetch CDMS Code List Data
   */
  getcdmsCodeList(): Observable<any> {
    const url = `${this.apiUrl}/cdmsCodeList`;
    return this.http
      .get(url, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
 * @param Data Fetch CDMS Rules Data
 */
  getCdmsRuleDef(): Observable<any> {
    const url = `${this.apiUrl}/cdmsRuleDef?page=0&size=100`;
    return this.http
      .get(url, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
* Creating the new Rule Def for Study Configuration
data is the input body for the api
*/
  postCdmsRuleDef(data): Observable<any> {
    const url = `${this.apiUrl}/cdmsRuleDef`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
* Updating the already Present Rule for a Study Configuration
data is the input body for the api
*/
  updateCdmsRuleDef(data): Observable<any> {
    const url = `${this.apiUrl}/cdmsRuleDef/${data.id}`;
    return this.http
      .put(url, data, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
   * @param Data CDMS Range Check
   */
  getCDMSRangeChecks(): Observable<any> {
    const url = `${this.apiUrl}/cdmsRangeCheck`;
    return this.http
      .get(url, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
   * @param Data Updating CDMS ITEM DEF BASED ON ID
   */
  updateCDMSItemDefs(data): Observable<any> {
    const url = `${this.apiUrl}/cdmsItemDef/${data.id}`;
    return this.http
      .put(url, data.inputModel, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
   * @param Data Creating CDMS ITEM DEF
   */
  createCDMSItemDef(data): Observable<any> {
    const url = `${this.apiUrl}/cdmsItemDef`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
   * @param Data GET CDMS ITEM GROUP DEF
   */
  getCDMSItemGroupDef(data: any): Observable<any> {
    const url = `${this.apiUrl}/cdmsItemGroupDef`;
    return this.http
      .get(url, { params: data, headers: this.projectHttpOptions.headers })
      .catch(this.handleError);
  }

  /**
   * @param Data CREATE CDMS ITEM GROUP DEF
   */
  createCDMSItemGroupDef(data): Observable<any> {
    const url = `${this.apiUrl}/cdmsItemGroupDef`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
   *
   * @param Data UPDATE CDMS ITEM GROUP DEF
   */
  updateCDMSItemGroupDefs(data): Observable<any> {
    const url = `${this.apiUrl}/cdmsItemGroupDef/${data.id}`;
    return this.http
      .put(url, data.inputModel, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
   * @param Data FETCH RULE CHECKS BASED ON FLAG
   */
  getCDMSRulesBasedOnId(data: any): Observable<any> {
    const url = `${this.apiUrl}/cdmsRules/${data}`;
    return this.http
      .get(url)
      .catch(this.handleError);
  }

  /**
   * @Param Data CREATE ITEM DEF REFRENCE
   */
  createItemDefReference(data: any): Observable<any> {
    const url = `${this.apiUrl}/cdmsItemRef`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
   * @param Data GET CDMS FORMS DEF
   */
  getCDMSFormsDefs(data: any): Observable<any> {
    const url = `${this.apiUrl}/cdmsFormDef`;
    return this.http
      .get(url, { params: data, headers: this.projectHttpOptions.headers })
      .catch(this.handleError);
  }

  /**
   * @param Data CREATE ITEM GROUP REFERENCE
   */
  createItemGroupReference(data: any): Observable<any> {
    const url = `${this.apiUrl}/cdmsItemGroupRef`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
   *
   * @param Data CREATE CDMS FORM DEF
   */
  createCDMSFormDef(data): Observable<any> {
    const url = `${this.apiUrl}/cdmsFormDef`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
   * @param Data UPDATE CDMS FORM DEF
   */
  updateCDMSFormDef(data): Observable<any> {
    const url = `${this.apiUrl}/cdmsFormDef/${data.id}`;
    return this.http
      .put(url, data.inputModel, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
   * @param Data DELETE CDMS ITEM REF
   */
  deleteCDMSItemRef(data: any): Observable<any> {
    const url = `${this.apiUrl}/cdmsItemRef/${data.id}/${data.itemGroupDefId}`;
    return this.http
      .delete(url, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
   * @param Data DELETE CDMS ITEM GROUP REFERENCE
   */
  deleteCDMSItemGroupRef(data: any): Observable<any> {
    const url = `${this.apiUrl}/cdmsItemGroupRef/${data.id}/${data.studyFormDefId}`;
    return this.http
      .delete(url, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
   * @param Data CREATE SUBJECT NUMBER BASED ON SITE ID & STUDY ID
   */
  createSubjectNumber(data: any): Observable<any> {
    const url = `${this.apiUrl}/studySubject`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
* @param Data FETCH Studies for Study Configuration
*/
  getStudiesForStudyConfiguration(): Observable<any> {
    const url = `${this.apiUrl}/study`;
    return this.http
      .get(url)
      .catch(this.handleError);
  }

  /**
  *
  * @param Data CREATE New Study for Study Configuration
  */
  createStudyForStudyConfiguration(data): Observable<any> {
    const url = `${this.apiUrl}/study`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .catch(this.handleError);
  }

  saveEventDate(data): Observable<any> {
    const url = `${this.apiUrl}/saveEventData`;
    return this.http
      .post(url, data, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
 *
 * @param Data DELETE exsisting ITEM DEF for Study Master Configuration
 */
  deleteCdmsItemsDef(data: any): Observable<any> {
    const url = `${this.apiUrl}/cdmsItemDef/${data.id}`;
    return this.http
      .delete(url, this.projectHttpOptions)
      .catch(this.handleError);
  }

  /**
*
* @param Data DELETE exsisting ITEM GROUP DEF for Study Master Configuration
*/
  deleteCdmsItemGroupDef(data: any): Observable<any> {
    const url = `${this.apiUrl}/cdmsItemGroupDef/${data.id}`;
    return this.http
      .delete(url, this.projectHttpOptions)
      .catch(this.handleError);
  }

  handleError(error: Response) {
    return Observable.throw(error);
  }

}
