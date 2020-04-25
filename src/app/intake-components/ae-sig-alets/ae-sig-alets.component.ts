import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ae-sig-alets',
  templateUrl: './ae-sig-alets.component.html',
  styleUrls: ['./ae-sig-alets.component.scss']
})
export class AeSigAletsComponent implements OnInit {
  public showSearchResult: boolean = false;
  public showAlertInfo: boolean = false;
  @Output() drugClick = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  showResultTab(e) {
    if (e && (e['path'][0]['value'] === "Paracetamol" || e['path'][0]['value'] === "paracetamol")) {
      this.showSearchResult = true;
    }
  }

  drugClickEvent() {
    this.drugClick.emit(this.showAlertInfo);
  }
}
