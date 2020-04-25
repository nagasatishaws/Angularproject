// Import Declarations
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudyConfigCommonDataService {

  // Property Declarations
  public languages: any[] = [
    { 'label': 'English', 'value': 'en' },
    { 'label': 'Spanish', 'value': 'sp' },
    { 'label': 'French', 'value': 'fr' },
    { 'label': 'Hindi', 'value': 'hn' }
  ];
  public controlType: string[] = ['LABEL', 'TEXT', 'LONGTEXT', 'DATETIME', 'CHECKBOXH', 'CHECKBOXV', 'DROPDOWN', 'SEARCHLIST', 'MULTISELECT', 'RADIOBUTTONH', 'RADIOBUTTONV'];
  public observationCLass: any[] = [
    { 'label': 'SPECIALPURPOSE', 'value': 'SPECIALPURPOSE' },
    { 'label': 'INTERVENTIONS', 'value': 'INTERVENTIONS' },
    { 'label': 'FINDINGS', 'value': 'FINDINGS' },
    { 'label': 'EVENTS', 'value': 'EVENTS' },
    { 'label': 'GENERAl', 'value': 'GENERAl' }
  ];
  public yesno: string[] = ['YES', 'NO'];
  private itemActionMenu: any[] = [
    {
      'title': 'Actions',
      'contents': [
        { 'label': 'Freeze Item', 'value': 'freeze_item', 'icon': 'domain_disabled', 'disabled': true },
        { 'label': 'Lock Item', 'value': 'lock_item', 'icon': 'lock', 'disabled': true },
        { 'label': 'Open Query', 'value': 'open_query', 'icon': 'lock_open', 'disabled': true },
      ]
    },
    {
      'title': 'Views',
      'contents': [
        { 'label': 'Item Audit Trail', 'value': 'item_audit_trail', 'icon': 'collections_bookmark', 'disabled': true },
      ]
    },
  ];
  private formActionMenu: any[] = [
    {
      'title': 'Actions',
      'contents': [
        { 'label': 'Freeze Form', 'value': 'freeze_form', 'icon': 'domain_disabled', 'disabled': true },
        { 'label': 'Lock Form', 'value': 'lock_form', 'icon': 'lock', 'disabled': true },
      ]
    },
    {
      'title': 'Views',
      'contents': [
        { 'label': 'Form Audit Trail', 'value': 'form_audit_trail', 'icon': 'collections_bookmark', 'disabled': true },
      ]
    },
  ];
  private eventActionMenu: any[] = [
    {
      'title': 'Actions',
      'contents': [
        { 'label': 'Freeze Event', 'value': 'freeze_event', 'icon': 'domain_disabled', 'disabled': true },
        { 'label': 'Lock Event', 'value': 'lock_event', 'icon': 'lock', 'disabled': true },
      ]
    },
    {
      'title': 'Views',
      'contents': [
        { 'label': 'Event Audit Trail', 'value': 'event_audit_trail', 'icon': 'collections_bookmark', 'disabled': true },
      ]
    },
  ];
  private eventDateActionMenu: any[] = [
    {
      'title': 'Actions',
      'contents': [
        { 'label': 'Freeze Event Date', 'value': 'freeze_event_date', 'icon': 'domain_disabled', 'disabled': true },
        { 'label': 'Lock Event Date', 'value': 'lock_event_date', 'icon': 'lock', 'disabled': true },
        { 'label': 'Open Query', 'value': 'open_query', 'icon': 'lock_open', 'disabled': true },
      ]
    },
    {
      'title': 'Views',
      'contents': [
        { 'label': 'Event Audit Trail', 'value': 'event_audit_trail', 'icon': 'collections_bookmark', 'disabled': true },
      ]
    },
  ];
  private subjectActionMenu: any[] = [
    {
      'title': 'Actions',
      'contents': [
        { 'label': 'Freeze Subject', 'value': 'freeze_subject', 'icon': 'domain_disabled', 'disabled': true },
        { 'label': 'Lock Subject', 'value': 'lock_subject', 'icon': 'lock', 'disabled': true },
        { 'label': 'Delete Subject', 'value': 'delete_subject', 'icon': 'delete', 'disabled': true },
      ]
    },
    {
      'title': 'Views',
      'contents': [
        { 'label': 'Subject Audit Trail', 'value': 'subject_audit_trail', 'icon': 'collections_bookmark', 'disabled': true },
      ]
    },
  ];
  public formatTypes: any[] = ['$n', 'n', 'n+', 'n.x', 'n.x+', 'n+.x', 'n+.x', 'dd', 'dd-', 'mm', 'mm-', 'MMM', 'MMM-', 'yy', 'yyyy', 'hh', 'rr', 'HH', 'nn', 'ss'];
  public dataTypes: any = ['INTEGER', 'FLOAT', 'TEXT', 'STRING'];

  constructor() { }

  getItemActionMenu() {
    return this.itemActionMenu;
  }

  getFormActionMenu() {
    return this.formActionMenu;
  }

  getEventActionMenu() {
    return this.eventActionMenu;
  }

  getSubjectActionMenu() {
    return this.subjectActionMenu;
  }

  getEventDateActionMenu() {
    return this.eventDateActionMenu;
  }

}
