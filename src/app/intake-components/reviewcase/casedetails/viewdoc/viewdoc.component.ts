import { Component, OnInit, Optional, Inject, EventEmitter } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CasedetailsComponent } from "../casedetails.component";
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: "app-viewdoc",
  templateUrl: "./viewdoc.component.html",
  styleUrls: ["./viewdoc.component.scss"]
})
export class ViewdocComponent implements OnInit {
  public additionalFlag: boolean = false;
  displayedColumns: string[] = ['fileName', 'fileSourceId', 'fileType'];

  public uploader: FileUploader = null;
  public hasBaseDropZoneOver: boolean = false;
  public showFileUpload: boolean = false;

  constructor(
    public dialog: MatDialogRef<CasedetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log("File attachment input: ", this.data);
  }

  ngOnInit() {
    this.fileUpload();
    this.showFileUpload = this.data.createCaseFlag;
  }

  showMoreToggle(action) {
    this.additionalFlag = action;
  }

  fileUpload() {
    this.uploader = new FileUploader({
      url: "",
      method: "POST",
      disableMultipart: false
    });

    if (this.data.cacheFiles && this.data.cacheFiles.length) {
      this.uploader.queue.push(...this.data.cacheFiles);
    }
    // console.log("this.uploader.queue: ", this.uploader.queue);
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public onFileSelected(event: EventEmitter<File[]>) {
    // for (let file of this.uploader.queue) {
    //   file.file['fileType'] = "Case Narratives";
    // }
    // console.log("EVENT::", this.uploader.queue);
  }

  sendFileAttachments() {
    // console.log("this.uploader: ", this.uploader);

    // console.log("showFiles: ", typeof this.uploader.queue);
    this.dialog.close(this.uploader.queue);
  }

  fileTypeSelect(event, index) {
    this.uploader.queue[index].file.rawFile['fileType'] = event.target.value;
    // console.log("UPLOADER:: ", this.uploader.queue);
  }

}