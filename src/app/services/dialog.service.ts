/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/


import { StatusComponent } from "../intake-components/modals/status/status.component";
import { MatDialog } from "@angular/material";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root"
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openconfirmDialog(statustitle, msg) {
    return this.dialog.open(StatusComponent, {
      width: "600px",
      height: "130px",
      disableClose: true,
      data: {
        statusText: msg,
        statusTitle: statustitle,
        showSubmit: true,
        showCancel: true,
        submitText: "Yes",
        cancelText: "No",
        changeMode: false,
        changeModeText: ""
      }
    });
  }
  openOkDialog(statustitle, msg) {
    return this.dialog.open(StatusComponent, {
      width: "600px",
      height: "130px",
      disableClose: true,
      data: {
        statusText: msg,
        statusTitle: statustitle,
        showSubmit: true,
        showCancel: false,
        submitText: "Ok",
        cancelText: "No",
        changeMode: false,
        changeModeText: ""
      }
    });
  }
  closeDialog() {
    return this.dialog.closeAll();
  }
}
