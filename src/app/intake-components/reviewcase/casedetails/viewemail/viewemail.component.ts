/**
* Author - Biplab
* Version - 1.0
* Create date - 19 oct 2019
*/


import { Component, OnInit, Optional, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CasedetailsComponent } from "../casedetails.component";

@Component({
  selector: "app-viewemail",
  templateUrl: "./viewemail.component.html",
  styleUrls: ["./viewemail.component.scss"]
})
export class ViewemailComponent implements OnInit {
  constructor(
    public dialog: MatDialogRef<CasedetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
}
