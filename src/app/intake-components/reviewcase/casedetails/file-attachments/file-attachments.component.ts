import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-file-attachments',
  templateUrl: './file-attachments.component.html',
  styleUrls: ['./file-attachments.component.scss']
})
export class FileAttachmentsComponent implements OnInit {
  @Input() caseId: string;
  @Input() assignflag: boolean;
  @Input() data: any;

  public uploader: FileUploader = null;
  public hasBaseDropZoneOver: boolean = false;

  constructor() { }

  ngOnInit() {
    this.fileUpload();
  }

  fileUpload() {
    this.uploader = new FileUploader({
      url: "",
      method: "POST",
      disableMultipart: false
    });
    console.log("this.uploader.queue: ", this.uploader.queue);
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public onFileSelected(event: EventEmitter<File[]>) {
  }

}
