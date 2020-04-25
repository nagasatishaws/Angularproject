import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  public actionMenu: any;
  public roleActionMatrix: any = {};
  public userRole: any;

  constructor(
    private tokenService: TokenService
  ) {

    this.setRoleActionMatrix();
    this.setActionMenu();
    // [
    //   {
    //     'title': 'Actions',
    //     'contents': [
    //       { 'label': 'Accept', 'value': 'accept', 'icon': 'done', 'disabled': false, 'hidden': false, 'tooltip': 'Accept', 'type': 'ITEM' },
    //       { 'label': 'Reject', 'value': 'reject', 'icon': 'eject', 'disabled': false, 'hidden': false, 'tooltip': 'Reject', 'type': 'ITEM' },
    //       { 'label': 'Assign', 'value': 'assign', 'icon': 'how_to_reg', 'disabled': false, 'hidden': false, 'tooltip': 'Assign', 'type': 'ITEM' },
    //       { 'label': 'Close', 'value': 'close', 'icon': 'close', 'disabled': false, 'hidden': false, 'tooltip': 'Close', 'type': 'ITEM' },
    //       { 'label': 'Delete', 'value': 'delete', 'icon': 'delete', 'disabled': false, 'hidden': false, 'tooltip': 'Delete', 'type': 'ITEM' }
    //     ]
    //   },
    //   {
    //     'title': 'Views',
    //     'contents': [
    //       { 'label': 'Audit Trail', 'value': 'audit_trail', 'icon': 'collections_bookmark', 'disabled': false, 'hidden': false, 'tooltip': 'Audit Trail', 'type': 'ITEM' },
    //     ]
    //   },
    // ];
  }

  getActionMenu() {
    return this.actionMenu;
  }

  setActionMenu() {
    this.actionMenu = [
      {
        'title': 'Mark as',
        'contents': [
          { 'label': 'Duplicate', 'value': 'duplicate', 'icon': 'filter_none', 'disabled': this.roleActionMatrix['duplicate'], 'hidden': false, 'tooltip': 'Duplicate', 'type': 'ITEM' },
          { 'label': 'Follow Up', 'value': 'followup', 'icon': 'repeat', 'disabled': false, 'hidden': false, 'tooltip': 'Follow Up', 'type': 'ITEM' },
        ]
      },
      {
        'title': 'Submit for',
        'contents': [
          { 'label': 'Quality Review', 'value': 'subforqr', 'icon': 'rate_review', 'disabled': this.roleActionMatrix['subforqr'], 'hidden': false, 'tooltip': 'Quality Review', 'type': 'ITEM' },
          { 'label': 'Medical Review', 'value': 'subformr', 'icon': 'local_hospital', 'disabled': this.roleActionMatrix['subformr'], 'hidden': false, 'tooltip': 'Medical Review', 'type': 'ITEM' },
        ]
      },
      {
        'title': 'Return to',
        'contents': [
          { 'label': 'Data Entry', 'value': 'rettode', 'icon': 'loop', 'disabled': this.roleActionMatrix['rettode'], 'hidden': false, 'tooltip': 'Data Entry', 'type': 'ITEM' },
          { 'label': 'Quality Review', 'value': 'rettoqr', 'icon': 'rate_review', 'disabled': this.roleActionMatrix['rettoqr'], 'hidden': false, 'tooltip': 'Quality Review', 'type': 'ITEM' },
          { 'label': 'Medical Review', 'value': 'rettomr', 'icon': 'local_hospital', 'disabled': this.roleActionMatrix['rettomr'], 'hidden': false, 'tooltip': 'Medical Review', 'type': 'ITEM' },
        ]
      },
      {
        'title': 'Actions',
        'contents': [
          { 'label': 'Archive', 'value': 'archive', 'icon': 'archive', 'disabled': this.roleActionMatrix['archive'], 'hidden': false, 'tooltip': 'Archive', 'type': 'ITEM' },
          { 'label': 'Delete', 'value': 'delete', 'icon': 'delete', 'disabled': this.roleActionMatrix['delete'], 'hidden': false, 'tooltip': 'Delete', 'type': 'ITEM' },
          { 'label': 'Closed', 'value': 'closed', 'icon': 'fingerprint', 'disabled': this.roleActionMatrix['closed'], 'hidden': false, 'tooltip': 'Closed', 'type': 'ITEM' },
        ]
      },
      {
        'title': 'Views',
        'contents': [
          { 'label': 'Audit Trail', 'value': 'audit_trail', 'icon': 'collections_bookmark', 'disabled': false, 'hidden': false, 'tooltip': 'Audit Trail', 'type': 'ITEM' },
          { 'label': 'Action History', 'value': 'action_history', 'icon': 'history', 'disabled': false, 'hidden': false, 'tooltip': 'Action History', 'type': 'ITEM' }
        ]
      },
    ];
  }

  getRoleActionMatrix() {
    return this.roleActionMatrix;
  }

  setRoleActionMatrix() {
    this.userRole = this.tokenService.getToken()['role']['roleName'];

    if (this.userRole === "cndCpo") {
      this.roleActionMatrix['duplicate'] = false;
      this.roleActionMatrix['subforqr'] = false;
      this.roleActionMatrix['subformr'] = true;
      this.roleActionMatrix['rettoqr'] = true;
      this.roleActionMatrix['rettode'] = true;
      this.roleActionMatrix['delete'] = false;
      this.roleActionMatrix['archive'] = true;
      this.roleActionMatrix['closed'] = true;
      this.roleActionMatrix['rettomr'] = true;
    } else if (this.userRole === "cndQro") {
      this.roleActionMatrix['duplicate'] = true;
      this.roleActionMatrix['subforqr'] = true;
      this.roleActionMatrix['subformr'] = false;
      this.roleActionMatrix['rettoqr'] = true;
      this.roleActionMatrix['rettode'] = false;
      this.roleActionMatrix['delete'] = true;
      this.roleActionMatrix['archive'] = true;
      this.roleActionMatrix['closed'] = true;
      this.roleActionMatrix['rettomr'] = true;
    } else if (this.userRole === "cndMro") {
      this.roleActionMatrix['duplicate'] = true;
      this.roleActionMatrix['subforqr'] = true;
      this.roleActionMatrix['subformr'] = true;
      this.roleActionMatrix['rettoqr'] = false;
      this.roleActionMatrix['rettode'] = false;
      this.roleActionMatrix['delete'] = true;
      this.roleActionMatrix['archive'] = true;
      this.roleActionMatrix['closed'] = false;
      this.roleActionMatrix['rettomr'] = true;
    } else if (this.userRole === "cndAdmin") {
      this.roleActionMatrix['duplicate'] = false;
      this.roleActionMatrix['subforqr'] = false;
      this.roleActionMatrix['subformr'] = false;
      this.roleActionMatrix['rettoqr'] = false;
      this.roleActionMatrix['rettode'] = false;
      this.roleActionMatrix['delete'] = false;
      this.roleActionMatrix['archive'] = false;
      this.roleActionMatrix['closed'] = false;
      this.roleActionMatrix['rettomr'] = false;
    } else {
      this.roleActionMatrix['duplicate'] = true;
      this.roleActionMatrix['subforqr'] = true;
      this.roleActionMatrix['subformr'] = true;
      this.roleActionMatrix['rettoqr'] = true;
      this.roleActionMatrix['rettode'] = true;
      this.roleActionMatrix['delete'] = true;
      this.roleActionMatrix['archive'] = true;
      this.roleActionMatrix['closed'] = true;
      this.roleActionMatrix['rettomr'] = true;
    }
  }
}
