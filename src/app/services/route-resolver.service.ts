import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CaseserviceService } from './caseservice.service';

@Injectable({
  providedIn: 'root'
})
export class RouteResolverService implements Resolve<any> {

  constructor(private caseserviceService: CaseserviceService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    // console.log("\n\n\nTriggered");

    // return new Promise((resolve, reject) => {
    //   this.caseserviceService.viewCase({ caseId: route.params.id }).subscribe(data => {
    //     resolve(data);
    //   });
    // });
    if (route.params.id !== 'unk') {
      return this.caseserviceService.viewCase({ caseId: route.params.id });
    } else {
      let data = {
        "header": {
          "caseId": "",
          "dateReceived": "",
          "dateOfThisReport": "",
          "partnerRef": "",
          "reportType": "",
          "reportSource": "",
          "referenceCaseId": "",
          "referenceCaseDate": "",
          "caseVersion": ""
        },
        "patient": {
          "basicInfo": {
            "initials": "",
            "subjectId": "",
            "country": "",
            "dob": "",
            "age": "",
            "ageUnit": "",
            "sex": "",
            "pregnant": false,
            "pregnancy": {
              "gestationPeriod": "",
              "gestationPeriodUnits": "",
              "numberOfFetus": "",
              "prospectiveRetrospective": "",
              "pregnancyDetails": ""
            },
            "weight": "",
            "weightUnit": "",
            "height": "",
            "heightUnit": ""
          },
          "labDetails": [],
          "relevantTests": []
        },
        "reporter": [],
        "adverseEvent": {
          "reactionList": []
        },
        "seriousness": {
          "isSerious": false,
          "deviationResult": false,
          "seriousnessCriteria": {
            "patientDied": "",
            "hospitalization": "",
            "hospitalizationStartDate": "",
            "hospitalizationEndDate": "",
            "disabilityOrIncapacity": "",
            "lifeThreatening": false,
            "congenitalAnomaly": "",
            "othersFlag": false,
            "othersText": ""
          },
          "outcome": {
            "recovered": "",
            "recoveringResolving": "",
            "notRecovered": "",
            "fatal": false,
            "unknown": "",
            "otherFlag": false,
            "othersText": ""
          }
        },
        "suspectProduct": {
          "drug": {
            "drugList": [],
          },
          "device": {
            "deviceName": "",
            "safetyDate": "",
            "sentDate": "",
            "crossReference": "",
            "returnedDate": "",
            "globalId": "",
            "quantity": "",
            "deviceDetails": []
          }
        },
        "concomitantDrugs": [],
        "relevantHistory": [],
        "manufacturer": {
          "nameOfManufacturer": "",
          "addressOfManufacturer": "",
          "controlNumber": "",
          "dateReceivedByTheManufacturer": "",
          "remarks": ""
        },
        "studyDetails": {
          "id": "",
          "name": "",
          "siteId": "",
          "studySite": "",
          "protocolNumber": "",
          "protocolTitle": "",
          "protocolDetails": ""
        },
        "narrative": {
          "narrative": ""
        },
        "causalityAssessment": {
          "reporterAssessment": "",
          "isReacRelatedSpon": "notRelated",
          "casualityAssessmentSpon": "",
          "isReacRelatedInves": "notRelated",
          "casualityAssessmentInves": ""
        },
        "fileAttachments": []
      }
      return data;
    }
  }
}
