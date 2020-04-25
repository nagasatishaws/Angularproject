import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CaseserviceService } from "src/app/services/caseservice.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-duplicatecheck",
  templateUrl: "./duplicatecheck.component.html",
  styleUrls: ["./duplicatecheck.component.scss"]
})
export class DuplicatecheckComponent implements OnInit {
  public routepath: any;
  public caseList: any = [];
  constructor(
    private route: ActivatedRoute,
    private caseserviceService: CaseserviceService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => (this.routepath = params));
    this.caseserviceService
      .duplicateCase({ caseId: this.routepath.id })
      .subscribe((res: any) => {
        if (res.statusCode === "200") {
          this.caseList = res.data;
        }
      });
  }

  formatToDate(date) {
    if (date === "" || date === undefined) {
      return "";
    } else {
      let formatedDate = this.datePipe.transform(new Date(date), 'shortDate');
      return formatedDate;
    }
  }
}
