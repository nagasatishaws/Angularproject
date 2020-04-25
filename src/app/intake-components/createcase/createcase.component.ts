/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 25 september 19
*/


import { Component, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { FileLikeObject, FileUploader } from "ng2-file-upload";
import { FormControl, FormGroup } from "@angular/forms";

import { AlertService } from "../../services/alert.service";
import { CaseserviceService } from "src/app/services/caseservice.service";
import { TokenService } from "src/app/services/token.service";
import { environment } from "src/environments/environment";

import { Subscription, timer, pipe } from "rxjs";
import { switchMap } from "rxjs/operators";
import { element } from "protractor";
import { Router } from '@angular/router';

// const URL = '/api/';

@Component({
  selector: "app-createcase",
  templateUrl: "./createcase.component.html",
  styleUrls: ["./createcase.component.scss"]
})
export class CreatecaseComponent implements OnInit, OnDestroy {
  public nodata = {
    emptyMessage: ""
  };
  subscription: Subscription;
  public uploader: FileUploader = null;
  public message: any = "";
  public processList: any = [];

  public btnflag: boolean = true;
  public docformflag: boolean = false;
  public e2bformflag: boolean = false;
  public description: any = "";
  public apiUrl = environment.dpaServiceUrl;
  public body: any = "";
  public subject: any = "";
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  public parseFlag: boolean = true;
  public flag: boolean = false;
  public form: FormGroup;

  public filedoc: boolean = false;
  public doc: boolean = false;
  public file: boolean = false;
  public subscribeFlag: boolean = false;

  public narrative: boolean = false;
  public analysisData: any;
  public showPocComp: boolean = false;

  public colorMaster = {
    age: {
      tagName: "Age",
      tagTextClass: "highlight-cat-age",
      tagBgClass: "highlight-age"
    },
    sex: {
      tagName: "Sex",
      tagTextClass: "highlight-cat-sex",
      tagBgClass: "highlight-sex"
    },
    SEX: {
      tagName: "Sex",
      tagTextClass: "highlight-cat-sex",
      tagBgClass: "highlight-sex"
    },
    weight: {
      tagName: "Weight",
      tagTextClass: "highlight-cat-weight",
      tagBgClass: "highlight-weight"
    },
    race: {
      tagName: "Race",
      tagTextClass: "highlight-cat-race",
      tagBgClass: "highlight-race"
    },
    drug: {
      tagName: "Suspect drug",
      tagTextClass: "highlight-cat-suspect-drug",
      tagBgClass: "highlight-suspect-drug"
    },
    dosage: {
      tagName: "Dosage",
      tagTextClass: "highlight-cat-dosage",
      tagBgClass: "highlight-dosage"
    },
    date: {
      tagName: "Date",
      tagTextClass: "highlight-cat-date",
      tagBgClass: "highlight-date"
    },
    seriousness: {
      tagName: "Seriousness",
      tagTextClass: "highlight-cat-seriousness",
      tagBgClass: "highlight-seriousness"
    },
    "Adverse Reaction": {
      tagName: "Adverse Events",
      tagTextClass: "highlight-cat-adverse-events",
      tagBgClass: "highlight-adverse-events"
    },
    "Indication/Adverse Reaction": {
      tagName: "Indication/Adverse Reaction",
      tagTextClass: "highlight-cat-adverse-events",
      tagBgClass: "highlight-adverse-events"
    },
    "Indication": {
      tagName: "Indication",
      tagTextClass: "highlight-cat-adverse-events",
      tagBgClass: "highlight-adverse-events"
    },
    "dosage_form_oral": {
      tagName: "Dosage Form Oral",
      tagTextClass: "highlight-cat-dosage-form",
      tagBgClass: "highlight-dosage-form"
    },
    "seriousness_criteria": {
      tagName: "Seriousness Criteria",
      tagTextClass: "highlight-cat-adverse-events",
      tagBgClass: "highlight-adverse-events"
    },
  }

  constructor(
    private alertService: AlertService,
    private tokenService: TokenService,
    private caseservice: CaseserviceService,
    private router: Router
  ) {
    this.nodata.emptyMessage = "No Case Data";
    this.listprocessref();
  }

  fileUpload() {
    //console.log("qwqwqw---", this.uploader);

    this.uploader = new FileUploader({
      url: "",
      method: "POST",
      disableMultipart: false
      // autoUpload : false,
      // removeAfterUpload : true,
      //itemAlias: "file"
    });

    //console.log(this.apiUrl);

    (this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      if (response) {
        // console.log("item", item);
        // console.log(response);
        // console.log(status);
        let message = JSON.parse(response);
        //this.alertService.success("", message.message);
        if (status === 200) {
          this.alertService.success("", message.message);
          this.back();
        } else {
          this.alertService.error("", message.message);
          this.back();
        }
      }
    }),
      err => {
        this.alertService.error("", err.error.message);
        this.back();
      };

    this.uploader.onAfterAddingFile = file => {
      //console.log("file--", file);
      file.withCredentials = false;
      //file['fileType'] = '';

      file["url"] = this.apiUrl + "/v1/mp/UI/init";
    };

    this.uploader.onBeforeUploadItem = (fileItem: any) => {
      //console.log("fileItem--", fileItem);
      //fileItem.withCredentials = true;
      if (!this.validation("upload")) {
        this.alertService.warning("", this.message);
        // return;
      } else {
        fileItem["url"] = this.apiUrl + "/v1/mp/UI/init";
      }
    };

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      let data = {
        requestingService: "ui-service", //note comma separating key and value
        solutionName: "PVCI",
        subject: this.subject,
        body: this.body,
        token: this.tokenService.getToken().jwtToken
      };

      // console.log(
      //   "uploader.getNotUploadedItems()---",
      //   this.uploader.getNotUploadedItems()
      // );

      for (const item of this.uploader.getNotUploadedItems()) {
        if (typeof item._file.size !== "number") {
          throw new TypeError("The file specified is no longer valid");
        }

        //files.push(item._file, item.file.name);
        form.append("files", item._file, item.file.name);
      }
      //console.log("file---",file)
      //form.append("files", files);
      //console.log("form---", form);
      form.append("input", JSON.stringify(data)); //note comma separating key and value
    };

    //console.log("this.uploader.queue----", this.uploader.queue);
  }

  /**
   * creating case
   */
  createCase() {
    var valid;
    if (this.uploader.getNotUploadedItems().length > 0) {
      valid = true;
    } else {
      valid = this.validation("createcase");
    }
    if (!valid) {
      this.alertService.warning("", this.message);
    } else {
      if (this.uploader.getNotUploadedItems().length > 0) {
        this.uploader.uploadAll();
      } else {
        let formData = new FormData();
        //console.log(this.form);
        //formData.set("content-type", "multipart/form-data");
        let data = {
          requestingService: "ui-service", //note comma separating key and value
          solutionName: "PVCI",
          subject: this.subject,
          body: this.body,
          token: this.tokenService.getToken().jwtToken
        };
        //formData.append("files", "");
        formData.append("input", JSON.stringify(data));

        //console.log("formData---", formData);

        this.caseservice.CreateCase(formData).subscribe(
          (res: any) => {
            this.alertService.success("", res.message);
            this.back();
          },
          err => {
            this.alertService.error("", err.error.message);
            this.back();
          }
        );
      }
    }
  }

  ngOnInit() {
    this.fileUpload();

    /**
     * calling the api in every 10 secs
     */
    // this.subscription = timer(0, 10000)
    //   .pipe(switchMap(() => this.caseservice.listProcessRef({})))
    //   .subscribe((res: any) => {
    //     if (res.statusCode === 200 || res.statusCode === "200") {
    //       this.processList = [];
    //       this.processList = res.data;
    //     }
    //   });
  }

  ngOnDestroy() {
    if (this.subscribeFlag) {
      this.subscribeFlag = false;
      this.subscription.unsubscribe();
    }
    //this.subscription.unsubscribe();
  }

  public validation(arg) {
    if (this.body !== "") {
      if (this.subject === "") {
        this.message = "Please enter subject";
        return false;
      } else {
        return true;
      }
    } else {
      if (arg === "upload") {
        return true;
      } else {
        this.message = "Please upload file";
        return false;
      }
    }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    this.checkUploadAllStatus();
  }

  checkUploadAllStatus() {
    // console.log("uploading-----");
    let count = 0;
    this.uploader.queue.map(e => {
      // if (this.checkEmptyNullUndefined(e["fileType"])) {
      //   count++;
      // }
    });

    // if (count == this.uploader.queue.length) {
    //   this.disableUploadAll = false;
    // } else {
    //   this.disableUploadAll = true;
    // }
  }

  docfunc(arg) {
    this.btnflag = false;
    this.docformflag = true;
    this.flag = false;
    this.uploader.queue = [];
    this.subject = "";
    this.body = "";
    if (arg === "both") {
      this.filedoc = true;
    } else if (arg === "file") {
      this.file = true;
    } else if (arg === "narative") {
      this.narrative = true;
      this.doc = true;
    }
    if (this.subscribeFlag) {
      this.subscribeFlag = false;
      this.subscription.unsubscribe();
    }
    //this.subscription.unsubscribe();

    //console.log(this.uploader.queue);
  }

  back() {
    this.docformflag = false;
    this.btnflag = true;
    this.e2bformflag = false;
    this.flag = false;
    this.uploader.queue = [];
    this.subject = "";
    this.body = "";
    this.doc = false;
    this.file = false;
    this.filedoc = false;
    this.narrative = false;
    this.showPocComp = false;
    if (this.subscribeFlag) {
      this.subscribeFlag = false;
      this.subscription.unsubscribe();
    }
    //this.listprocessref();
  }

  e2bfunc() {
    this.btnflag = false;
    this.e2bformflag = true;
    this.flag = false;
    this.uploader.queue = [];
    this.subject = "";
    this.body = "";
    if (this.subscribeFlag) {
      this.subscribeFlag = false;
      this.subscription.unsubscribe();
    }
    //this.subscription.unsubscribe();
  }

  caseTypeIn() {
    this.router.navigate(['/mainlayout/casedetails/', "unk"])
  }

  checkXml() {
    var sMyString = this.body;
    var oParser = new DOMParser();
    var xmlDoc = oParser.parseFromString(sMyString, "text/xml");
    if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
      this.parseFlag = true;
      let tag = xmlDoc.getElementsByTagName("parsererror")[0];
      this.alertService.error("", tag.getElementsByTagName("div")[0].innerHTML);
      //console.log(tag.getElementsByTagName("div")[0].innerHTML);
    } else {
      this.parseFlag = false;
      this.alertService.success("", "Parsed successfully");
    }
  }

  listprocessref() {
    this.caseservice.listProcessRef({}).subscribe((res: any) => {
      if (res.statusCode === 200 || res.statusCode === "200") {
        this.processList = res.data;
      }
    });
  }

  formatToDate(date) {
    if (date) date = new Date(date.split(" ")[0]);
    return date;
  }

  matClick(arg) {
    //console.log(arg);
    if (arg.index == 0) {
      if (this.subscribeFlag) {
        this.subscribeFlag = false;
        this.subscription.unsubscribe();
      }
    } else {
      this.listprocessref();
      this.subscribeFlag = true;
      this.subscription = timer(0, 10000)
        .pipe(switchMap(() => this.caseservice.listProcessRef({})))
        .subscribe((res: any) => {
          if (res.statusCode === 200 || res.statusCode === "200") {
            this.processList = [];
            this.processList = res.data;
          }
        });
    }
  }

  analyzeNarrative() {
    let nerAnalysisData = {
      text: this.body
    }
    this.caseservice.nerAnalysis(nerAnalysisData).subscribe(nerResp => {
      // console.log("NER Analysis:: ", nerResp);
      this.showPocComp = true;
      this.analysisData = Object.assign({}, nerResp);

      document.getElementById("newInputText").innerHTML = this.tagNerData(this.body, nerResp["response"]);
    });
  }

  clearNarrative() {
    this.showPocComp = false;
    document.getElementById("newInputText").innerHTML = "";
  }

  tagNerData(inputText, nerData) {
    let offset = 0;

    let sortedNer = nerData.sort((a, b) => {
      if (a.start && b.start && (a.start < b.start)) return -1
      return 0
    });

    console.log("Sorted NER response: ", sortedNer);


    // let finalText = inputText;
    for (let entity of sortedNer) {
      if (entity.start && entity.end) {
        entity.start += offset;
        entity.end += offset;

        let strToBeReplaced = inputText.substring(entity.start, entity.end + 1);
        // let strToBeReplaced = entity.field_value;
        let pre = "<span class=" + this.colorMaster[entity.field_name].tagBgClass + "> ";
        let post = "&nbsp<span class=" + this.colorMaster[entity.field_name].tagTextClass + ">" + this.colorMaster[entity.field_name].tagName + "</span>" + "</span>";
        let toBeReplacedBy = pre + strToBeReplaced + post;

        inputText = inputText.substr(0, entity.start) + toBeReplacedBy + inputText.substr(entity.end + 1, inputText.length);

        // console.log(inputText.substring(entity.start, entity.end));
        offset += (toBeReplacedBy.length - strToBeReplaced.length);
        // console.log(toBeReplacedBy, "\n\n\n");
        // finalText = finalText.replace(strToBeReplaced, toBeReplacedBy);
      }
    }

    console.log("\n\n\nFinal text:: ", inputText);
    return inputText;
  }

  // addTag(fieldName, fieldValue, inputText) {
  //   // console.log("Field name: ", fieldName)
  //   // console.log("Field value: ", fieldValue)
  //   let re = new RegExp(fieldValue, '');
  //   let replaceText = "<span class=" + this.colorMaster[fieldName].tagBgClass + "> " + fieldValue + "&nbsp<span class=" + this.colorMaster[fieldName].tagTextClass + ">" + this.colorMaster[fieldName].tagName + "</span>" + "</span>";
  //   let result = inputText.replace(re, replaceText);
  //   return inputText.replace(re, replaceText);
  // }

  /**
   * BACKUP NER TAGING CODE
   *
   * tagNerData(inputText, nerData) {
    // for (let tag of nerData) {
    //   inputText = this.addTag(tag.field_name, tag.field_value, inputText);
    // }
    let offset = 0;

    // let sortedNer = nerData.sort((a, b) => {
    //   if (a.start < b.start) return -1
    //   return 0
    // });

    let sortedNer = [
      {
        end: 5,
        field_name: "drug",
        field_value: "DMARD",
        start: 0
      },
      {
        end: 34,
        field_name: "SEX",
        field_value: "F",
        start: 29
      },
      {
        end: 48,
        field_name: "age",
        field_value: "48 years.",
        start: 40
      },
      {
        end: 252,
        field_name: "date",
        field_value: "2nd January 2018 through 11th January 2018",
        start: 210
      },
      {
        end: 297,
        field_name: "date",
        field_value: "12th January 2018",
        start: 280
      },
      {
        confidence: 96.27,
        end: 345,
        field_name: "Adverse Reaction",
        field_value: "dehydration",
        start: 333
      },
      {
        confidence: 98.8,
        end: 456,
        field_name: "Adverse Reaction",
        field_value: "fatigue",
        start: 449
      }
    ]

    // let finalText = inputText;
    for (let entity of sortedNer) {
      entity.start += offset;
      entity.end += offset;

      let strToBeReplaced = inputText.substring(entity.start, entity.end);
      let pre = "<span class=" + this.colorMaster[entity.field_name].tagBgClass + "> ";
      let post = "&nbsp<span class=" + this.colorMaster[entity.field_name].tagTextClass + ">" + this.colorMaster[entity.field_name].tagName + "</span>" + "</span>";
      let toBeReplacedBy = pre + strToBeReplaced + post;

      inputText = inputText.substr(0, entity.start) + toBeReplacedBy + inputText.substr(entity.end, inputText.length);

      // console.log(inputText.substring(entity.start, entity.end));
      offset += (toBeReplacedBy.length - strToBeReplaced.length);
      // console.log(toBeReplacedBy, "\n\n\n");
      // finalText = finalText.replace(strToBeReplaced, toBeReplacedBy);
    }

    console.log("\n\n\nFinal text:: ", inputText);
    return inputText;
  }
   */
}
