import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pinfo-lab-details',
  templateUrl: './pinfo-lab-details.component.html',
  styleUrls: ['./pinfo-lab-details.component.scss']
})
export class PinfoLabDetailsComponent implements OnInit {
  @Input() caseId: string;
  @Input() assignflag: boolean;

  @Input() data: any;

  public labDetailsHeaders: any = ["Serial No", "Date", "Test/ Assessments", "Results", "Range", "Actions"];
  public labDetailsKeys: any = [];
  public editFlag: boolean = false;
  public editRowIndex: any;
  public formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    // console.log("Patient lab data: ", this.data);
    // if (this.data && this.data.length > 0) {
    //   this.labDetailsKeys = Object.assign([], Object.keys(this.data[0]));
    // } else {
    this.labDetailsKeys = ["sNo", "date", "testAssessmentNotes", "result", "range"];
    // }
    this.formGroupInit({});
  }

  formGroupInit(data) {
    this.formGroup = new FormGroup({
      sNo: new FormControl(this.getElementValue(data, "sNo"), [Validators.required]),
      date: new FormControl(this.getElementValue(data, "date"), [Validators.required]),
      testAssessmentNotes: new FormControl(this.getElementValue(data, "testAssessmentNotes"), [Validators.required]),
      result: new FormControl(this.getElementValue(data, "result"), [Validators.required]),
      range: new FormControl(this.getElementValue(data, "range"), [Validators.required]),
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
    this.data.push(this.formGroup.value);
    this.cancel();
  }

  editRowClick(index: any) {
    this.editRowIndex = index;
    this.formGroupInit(this.data[index]);
    this.editFlag = true;
  }

  updateRow() {
    this.data.splice(this.editRowIndex, 1, this.formGroup.value);
    this.cancel();
  }

  deleteRowClick(index: any) {
    this.data.splice(index, 1);
  }

  cancel() {
    this.editFlag = false;
    this.formGroupInit({});
  }

}