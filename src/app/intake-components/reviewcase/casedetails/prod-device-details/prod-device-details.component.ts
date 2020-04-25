import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-prod-device-details',
  templateUrl: './prod-device-details.component.html',
  styleUrls: ['./prod-device-details.component.scss']
})
export class ProdDeviceDetailsComponent implements OnInit {
  @Input() caseId: string;
  @Input() assignflag: string;
  @Input() data: any;

  public create: boolean = false;
  public update: boolean = false;

  public labDetailsHeaders: any = ["CID Number", "PCID Number", "Lot Number", "Complaint Categories Date", "Complaint Categories Text", "Analysis Categories Date", "Analysis Categories Text", "Analysis Summary Date", "Analysis Summary Text", "QC Result Date", "QC Result Text", "QC Result Comments", "Actions"];
  public labDetailsKeys: any = [];
  public editFlag: boolean = false;
  public editRowIndex: any;
  public formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    if (this.data && this.data.deviceDetails.length > 0) {
      this.labDetailsKeys = Object.assign([], Object.keys(this.data.deviceDetails[0]));
    } else {
      this.labDetailsKeys = ["cidNumber", "pcidNumber", "lotNumber", "complaintCatDate", "complaintCatText", "analysisCatDate", "analysisCatText", "analysisSummaryDate", "analysisSummaryText", "qcResultDate", "qcResultText", "qcResultComments"]
    }
    this.formGroupInit({});
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
      cidNumber: new FormControl(this.getElementValue(data, "cidNumber"), [Validators.required]),
      pcidNumber: new FormControl(this.getElementValue(data, "pcidNumber"), [Validators.required]),
      lotNumber: new FormControl(this.getElementValue(data, "lotNumber"), [Validators.required]),
      complaintCatDate: new FormControl(this.getElementValue(data, "complaintCatDate"), [Validators.required]),
      complaintCatText: new FormControl(this.getElementValue(data, "complaintCatText"), [Validators.required]),
      analysisCatDate: new FormControl(this.getElementValue(data, "analysisCatDate"), [Validators.required]),
      analysisCatText: new FormControl(this.getElementValue(data, "analysisCatText"), [Validators.required]),
      analysisSummaryDate: new FormControl(this.getElementValue(data, "analysisSummaryDate"), [Validators.required]),
      analysisSummaryText: new FormControl(this.getElementValue(data, "analysisSummaryText"), [Validators.required]),
      qcResultDate: new FormControl(this.getElementValue(data, "qcResultDate"), [Validators.required]),
      qcResultText: new FormControl(this.getElementValue(data, "qcResultText"), [Validators.required]),
      qcResultComments: new FormControl(this.getElementValue(data, "qcResultComments"), [Validators.required]),
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
    this.data.deviceDetails.push(this.formGroup.value);
    this.cancel();
    // console.log(this.data);
  }

  editRowClick(index: any) {
    this.editRowIndex = index;
    this.formGroupInit(this.data.deviceDetails[index]);
    this.editFlag = true;
  }

  updateRow() {
    this.data.deviceDetails.splice(this.editRowIndex, 1, this.formGroup.value);
    this.cancel();
  }

  deleteRowClick(index: any) {
    this.data.deviceDetails.splice(index, 1);
  }

  cancel() {
    this.editFlag = false;
    this.formGroupInit({});
  }

}
