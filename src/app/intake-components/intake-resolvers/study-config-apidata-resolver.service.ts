import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

// Service Imports
import { ClinicalService } from 'src/app/services/clinical.service';

@Injectable()
export class StudyConfigApidataResolverService implements Resolve<any> {

  // Property Declarations
  private studyData: any;
  private subjectData: any;
  private combinedData: any = {
    'configuration': null,
    'apiData': null
  }

  constructor(private clinicalService: ClinicalService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise((resolve, reject) => {
      let studyIdForGettingEvents = '';
      this.studyData = JSON.parse(localStorage.getItem("studyData"));
      this.subjectData = JSON.parse(localStorage.getItem("subjectData"));
      studyIdForGettingEvents = this.studyData != null ? this.studyData.studyId : '';
      this.clinicalService.getStudyEventsBasedOnStudyId(studyIdForGettingEvents).subscribe((configRes: any) => {
        if (configRes) {
          this.combinedData.configuration = configRes;
          let payload = {
            metadataVersionId: configRes.metadataVersions[0].id,
            studyOid: configRes.oid,
            subjectId: this.subjectData.subjectId
          }
          this.clinicalService.getStudyData(payload).subscribe((getStudyDataRes: any) => {
            if (getStudyDataRes) {
              this.combinedData.apiData = getStudyDataRes;
              resolve(this.combinedData);
              this.combinedData = { 'configuration': null, 'apiData': null };
            }
          }, err => {
            resolve(this.combinedData);
            this.combinedData = { 'configuration': null, 'apiData': null };
          });
        }
      });
    });
  }
}
