// Import Declcarations
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-context-mapping-name',
  templateUrl: './context-mapping-name.component.html',
  styleUrls: ['./context-mapping-name.component.scss']
})
export class ContextMappingNameComponent implements OnInit {

  // Property Declarations
  @Output() contextMappingNameForm = new EventEmitter();
  public selectForm: FormGroup;

  constructor() {
    this.selectForm = new FormGroup({
      context: new FormControl("", [Validators.required]),
      mappingExpression: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {}

  addItem() {
    this.contextMappingNameForm.emit(this.selectForm.value);
    this.selectForm.reset();
  }
}
