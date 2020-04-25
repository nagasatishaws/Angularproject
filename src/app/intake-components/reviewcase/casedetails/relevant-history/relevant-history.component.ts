import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-relevant-history',
  templateUrl: './relevant-history.component.html',
  styleUrls: ['./relevant-history.component.scss']
})
export class RelevantHistoryComponent implements OnInit {
  @Input() caseId: string;
  @Input() assignflag: boolean;
  @Input() data: any;

  public create: boolean = false;
  public update: boolean = false;

  public labDetailsHeaders: any = ["From Date", "To Date", "Condition Type", "Description", "Actions"];
  public labDetailsKeys: any = [];
  public editFlag: boolean = false;
  public editRowIndex: any;
  public formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    // if (this.data && this.data.length > 0) {
    //   this.labDetailsKeys = Object.assign([], Object.keys(this.data[0]));
    // } else {
    this.labDetailsKeys = ["fromDate", "toDate", "conditionType", "description"];
    // }
    this.formGroupInit({});
  }

  formGroupInit(data) {
    this.formGroup = new FormGroup({
      fromDate: new FormControl(this.getElementValue(data, "fromDate"), [Validators.required]),
      toDate: new FormControl(this.getElementValue(data, "toDate"), [Validators.required]),
      conditionType: new FormControl(this.getElementValue(data, "conditionType"), [Validators.required]),
      description: new FormControl(this.getElementValue(data, "description"), [Validators.required]),
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
    // console.log(this.data);
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
