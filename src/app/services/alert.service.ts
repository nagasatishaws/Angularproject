/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/


import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [
  {
    type: "success",
    message: "This is an success alert"
  },
  {
    type: "info",
    message: "This is an info alert"
  },
  {
    type: "warning",
    message: "This is a warning alert"
  },
  {
    type: "danger",
    message: "This is a danger alert"
  },
  {
    type: "primary",
    message: "This is a primary alert"
  },
  {
    type: "dark",
    message: "This is a dark alert"
  }
];

@Injectable({
  providedIn: "root"
})
export class AlertService {
  alerts;
  alertCards;
  mainAlert = true;
  constructor(private toastr: ToastrService) {
    this.alerts = [...ALERTS];
    this.alertCards = [...ALERTS];
  }

  closeAlert(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
  closeAlertCard(alert: Alert) {
    this.alertCards.splice(this.alertCards.indexOf(alert), 1);
  }

  success(title, msg) {
    this.toastr.success(msg, "Success", { timeOut: 3000 });
  }
  warning(title, msg) {
    this.toastr.warning(msg, "Warning", { timeOut: 3000 });
  }
  info(title, msg) {
    this.toastr.info(msg, "Info", { timeOut: 3000 });
  }
  error(title, msg) {
    this.toastr.error(msg, "Error", { timeOut: 3000 });
  }

  successBar(title, msg) {
    this.toastr.success(msg, title, {
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    });
  }
  warningBar(title, msg) {
    this.toastr.warning(msg, title, {
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    });
  }
  infoBar(title, msg) {
    this.toastr.info(msg, title, {
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    });
  }
  errorBar(title, msg) {
    this.toastr.error(msg, title, {
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    });
  }
}
