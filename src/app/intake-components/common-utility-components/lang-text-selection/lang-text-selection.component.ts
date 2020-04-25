// Import Declarations
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lang-text-selection',
  templateUrl: './lang-text-selection.component.html',
  styleUrls: ['./lang-text-selection.component.scss']
})
export class LangTextSelectionComponent implements OnInit {

  // Property Delcarations
  @Input('selectionType') public selectionType: any[] = [];
  @Output() addSelection = new EventEmitter();
  public selectForm: FormGroup;

  constructor() {
    this.selectForm = new FormGroup({
      lang: new FormControl("", [Validators.required]),
      text: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]),
    });
  }

  ngOnInit() { }

  addItem() {
    this.addSelection.emit(this.selectForm.value);
    this.selectForm.reset();
  }

}
