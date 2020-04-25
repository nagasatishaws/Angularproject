/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/



import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import * as SecureLS from "secure-ls";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";
var ls = new SecureLS({
  encodingType: "rc4",
  isCompression: false,
  encryptionSecret: "in$#@!!@#$"
});

@Injectable({
  providedIn: "root"
})
export class TokenService {
  constructor(private router: Router) {}

  getToken() {
    try {
      var userData = ls.get("intake") ? ls.get("intake") : "";
    } catch (error) {
      //console.log("error----", error);
      //this.removeToken("intake");
      this.router.navigate(["/auth/signin"]);
    }

    //console.log("servicee---", userData);
    if (userData) {
      if (userData) {
        return userData;
      } else {
        return "";
      }
    } else {
      return userData;
    }
  }

  setToken(data) {
    ls.set("intake", data);
  }

  removeToken(key) {
    ls.remove(key);
  }

  /**
   *
   * @param data pass the array
   * @param id this the key for matching the element
   *  * @param key keyname for comparing
   */
  getElement(data, id, key) {
    let arr;
    data.forEach(element => {
      if (element[key] === id) {
        arr = element;
      }
    });
    return arr;
  }

  /**
   * this is for showing error messages in form
   * @param form form object
   * @param field error field name
   */
  setFormError(form, field) {
    return form.get(field).hasError("required") ? "Field is required" : "";
  }

  /**
   * this is for showing error messages in form
   * @param form form object
   * @param field error field name
   */
  errorMessageForMaxLength(form, field) {
    //console.log("field---", form.get(field));
    if (form.get(field).hasError("required")) {
      return "Field is required";
    } else {
      if (form.get(field).status === "VALID") {
        return "";
      } else {
        return "Maximum length is 32 characters";
      }
    }

    //return this.tokenService.setFormError(this.form, field);
  }

  /**
   *
   * @param date date string
   * formatting the date in the format of dd/mm/yyyy hh:mm:ss
   */
  dateFormat(date) {
    let dateFormats = new Date(date);
    let month = dateFormats.getMonth() + 1;
    let minutes =
      dateFormats.getMinutes() <= 9
        ? dateFormats.getMinutes() + "0"
        : dateFormats.getMinutes();
    let seconds =
      dateFormats.getSeconds() <= 9
        ? dateFormats.getSeconds() + "0"
        : dateFormats.getSeconds();
    let hours =
      dateFormats.getHours() <= 9
        ? dateFormats.getHours() + "0"
        : dateFormats.getHours();
    return (
      dateFormats.getDate() +
      "/" +
      month +
      "/" +
      dateFormats.getFullYear() +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"]
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
