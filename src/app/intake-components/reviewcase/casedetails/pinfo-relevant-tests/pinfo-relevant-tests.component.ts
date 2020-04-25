import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pinfo-relevant-tests',
  templateUrl: './pinfo-relevant-tests.component.html',
  styleUrls: ['./pinfo-relevant-tests.component.scss']
})
export class PinfoRelevantTestsComponent implements OnInit {
  @Input() caseId: string;
  @Input() assignflag: boolean;

  @Input() data: any;

  public labDetailsHeaders: any = ["Serial No", "Date", "Details", "Actions"];
  public labDetailsKeys: any = [];
  public editFlag: boolean = false;
  public editRowIndex: any;
  public formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    // console.log("Patient relevant data: ", this.data);
    // if (this.data && this.data.length > 0) {
    //   this.labDetailsKeys = Object.assign([], Object.keys(this.data[0]));
    // } else {
    this.labDetailsKeys = ["sNo", "date", "details"];
    // }
    this.formGroupInit({});
  }

  formGroupInit(data) {
    this.formGroup = new FormGroup({
      sNo: new FormControl(this.getElementValue(data, "sNo"), [Validators.required]),
      date: new FormControl(this.getElementValue(data, "date"), [Validators.required]),
      details: new FormControl(this.getElementValue(data, "details"), [Validators.required]),
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
