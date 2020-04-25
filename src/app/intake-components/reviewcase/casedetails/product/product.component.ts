import { Component, OnInit, Input } from "@angular/core";
import { VariablesService } from "src/app/variables.service";
import { TokenService } from "src/app/services/token.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  @Input() caseId: string;
  @Input() assignflag: string;
  @Input() data: any;

  public create: boolean = false;
  public update: boolean = false;

  public labDetailsHeaders: any = ["Suspect Drug Name", "Dose", "Route of Administration", "Indications", "Secondary Suspect", "Lot Number",
    "Therapy Start Date", "Therapy End Date", "Reaction Abate", "Reaction Reappear", "Action Taken", "Test Article Received", "Actions"];
  public labDetailsKeys: any = [];
  public editFlag: boolean = false;
  public editIndiFlag: boolean = false;
  public editRowIndex: any;
  public editRowIndiIndex: any;
  public formGroup: FormGroup;
  public indicationFormGroup: FormGroup;

  constructor(
    private variablesService: VariablesService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    // if (this.data && this.data.drugList.length > 0) {
    //   this.labDetailsKeys = Object.assign([], Object.keys(this.data.drugList[0]));
    // } else {
    this.labDetailsKeys = ["suspectDrugName", "dose", "routeOfAdministration", "indication", "isSecondarySuspect",
      "lotNumber", "therapyStartDate", "therapyEndDate", "reactionAbate", "reactionReappear", "actionTaken"];
    // }
    this.formGroupInit({});
    // this.indicationFgInit({});
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
      suspectDrugName: new FormControl(this.getElementValue(data, "suspectDrugName"), [Validators.required]),
      dose: new FormControl(this.getElementValue(data, "dose"), [Validators.required]),
      routeOfAdministration: new FormControl(this.getElementValue(data, "routeOfAdministration"), [Validators.required]),
      indication: new FormControl(this.getElementValue(data, "indication"), [Validators.required]),
      isSecondarySuspect: new FormControl(this.getElementValue(data, "isSecondarySuspect"), [Validators.required]),
      lotNumber: new FormControl(this.getElementValue(data, "lotNumber"), [Validators.required]),
      therapyStartDate: new FormControl(this.getElementValue(data, "therapyStartDate"), [Validators.required]),
      therapyEndDate: new FormControl(this.getElementValue(data, "therapyEndDate"), [Validators.required]),
      reactionAbate: new FormControl(this.getElementValue(data, "reactionAbate"), [Validators.required]),
      reactionReappear: new FormControl(this.getElementValue(data, "reactionReappear"), [Validators.required]),
      testArticleReceived: new FormGroup({
        approvedDrug: new FormControl(this.getElementValue(data['testArticleReceived'], "approvedDrug"), [Validators.required]),
        INDAgent: new FormControl(this.getElementValue(data['testArticleReceived'], "INDAgent"), [Validators.required]),
        placebo: new FormControl(this.getElementValue(data['testArticleReceived'], "placebo"), [Validators.required]),
        approvedDevice: new FormControl(this.getElementValue(data['testArticleReceived'], "approvedDevice"), [Validators.required]),
        IDEAgent: new FormControl(this.getElementValue(data['testArticleReceived'], "IDEAgent"), [Validators.required]),
        blindedStudyAgent: new FormControl(this.getElementValue(data['testArticleReceived'], "blindedStudyAgent"), [Validators.required]),
        NA: new FormControl(this.getElementValue(data['testArticleReceived'], "NA"), [Validators.required]),
        otherFlag: new FormControl(this.getElementValue(data['testArticleReceived'], "otherFlag"), [Validators.required]),
        othersText: new FormControl(this.getElementValue(data['testArticleReceived'], "othersText"), [Validators.required]),
      }),
      actionTaken: new FormControl(this.getElementValue(data, "actionTaken"), [Validators.required]),
    });
  }

  // indicationFgInit(data) {
  //   this.indicationFormGroup = new FormGroup({
  //     indication: new FormControl(this.getElementValue(data, "indication"), [Validators.required]),
  //   });
  // }

  getElementValue(data, key) {
    if (data && data.hasOwnProperty(key)) {
      return data[key];
    } else {
      return ''
    }
  }

  addRow() {
    this.formGroup.value['indication'] = this.formGroup.value['indication'].split(',');
    this.data.drugList.push(this.formGroup.value);
    this.cancel();
    // console.log(this.data);
  }

  // addIndication() {
  //   this.data.indication.push(this.indicationFormGroup.value['indication']);
  //   this.cancelIndi();
  // }

  editRowClick(index: any) {
    this.editRowIndex = index;
    this.formGroupInit(this.data.drugList[index]);
    this.editFlag = true;
  }

  // editIndicationClick(index: any) {
  //   this.editRowIndiIndex = index;
  //   this.indicationFgInit({ indication: this.data.indication[index] });
  //   this.editIndiFlag = true;
  // }

  updateRow() {
    if (!Array.isArray(this.formGroup.value['indication'])) {
      this.formGroup.value['indication'] = this.formGroup.value['indication'].split(',');
    }
    this.data.drugList.splice(this.editRowIndex, 1, this.formGroup.value);
    this.cancel();
  }

  // updateIndiRow() {
  //   this.data.indication.splice(this.editRowIndiIndex, 1, this.indicationFormGroup.value['indication']);
  //   this.cancelIndi();
  // }

  deleteRowClick(index: any) {
    this.data.drugList.splice(index, 1);
  }

  // deleteIndiRowClick(index: any) {
  //   this.data.indication.splice(index, 1);
  // }

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

  // cancelIndi() {
  //   this.editIndiFlag = false;
  //   this.indicationFgInit({});
  // }
}
