import { Component, OnInit } from '@angular/core';
import { CaseserviceService } from 'src/app/services/caseservice.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-line-listing',
  templateUrl: './line-listing.component.html',
  styleUrls: ['./line-listing.component.scss']
})
export class LineListingComponent implements OnInit {
  public drugName: string = "";
  public startTime: string = "";
  public endTime: string = "";

  constructor(
    private caseserviceService: CaseserviceService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  getLineListingReport() {
    let data = {
      drugName: this.drugName,
      startDate: this.startTime,
      endDate: this.endTime
    }
    this.caseserviceService.lineListingReport(data).subscribe(
      data => {
        let blob = new Blob([data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "LineListing-" + this.drugName + ".xlsx";
        a.click();
      },
      err => {
        console.log(err);
        this.alertService.error("", err.error.message || "Error while generating Line Listing Report");
      }
    );
  }

}
