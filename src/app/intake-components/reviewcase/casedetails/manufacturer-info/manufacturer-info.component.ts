import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-manufacturer-info',
  templateUrl: './manufacturer-info.component.html',
  styleUrls: ['./manufacturer-info.component.scss']
})
export class ManufacturerInfoComponent implements OnInit {
  @Input() caseId: string;
  @Input() assignflag: boolean;
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
