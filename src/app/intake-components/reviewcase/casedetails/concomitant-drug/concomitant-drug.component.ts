import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-concomitant-drug',
  templateUrl: './concomitant-drug.component.html',
  styleUrls: ['./concomitant-drug.component.scss']
})
export class ConcomitantDrugComponent implements OnInit {
  @Input() caseId: string;
  @Input() assignflag: string;
  @Input() data: any;

  public create: boolean = false;
  public update: boolean = false;

  public labDetailsHeaders: any = ["Drug Name", "Dose", "Start Date", "End Date", "Indication", "Actions"];
  public labDetailsKeys: any = [];
  public editFlag: boolean = false;
  public editRowIndex: any;
  public formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    // if (this.data && this.data.length > 0) {
    //   this.labDetailsKeys = Object.assign([], Object.keys(this.data[0]));
    // } else {
    this.labDetailsKeys = ["drugName", "dose", "startDate", "endDate", "indication"];
    // }
    this.formGroupInit({});
  }

  formGroupInit(data) {
    this.formGroup = new FormGroup({
      drugName: new FormControl(this.getElementValue(data, "drugName"), [Validators.required]),
      dose: new FormControl(this.getElementValue(data, "dose"), [Validators.required]),
      startDate: new FormControl(this.getElementValue(data, "startDate"), [Validators.required]),
      endDate: new FormControl(this.getElementValue(data, "endDate"), [Validators.required]),
      indication: new FormControl(this.getElementValue(data, "indication"), [Validators.required]),
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
    this.formGroup.value['indication'] = this.formGroup.value['indication'].split(',');
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
    if (!Array.isArray(this.formGroup.value['indication'])) {
      this.formGroup.value['indication'] = this.formGroup.value['indication'].split(',');
    }
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
