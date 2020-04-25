import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-code-dict-vers',
  templateUrl: './code-dict-vers.component.html',
  styleUrls: ['./code-dict-vers.component.scss']
})
export class CodeDictVersComponent implements OnInit {

  // Property Declarations
  @Input('externalQuestion') public externalQuestion: any = {};
  @Output() codeDictVersForm = new EventEmitter();
  public selectForm: FormGroup;

  constructor() {
    this.selectForm = new FormGroup({
      code: new FormControl("", [Validators.required]),
      dictionary: new FormControl("", [Validators.required]),
      version: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() { }

  addItem() {
    this.codeDictVersForm.emit(this.selectForm.value);
  }
}
