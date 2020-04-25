import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ae-sig-casetrends',
  templateUrl: './ae-sig-casetrends.component.html',
  styleUrls: ['./ae-sig-casetrends.component.scss']
})
export class AeSigCasetrendsComponent implements OnInit {
  public totalCasesData: any = [
    {
      data: [148814, 7712, 2189, 548, 932],
      label: "Total cases"
    }
  ];
  public totalCasesLabels: any = ["Cummulative", "Alerts over last year", "Alerts over last 12 weeks", "Previous alert", "Current alert"];
  public detectedCasesData: any = [
    {
      data: [511, 21, 7, 0, 6],
      label: "Detected cases"
    }
  ];
  public perDetectedCasesData: any = [
    {
      data: [0.34, 0.27, 0.32, 0, 0.64],
      label: "% of Detected cases"
    }
  ]
  // public paeByFormulationData: any = [
  //   {
  //     data: [148814, 511, 0.34],
  //     label: "Cummulative"
  //   },
  //   {
  //     data: [7712, 21, 0.27],
  //     label: "Alerts over last year"
  //   },
  //   {
  //     data: [2189, 7, 0.32],
  //     label: "Alerts over last 12 weeks"
  //   },
  //   {
  //     data: [548, 0, 0],
  //     label: "Previous alerts"
  //   },
  //   {
  //     data: [932, 6, 0.64],
  //     label: "Current alerts"
  //   }
  // ];
  // public paeByFormulationLabels: any = ["Total cases", "Detected cases", "% Detected cases"];

  constructor() { }

  ngOnInit() {
  }

}
