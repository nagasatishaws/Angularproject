/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/


import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router, private tokenService: TokenService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //const currentUser = this.formsService.currentUserValue;

    if (this.tokenService.getToken().jwtToken) {
      //this.router.navigate(["/mainlayout/"]);
      //console.log("this.tokenService.getToken()", this.tokenService.getToken());
      // logged in so return true
      return true;
    } else {
      this.router.navigate(["/auth/signin"]);
      return false;
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
