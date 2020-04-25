import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export const _filter = (opt: any[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.caseId.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-remark',
  templateUrl: './remark.component.html',
  styleUrls: ['./remark.component.scss']
})
export class RemarkComponent implements OnInit {
  public duplicateList: any;
  public caseList: any;
  public showCaseDesc: any = [];

  public allCases: any = [];

  // caseCtrl = new FormControl();
  caseForm: FormGroup = this._formBuilder.group({
    caseCtrl: '',
  });
  // filteredAllCases: Observable<any[]>;
  // filteredDuplicateCases: Observable<any[]>;

  filteredCases: Observable<any[]>;

  constructor(public dialogRef: MatDialogRef<RemarkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _formBuilder: FormBuilder) {
  }
  // state => state ? this._filterStates(state) : this.caseList.slice()

  ngOnInit() {
    if (this.data.hasOwnProperty('originalCaseIdNeeded') &&
      this.data.originalCaseIdNeeded) {
      // console.log("this.data.caseList: ", this.data.caseList)


      if (this.data.caseList['duplicate']) {
        // this.duplicateList = this.data.caseList['duplicate'];
        this.allCases.push({
          label: 'Duplicate',
          cases: this.data.caseList['duplicate']
        });
      }

      if (this.data.caseList['all']) {
        // this.caseList = this.data.caseList['all'];
        this.allCases.push({
          label: 'All',
          cases: this.data.caseList['all']
        });
      }
    }

    // this.filteredAllCases = this.caseCtrl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(state => state ? this._filterStates(state) : this.caseList.slice())
    //   );

    // this.filteredDuplicateCases = this.caseCtrl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(state => state ? this._filterStates(state) : this.duplicateList.slice())
    //   );

    // this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filterGroup(value))
    //   );

    this.filteredCases = this.caseForm.get('caseCtrl')!.valueChanges
      .pipe(
        startWith(''),
        map(state => this._filterGroup(state))
      );
  }

  modalSubmit() {
    this.data.originalCaseId = this.caseForm.get('caseCtrl').value;
    this.dialogRef.close(this.data);
  }

  modalCancel() {
    this.dialogRef.close(undefined);
  }

  testMouseEnter(event, index, group) {
    this.showCaseDesc[group + index] = true;
  }

  testMouseLeave(event, index, group) {
    this.showCaseDesc[group + index] = false;
  }

  private _filterGroup(value: string): any {
    if (value) {
      return this.allCases
        .map(group => ({ label: group.label, cases: _filter(group.cases, value) }))
        .filter(group => group.cases.length > 0);
    }

    return this.allCases;
  }

}