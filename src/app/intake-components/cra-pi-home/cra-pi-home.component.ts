import { Component, OnInit, ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { TitleCasePipe } from "@angular/common";
import { ClinicalService } from "../../services/clinical.service";

@Component({
  selector: "app-cra-pi-home",
  templateUrl: "./cra-pi-home.component.html",
  styleUrls: ["./cra-pi-home.component.scss"]
})
export class CraPiHomeComponent implements OnInit {
  countries: any = ["Asia", "Africa", "North America"];

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  public isselected = 0;
  public nodata = {
    emptyMessage: ""
  };
  rows = [];
  columns = [];
  public titleCase = new TitleCasePipe();
  filteredItems = [];
  siteGroups: any = [];
  siteGroupName: any = "";

  constructor(public clinicalService: ClinicalService) {
    this.nodata.emptyMessage = "No Sites Data";
  }

  ngOnInit() {
    this.clinicalService.getLocationGroups().subscribe(data => {
      this.siteGroups = data;
      this.showSites(0);
    });
  }

  onRowClick(data) { }

  showSites(index) {
    this.isselected = index;
    this.siteGroupName = this.siteGroups[index].name;
    this.filteredItems = this.siteGroups[index].studyLocations;
  }

  sort() { }

  toggle(data) { }

  storeData(data) {
    localStorage.removeItem("siteData");
    let siteData = { siteName: data.name, siteId: data.id };
    localStorage.setItem("siteData", JSON.stringify(siteData));
  }
}
