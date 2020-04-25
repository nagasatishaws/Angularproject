/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/


import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-status",
  templateUrl: "./status.component.html",
  styleUrls: ["./status.component.scss"]
})
export class StatusComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<StatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
  modalSubmit() {
    this.dialogRef.close("Submit");
  }

  modalCancel() {
    this.dialogRef.close("Cancel");
  }

  modalChangeMode() {
    this.dialogRef.close("Change-Mode");
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
