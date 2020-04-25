/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/


export class getModule {
  moduleName: string;
  moduleDisplayName: string;
  redirectUrl: string;
}

export class Role {
  roleName: string;
  roleDisplayName: string;
  clientId: string;
  moduleName: any;
}

export class Client {
  clientName: any;
  industry: any;
  billingAddress: any;
  contactPersonName: any;
  contactPhoneNumber: any;
  emailId: any;
  configParams: { sessionExpiryTime: any };
  licenseId: any;
}

export class License {
  modules: any;
  noActUsers: any;
  startDate: any;
  endDate: any;
  clientId: any;
}

export class User {
  clientId: any;
  emailId: any;
  firstName: any;
  lastName: any;
  mobileNo: any;
  department: any;
  designation: any;
  roleId: any;
  password: any;
}

export class Team {
  teamName: string;
  listOfUsers: any = [];
}

export class Queue {
  queueName: string;
  drugName: string;
  clientId: string;
  severity: string;
  team: [];
  currentUser: [];
}

export class mail {
  mailboxName: any;
  mailServerDomain: any;
  mailServerUserName: any;
  mailServerPassword: any;
  accessType: string;
  sendPort: Number;
  readPort: Number;
  mailServerProtocol: any;
  interval: any;
  recurrence: any;
  time: any;
  hour: any;
  minute: any;
}

export class addRule {
  ruleName: string;
  source: string;
  seriousness: string;
  priority: string;
  deadline: Number;
  formType: Array<any>;
}

/**
 * Author: Lohit
 * Date: 01-01-2020
 */
export class FormDataSaveModel {
  metaDataVersionId: string = "";
  studyOID: string = "";
  subjectData: EventDataModel = new EventDataModel();
}

export class EventDataModel {
  eventData: FormDataModel = new FormDataModel();
  investigatorRef: string = "";
  siteRef: string = "";
  subjectRef: string = "";
  transactionType: string = "INSERT";
}

export class FormDataModel {
  formData: ItemGroupDataModel = new ItemGroupDataModel();
  studyEventOID: string = "";
  studyEventRepeatKey: number = 1;
  transactionType: string = "INSERT";
}

export class ItemGroupDataModel {
  itemGroupData: Array<ItemDataModel>;
  formOID: string = "";
  formRepeatKey: number = 1;
  transactionType: string = "INSERT";
}

export class ItemDataModel {
  itemData: Array<ElementModel>;
  // itemDataStarGroup: any = [];
  itemGroupOID: string = "";
  itemGroupRepeatKey: number = 1;
  transactionType: string = "INSERT";
}

export class ElementModel {
  itemOID: string = "";
  value: any = "";
  isNull: string = "YES";
  transactionType: string = "INSERT";
}