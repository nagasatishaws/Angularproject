import { Component, OnInit, Inject, Optional } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { AlertService } from 'src/app/services/alert.service';
import { SuperAdminService } from 'src/app/services/super-admin.service';
import { CaserulesComponent } from '../caserules.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { addRule } from 'src/app/intake-models/formmodel';
import { CaseserviceService } from 'src/app/services/caseservice.service';

@Component({
  selector: 'app-addcaserules',
  templateUrl: './addcaserules.component.html',
  styleUrls: ['./addcaserules.component.scss']
})
export class AddcaserulesComponent implements OnInit {
  public form: FormGroup;
  public ruledata: addRule = new addRule();
  public buttonFlag: boolean = true;
  public sourceList = [
    {
      source: 'Mail box',
      value: 'email-service'
    },
    {
      source: 'File Upload',
      value: 'ui-service'
    }
  ];

  public seriousnessList = ["Patient died", "Involved or prolonged inpatient hospitalization",
    "Involved persistence or significant disability or incapacity",
    "Life threatening", "Congenital Anomaly", "Others"];

  public formTypeList = [
    {
      formType: 'CIOMS',
      value: 'CIOMS'
    },
    {
      formType: 'MedWatch',
      value: 'MEDWATCH'
    },
    {
      formType: 'SAE',
      value: 'SAE'
    }
  ]
  public priorityList = [
    {
      priority: 'High Priority',
      value: 'high'
    },
    {
      priority: 'Medium Priority',
      value: 'medium'
    },
    {
      priority: 'Low Priority',
      value: 'low'
    }
  ]

  constructor(
    private tokenService: TokenService,
    private alertService: AlertService,
    private superAdminService: SuperAdminService,
    private caseService: CaseserviceService,
    public dialog: MatDialogRef<CaserulesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public getdata: any
  ) {
    this.form = new FormGroup({
      ruleName: new FormControl("", [
        Validators.required,
        Validators.maxLength(32)
      ]),
      seriousness: new FormControl("", [
        Validators.required
      ]),
      source: new FormControl("", [
        Validators.required
      ]),
      formType: new FormControl("", [
        Validators.required
      ]),
      deadline: new FormControl("", [
        Validators.required
      ]),
      priority: new FormControl("", [
        Validators.required
      ])
    });

    // this.superAdminService.getSeverity({}).subscribe(res => {
    //   if (res.statusCode === 200 && res["data"] && res["data"].length > 0) {
    //     this.seriousnessList = res["data"];
    //   }
    // });

    if (this.getdata) {
      this.ruledata.ruleName = this.getdata.ruleName;
      this.ruledata.source = this.getdata.source;
      this.ruledata.seriousness = this.getdata.seriousness;
      this.ruledata.deadline = this.getdata.deadline;
      this.ruledata.formType = this.getdata.formType;
      this.ruledata.priority = this.getdata.priority;

      this.buttonFlag = false;
    } else {
      this.buttonFlag = true;
    }
  }

  ngOnInit() {
  }

  onFormSubmit() {
    this.caseService.addRule(this.ruledata).subscribe(
      (res: any) => {
        if (res.statusCode === 200) {
          this.alertService.success("", res.message);
          this.dialog.close("cancel");
        } else {
          this.alertService.error("", res.message);
          this.dialog.close("cancel");
        }
      },
      err => {
        this.alertService.error("", err.error.message);
      }
    );
  }

  onFormUpdate() {
    this.ruledata["ruleId"] = this.getdata.ruleId;
    this.caseService.updateRule(this.ruledata).subscribe(
      (res: any) => {
        if (res.statusCode === 200) {
          this.alertService.success("", res.message);
          this.dialog.close("cancel");
        } else {
          this.alertService.error("", res.message);
          this.dialog.close("cancel");
        }
      },
      err => {
        this.alertService.error("", err.error.message);
      }
    );
  }

  errorMessage(field) {
    return this.tokenService.errorMessageForMaxLength(this.form, field);
  }

}
