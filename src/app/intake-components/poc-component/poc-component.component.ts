import { Component, OnInit, Input, AfterViewChecked, AfterViewInit } from '@angular/core';
import { SuperAdminService } from 'src/app/services/super-admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { CaseserviceService } from 'src/app/services/caseservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poc-component',
  templateUrl: './poc-component.component.html',
  styleUrls: ['./poc-component.component.scss']
})
export class PocComponentComponent implements OnInit, AfterViewInit {
  @Input('analysisData') analysisData: any;
  @Input('eventDescription') eventDescription: any;
  @Input('narrative') narrative: any;

  public priority: any = "";
  public deadline: number;
  public deadlineUnits: string = "days";

  public nerMappedData: any;

  constructor(
    private router: Router,
    private caseserviceService: CaseserviceService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.nerMappedData = Object.assign({}, this.analysisData["nerMappedData"]);

  }

  ngAfterViewInit() {
    // console.log("analysisData::::: ", this.analysisData);
  }

  createCase() {
    this.nerMappedData.suspectProduct.drug.drugList[0].indication = this.nerMappedData.suspectProduct.drug.drugList[0].indication.split(',');
    this.nerMappedData.narrative.narrative = this.narrative;
    // console.log("Create case with : ", this.nerMappedData);
    let formData = new FormData();
    formData.append('priority', this.priority);
    formData.append('deadline', this.deadline.toLocaleString());
    formData.append('deadlineUnits', this.deadlineUnits);
    formData.append('eventDescription', this.eventDescription);
    formData.append('mappedObj', JSON.stringify(this.nerMappedData));
    formData.append('fileType', JSON.stringify({}));

    this.caseserviceService.createCaseTypeIn(formData).subscribe((resp: any) => {
      if (resp.statusCode === "200" || resp.statusCode === 200) {
        this.alertService.success("", resp.message.message || "Case created successfully");
        this.priority = "";
        this.deadline = 0;
        this.eventDescription = "";
        this.router.navigate(['/mainlayout/reviewcase']);
      }
    }, e => {
      this.alertService.error("", e.error.message || "Error while creating case");
    });
  }

}