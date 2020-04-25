import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-seriousness',
  templateUrl: './seriousness.component.html',
  styleUrls: ['./seriousness.component.scss']
})
export class SeriousnessComponent implements OnInit {
  @Input('caseId') caseId: string;
  @Input('assignflag') assignflag: boolean;
  @Input('data') data: any;

  constructor() { }

  ngOnInit() {
  }

}
