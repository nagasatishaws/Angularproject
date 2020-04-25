import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-action-history',
  templateUrl: './action-history.component.html',
  styleUrls: ['./action-history.component.scss']
})
export class ActionHistoryComponent implements OnInit {
  public nodata: any = {
    emptyMessage: 'No action history'
  }

  constructor(public dialogRef: MatDialogRef<ActionHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  modalSubmit() {
    this.dialogRef.close(this.data);
  }

  modalCancel() {
    this.dialogRef.close(undefined);
  }

}
