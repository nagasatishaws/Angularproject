import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-medical-review',
  templateUrl: './medical-review.component.html',
  styleUrls: ['./medical-review.component.scss']
})
export class MedicalReviewComponent implements OnInit {
  @Input() caseId: string;
  @Input() assignflag: boolean;
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
