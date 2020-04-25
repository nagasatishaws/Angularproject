import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ae-signals',
  templateUrl: './ae-signals.component.html',
  styleUrls: ['./ae-signals.component.scss']
})
export class AeSignalsComponent implements OnInit {
  public stepper = 1;
  public aeSigAlertsFlag: boolean = false;
  public aeSigCasetrendsFlag: boolean = false;
  public aeSigActionCatalogsFlag: boolean = false;
  public aeSigNarrativeFlag: boolean = false;
  public drugSelected: boolean = true;

  constructor() {
    this.aeSigAlertsFlag = true;
  }

  ngOnInit() {
  }

  aeSigAlerts() {
    this.aeSigAlertsFlag = true;
    this.aeSigCasetrendsFlag = false;
    this.aeSigActionCatalogsFlag = false;
    this.aeSigNarrativeFlag = false;
  }
  aeSigCasetrends() {
    this.aeSigAlertsFlag = false;
    this.aeSigCasetrendsFlag = true;
    this.aeSigActionCatalogsFlag = false;
    this.aeSigNarrativeFlag = false;
  }
  aeSigActionCatalogs() {
    this.aeSigAlertsFlag = false;
    this.aeSigCasetrendsFlag = false;
    this.aeSigActionCatalogsFlag = true;
    this.aeSigNarrativeFlag = false;
  }
  aeSigNarrative() {
    this.aeSigAlertsFlag = false;
    this.aeSigCasetrendsFlag = false;
    this.aeSigActionCatalogsFlag = false;
    this.aeSigNarrativeFlag = true;
  }
  assignDrugSelect(event) {
    // console.log(event);
    this.drugSelected = !event;
  }

}
