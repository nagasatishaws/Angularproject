/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/


import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Router,
  RouteConfigLoadStart,
  ResolveStart,
  RouteConfigLoadEnd,
  ResolveEnd
} from '@angular/router';
import { NavigationService } from '../project-layout-services/navigation.service';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  moduleLoading: boolean;
  constructor(public navService: NavigationService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (
        event instanceof RouteConfigLoadStart ||
        event instanceof ResolveStart
      ) {
        this.moduleLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.moduleLoading = false;
      }
    });
  }
}
