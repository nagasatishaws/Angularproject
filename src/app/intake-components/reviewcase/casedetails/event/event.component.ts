/**
 * Author - Biplab
 * Version - 1.0
 * Create date - 19 oct 2019
 */

import { Component, OnInit, Input } from "@angular/core";
import { VariablesService } from "src/app/variables.service";
import { TokenService } from "src/app/services/token.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"]
})
export class EventComponent implements OnInit {
  @Input('caseId') caseId: string;
  @Input('assignflag') assignflag: string;
  @Input('data') data: any;

  public create: boolean = false;
  public update: boolean = false;

  public labDetailsHeaders: any = ["Reaction Onset Date", "Reaction End Date", "Event Verbatim", "Preferred Term", "Listedness",
    "Listedness Text", "Expectedness", "Expectedness Text", "Is Serious", "Is Reation Related(Sponsor)",
    "Causality Assessment(Sponsor)", "Is Reation Related(Investigator)",
    "Causality Assessment(Investigator)", "Seriousness Criteria",
    "Result of Deviation", "Reaction Outcome", "Actions"];
  public labDetailsKeys: any = [];
  public editFlag: boolean = false;
  public editRowIndex: any;
  public formGroup: FormGroup;

  constructor(
    private variablesService: VariablesService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    // if (this.data && this.data.reactionList.length > 0) {
    //   this.labDetailsKeys = Object.assign([], Object.keys(this.data.reactionList[0]));
    // } else {
    // this.labDetailsKeys = ["reactionOnsetDate", "eventVerbatim", "preferredTerm", "listedness",
    //   "listednessText", "expectedness", "expectednessText", "isSerious", "seriousnessCriteria",
    //   "deviationResult", "outcome"];
    this.labDetailsKeys = ["reactionOnsetDate", "reactionEndDate", "eventVerbatim", "preferredTerm", "listedness",
      "listednessText", "expectedness", "expectednessText", "isSerious", "isReacRelatedSpon",
      "casualityAssessmentSpon", "isReacRelatedInves", "casualityAssessmentInves"];
    // }
    this.formGroupInit({});
    //console.log("create---", data);
    // this.variablesService.loginData.subscribe((res: any) => {
    //   // console.log("sidebar----", res);
    //   //this.defaultMenu = [];
    //   if (res) {
    //     this.setPermissions(res);
    //   } else {
    //     let data = this.tokenService.getToken();
    //     //console.log("data---", data);

    //     this.setPermissions(data);
    //   }
    // });

    // if (this.nerMappedData["event"].hasOwnProperty('adverseReaction')) {
    //   this.adverseReactionList = this.nerMappedData["event"]['adverseReaction'];
    // }

    // if (this.nerMappedData["event"].hasOwnProperty('indication')) {
    //   this.indicationList = this.nerMappedData["event"]['indication'];
    // }

    // if (this.nerMappedData["event"].hasOwnProperty('indicationAdverseReaction')) {
    //   this.indiAdverseReactionList = this.nerMappedData["event"]['indicationAdverseReaction'];
    // }

    // if (this.data["seriousnessCriteria"] === "") {
    //   this.data["seriousnessCriteria"] = [];
    //   this.data["seriousness"] = "No";
    //   // console.log("1: ", this.data["seriousnessCriteria"]);
    // } else {
    //   if (this.data["seriousnessCriteria"].length > 0 && !this.checkIfSeriousnessCriteriaEmpty(this.data["seriousnessCriteria"])) {
    //     this.data["seriousness"] = "Yes";
    //     // console.log("2: ", this.data["seriousnessCriteria"]);
    //   } else {
    //     this.data["seriousness"] = "No";
    //     // console.log("3: ", this.data["seriousnessCriteria"]);
    //   }
    //   var arr = [];
    //   this.seriousnessList.forEach((element, i) => {
    //     let index = this.data["seriousnessCriteria"].indexOf(element);
    //     if (index !== -1) {
    //       arr[i] = element;
    //     } else {
    //       arr[i] = "";
    //     }
    //   });
    //   this.data["seriousnessCriteria"] = arr;
    // }

    // console.log("data----", this.data);
  }

  setPermissions(data) {
    if (data) {
      data.roleData.forEach(element => {
        if (element.moduleName === "review_case") {
          if (element.privilege[0] === 1) {
            this.create = true;
          }

          if (element.privilege[2] === 1) {
            this.update = true;
          }
        }
      });
    }
  }

  formGroupInit(data) {
    this.formGroup = new FormGroup({
      reactionOnsetDate: new FormControl(this.getElementValue(data, "reactionOnsetDate"), [Validators.required]),
      reactionEndDate: new FormControl(this.getElementValue(data, "reactionEndDate"), [Validators.required]),
      eventVerbatim: new FormControl(this.getElementValue(data, "eventVerbatim"), [Validators.required]),
      preferredTerm: new FormControl(this.getElementValue(data, "preferredTerm"), [Validators.required]),
      // caseSafety: new FormGroup({
      listedness: new FormControl(this.getElementValue(data, "listedness"), [Validators.required]),
      listednessText: new FormControl(this.getElementValue(data, "listednessText"), [Validators.required]),
      expectedness: new FormControl(this.getElementValue(data, "expectedness"), [Validators.required]),
      expectednessText: new FormControl(this.getElementValue(data, "expectednessText"), [Validators.required]),
      isSerious: new FormControl(this.getElementValue(data, "isSerious"), [Validators.required]),
      deviationResult: new FormControl(this.getElementValue(data, "deviationResult"), [Validators.required]),
      seriousnessCriteria: new FormGroup({
        patientDied: new FormControl(this.getElementValue(data['seriousnessCriteria'], "patientDied"), [Validators.required]),
        hospitalization: new FormControl(this.getElementValue(data['seriousnessCriteria'], "hospitalization"), [Validators.required]),
        hospitalizationStartDate: new FormControl(this.getElementValue(data['seriousnessCriteria'], "hospitalizationStartDate"), [Validators.required]),
        hospitalizationEndDate: new FormControl(this.getElementValue(data['seriousnessCriteria'], "hospitalizationEndDate"), [Validators.required]),
        disabilityOrIncapacity: new FormControl(this.getElementValue(data['seriousnessCriteria'], "disabilityOrIncapacity"), [Validators.required]),
        lifeThreatening: new FormControl(this.getElementValue(data['seriousnessCriteria'], "lifeThreatening"), [Validators.required]),
        congenitalAnomaly: new FormControl(this.getElementValue(data['seriousnessCriteria'], "congenitalAnomaly"), [Validators.required]),
        othersFlag: new FormControl(this.getElementValue(data['seriousnessCriteria'], "othersFlag"), [Validators.required]),
        othersText: new FormControl(this.getElementValue(data['seriousnessCriteria'], "othersText"), [Validators.required]),
      }),
      outcome: new FormGroup({
        recovered: new FormControl(this.getElementValue(data['outcome'], "recovered"), [Validators.required]),
        recoveringResolving: new FormControl(this.getElementValue(data['outcome'], "recoveringResolving"), [Validators.required]),
        notRecovered: new FormControl(this.getElementValue(data['outcome'], "notRecovered"), [Validators.required]),
        fatal: new FormControl(this.getElementValue(data['outcome'], "fatal"), [Validators.required]),
        unknown: new FormControl(this.getElementValue(data['outcome'], "unknown"), [Validators.required]),
        otherFlag: new FormControl(this.getElementValue(data['outcome'], "otherFlag"), [Validators.required]),
        othersText: new FormControl(this.getElementValue(data['outcome'], "othersText"), [Validators.required]),
      }),
      reporterAssessment: new FormControl(this.getElementValue(data, "reporterAssessment"), []),
      isReacRelatedSpon: new FormControl(this.getElementValue(data, "isReacRelatedSpon"), []),
      casualityAssessmentSpon: new FormControl(this.getElementValue(data, "casualityAssessmentSpon"), []),
      isReacRelatedInves: new FormControl(this.getElementValue(data, "isReacRelatedInves"), []),
      casualityAssessmentInves: new FormControl(this.getElementValue(data, "casualityAssessmentInves"), []),
      // })
    });
  }

  getElementValue(data, key) {
    if (data && data.hasOwnProperty(key)) {
      return data[key];
    } else {
      return ''
    }
  }

  addRow() {
    this.data.reactionList.push(this.formGroup.value);
    this.cancel();
    // console.log(this.data);
  }

  editRowClick(index: any) {
    this.editRowIndex = index;
    // console.log(this.data.reactionList[index]);

    this.formGroupInit(this.data.reactionList[index]);
    this.editFlag = true;
  }

  updateRow() {
    this.data.reactionList.splice(this.editRowIndex, 1, this.formGroup.value);
    this.cancel();
  }

  deleteRowClick(index: any) {
    this.data.reactionList.splice(index, 1);
  }

  cancel() {
    this.editFlag = false;
    this.formGroupInit({});
  }

  showCheckedValue(input) {
    let result = [];
    for (let key of Object.keys(input)) {
      if (input[key] === true) {
        if (key === "othersFlag" || key === "otherFlag") {
          result.push(input['othersText']);
        } else if (key === "hospitalization") {
          result.push(key + " [" + input['hospitalizationStartDate'] + ' - ' + input['hospitalizationEndDate'] + "]");
        } else {
          result.push(key);
        }
      }
    }

    if (result.length === 0) {
      return "-";
    }
    return result;
  }

  // toggleSeriousnessCriteria(event, index) {
  //   if (!this.data["seriousnessCriteria"][index]) {
  //     this.data["seriousnessCriteria"][index] = "";
  //   } else {
  //     this.data["seriousnessCriteria"][index] = event;
  //   }
  // }

  // checkIfSeriousnessCriteriaEmpty(seriousnessCriteria) {
  //   let flag = true;
  //   for (let i of seriousnessCriteria) {
  //     if (i !== "") {
  //       flag = false;
  //     }
  //   }

  //   return flag;
  // }
}
