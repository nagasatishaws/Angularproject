/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/


import { TokenService } from "./token.service";
import { log } from "util";
import { Router } from "@angular/router";
import { DialogService } from "./dialog.service";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private dialogService: DialogService,
    private tokenService: TokenService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401 || err.status === 403) {
          // auto logout if 401 response returned from api
          this.dialogService
            .openOkDialog("", "session expired")
            .afterClosed()
            .subscribe((result: any) => {
              if (result == "Submit") {
                this.dialogService.closeDialog();
                this.tokenService.removeToken("intake");
                //this.formService.currentUserSubject.next(null);
                this.router.navigate(["auth/signin"]);
              }
            });
        }

        return throwError(err);
      })
    );
  }
}
