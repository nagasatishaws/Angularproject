// Import Declarations
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Service Imports
import { StudyConfigCommonDataService } from '../../intake-services/study-config-common-data.service';

@Component({
  selector: 'app-create-item-group-reference',
  templateUrl: './create-item-group-reference.component.html',
  styleUrls: ['./create-item-group-reference.component.scss']
})
export class CreateItemGroupReferenceComponent implements OnInit {

  // Property Declarations
  @Input('createReference') createReference: any;
  @Input('exceptionConditionDefs') exceptionConditionDefs: any;
  @Input('methodDefs') methodDefs: any;
  @Output() addItem = new EventEmitter();
  public yesno: string[] = [];
  public display: boolean = false;

  constructor(private studyConfigCommonDataService: StudyConfigCommonDataService) {
    this.yesno = this.studyConfigCommonDataService.yesno;
    // console.log("@@:", this.createReference);
  }

  ngOnInit() {
    // console.log('Ref Comp:', this.createReference);
    // console.log('Ref Exp Cond:', this.exceptionConditionDefs);
    // console.log('Ref methodDefs:', this.methodDefs);
    this.display = true;
  }

  addCreatedReference() {
    this.addItem.emit(this.createReference);
  }

}
