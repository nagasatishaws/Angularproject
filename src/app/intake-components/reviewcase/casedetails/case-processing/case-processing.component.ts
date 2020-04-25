import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-case-processing',
  templateUrl: './case-processing.component.html',
  styleUrls: ['./case-processing.component.scss']
})
export class CaseProcessingComponent implements OnInit {
  @Input() caseId: string;
  @Input() assignflag: boolean;

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
