// Dependency Inports
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent implements OnInit {

  // Property Declarations
  @Input('actionContents') actionContents : any[] = [];
  @Output() selectedAction = new EventEmitter();
  public display : boolean = false;

  constructor() {}

  ngOnInit() {
    this.display = true;
  }

  selectItem(title,content) {
    this.selectedAction.emit({ 'item_title' : title, 'content' : content });
  }

}
