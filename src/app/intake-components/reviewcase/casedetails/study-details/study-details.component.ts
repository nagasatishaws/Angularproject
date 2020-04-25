import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-study-details',
  templateUrl: './study-details.component.html',
  styleUrls: ['./study-details.component.scss']
})
export class StudyDetailsComponent implements OnInit {
  @Input() caseId: string;
  @Input() assignflag: boolean;

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
