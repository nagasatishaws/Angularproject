/**
 * Author - Lohit
 * Version - 1.1
 * Create date - 19 oct 2019
 */

import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { AlertService } from "src/app/services/alert.service";
import { CaseserviceService } from "src/app/services/caseservice.service";
import { VariablesService } from "src/app/variables.service";
import { TokenService } from "src/app/services/token.service";
import { OrderPipe } from "ngx-order-pipe";
import { DatePipe } from '@angular/common';


@Component({
  selector: "app-reviewcase",
  templateUrl: "./reviewcase.component.html",
  styleUrls: ["./reviewcase.component.scss"]
})
export class ReviewcaseComponent implements OnInit {
  public nodata = {
    emptyMessage: ""
  };
  public caseList: any = [];
  public assignFlag: boolean = true;
  public assignCase: any = [];
  public create: boolean = false;
  public update: boolean = false;

  // public sortBy: string = "";
  public sortLabels: Array<Object> = [
    { name: "Seriousness", key: "seriousness" },
    { name: "Drug Name", key: "drugName" },
    { name: "Deadline", key: "deadline" },
    { name: "Create Date", key: "createdTime" }
  ];
  public sortLabelValue: string = "";
  public sortedList = [];
  public reverse: boolean = true;
  public clearButtonFlag: boolean = false;

  public filterFlag: boolean = true;
  public filterData = [];

  public finalFilter = [];

  public filters = [];
  public filterDateFrom;
  public filterDateTo;
  public filterDateMax = new Date();
  public filterItems = {};
  public matClickArgs: Number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private caseserviceService: CaseserviceService,
    private alertService: AlertService,
    private variablesService: VariablesService,
    private tokenService: TokenService,
    public orderPipe: OrderPipe,
    private datePipe: DatePipe
  ) {
    this.nodata.emptyMessage = "No Case Data";
    this.listCase({});
  }

  ngOnInit() {
    this.variablesService.loginData.subscribe((res: any) => {
      // console.log("sidebar----", res);
      //this.defaultMenu = [];
      if (res) {
        this.setPermissions(res);
      } else {
        let data = this.tokenService.getToken();
        //console.log("data---", data);

        this.setPermissions(data);
      }
    });

    this.caseserviceService.getFilterNames().subscribe(result => {
      if (result["data"].length > 0) {
        this.filterData = result["data"];
      }
    });
  }

  listCase(data) {
    this.caseList = [];
    this.caseserviceService.listCase(data).subscribe((res: any) => {
      if (res.statusCode === 200 || res.statusCode === "200") {
        this.caseList = res.data;
        // this.caseList.forEach(caseObj => {
        //   caseObj["deadline"] = this.randomNumber();
        // });
        this.sortedList = this.orderPipe.transform(this.caseList, "drugName");
      }
    });
  }

  formatToDate(date) {
    if (date === "" || date === undefined) {
      return "";
    } else {
      let formatedDate = this.datePipe.transform(new Date(date), 'shortDate');
      return formatedDate;
    }
    // 2020-03-30T18:24:41.811Z
    // if (new Date(date)) {
    //   let formatDate = new Date(date);
    //   let year = formatDate.getFullYear();
    //   let month = formatDate.getMonth() + 1;
    //   let day = formatDate.getDate();
    //   return year + "-" + month + "-" + day;
    // }
    // if (Array.isArray(date)) {
    //   console.log("Date to check: ", date);
    //   // date = new Date(date)
    // } else {
    //   if (date) date = new Date(date.split(" ")[0]);
    //   console.log("Date to check2: ", date.split(" ")[0]);
    // }
    // return new Date(date);
  }

  assignToMe() {
    this.caseserviceService
      .assignCaseToUser({ caseId: this.assignCase })
      .subscribe(
        (res: any) => {
          if (res.statusCode === 200 || res.statusCode === "200") {
            this.alertService.success("", res.message);
            this.assignCase = [];
            this.assignFlag = true;
          } else {
            this.alertService.error("", res.message);
          }
        },
        err => {
          this.alertService.error("", err.error.message);
        }
      );
  }

  selectCase(e, id) {
    if (e.checked) {
      this.assignCase.push(this.caseList[id].caseId);
    } else {
      let indexes = this.assignCase.indexOf(id);

      // console.log("indexess---", indexes);
      this.assignCase.splice(indexes, 1);
    }

    if (this.assignCase.length > 0) {
      this.assignFlag = false;
    } else {
      this.assignFlag = true;
    }

    // console.log("assignCase---", this.assignCase);
  }

  matClick(arg) {
    this.matClickArgs = arg.index;

    //console.log(arg);
    this.filterItems["requestingService"] = this.filterItems["source"];
    if (this.matClickArgs === 0) {
      this.nodata.emptyMessage = "No Case Data";
      if (this.filterItems["myCase"]) delete this.filterItems["myCase"];

      this.listCase(this.filterItems);
    } else {
      this.assignCase = [];
      this.assignFlag = true;
      this.nodata.emptyMessage = "No Case Data";
      this.filterItems["myCase"] = true;
      this.listCase(this.filterItems);
    }
  }

  randomNumber() {
    return Math.floor(5 + Math.random() * 10);
  }

  setPermissions(data) {
    if (data) {
      data.roleData.forEach(element => {
        if (element.moduleName === "review_case") {
          if (element.privilege[0] === 1) {
            this.create = true;
          }

          if (element.privilege[2] === 1) {
            this.update = true;
          }
        }
      });
    }
  }

  setOrder(value: string) {
    if (this.sortLabelValue === value) {
      this.reverse = !this.reverse;
    }

    this.sortLabelValue = value;
  }

  displayfilter(arg) {
    this.filterFlag = arg;
  }

  filterItem(type, event, eventvalue) {
    if (this.filters.indexOf(eventvalue) === -1) {
      if (this.filterItems[type]) {
        this.filterItems[type].push(eventvalue);
      } else {
        this.filterItems[type] = [];

        this.filterItems[type].push(eventvalue);
      }

      this.filters.push(eventvalue);
    } else {
      let index = this.filters.indexOf(eventvalue);
      this.filters.splice(index, 1);

      if (this.filterItems[type].indexOf(eventvalue) !== -1)
        this.filterItems[type].splice(
          this.filterItems[type].indexOf(eventvalue),
          1
        );
    }

    if (this.filters.length > 0) {
      this.clearButtonFlag = true;
    } else {
      this.clearButtonFlag = false;
    }
  }

  remove(filter): void {
    let flag = true;
    const index = this.filters.indexOf(filter);
    if (index >= 0) {
      this.filters.splice(index, 1);
      if (this.filters.length == 0) {
        this.clearButtonFlag = false;
      } else {
        this.clearButtonFlag = true;
      }
    }
    for (var key in this.filterItems) {
      let indexes = this.filterItems[key].indexOf(filter);
      if (indexes === -1) continue;
      this.filterItems[key].splice(indexes, 1);
    }
  }

  clearFilter() {
    this.filters = [];
    this.filterItems = {};
    if (this.filters.length == 0) {
      this.clearButtonFlag = false;
    } else {
      this.clearButtonFlag = true;
    }
  }

  searchCases() {
    // console.log("Filter items:: ", this.filterItems);
    this.filterItems["startDate"] = this.filterDateFrom;
    this.filterItems["endDate"] = this.filterDateTo;
    this.filterItems["requestingService"] = this.filterItems["source"];

    this.listCase(this.filterItems);
  }

  clearCases() {
    this.filters = [];
    this.filterItems = {};
    this.filterDateFrom = null;
    this.filterDateTo = null;
    this.finalFilter = [];

    if (this.matClickArgs === 0) {
      this.listCase({});
    } else {
      this.listCase({ myCase: true });
    }
  }
}
