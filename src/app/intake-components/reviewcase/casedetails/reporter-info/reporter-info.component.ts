import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reporter-info',
  templateUrl: './reporter-info.component.html',
  styleUrls: ['./reporter-info.component.scss']
})
export class ReporterInfoComponent implements OnInit {
  @Input('caseId') caseId: string;
  @Input('assignflag') assignflag: boolean;
  @Input('data') data: any;

  public formGroup: FormGroup;
  public labDetailsHeaders: any = ["Reporter Name", "Reporter Address", "Actions"];
  public labDetailsKeys: any = [];
  public editFlag: boolean = false;
  public editRowIndex: any;

  constructor() { }

  ngOnInit() {
    this.labDetailsKeys = ["reporterName", "addressAndDetails"];
    this.formGroupInit({});
  }

  formGroupInit(data) {
    this.formGroup = new FormGroup({
      reporterName: new FormControl(this.getElementValue(data, "reporterName"), [Validators.required]),
      addressAndDetails: new FormControl(this.getElementValue(data, "addressAndDetails"), [Validators.required]),
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
