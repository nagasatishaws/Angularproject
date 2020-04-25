/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/

import { Injectable } from "@angular/core";

@Injectable()
export class Signup {
  user_id: any;
  user_name: any;
  organization: any;
  password: any;
  role: any;
}
export class Signin {
  emailId: any;
  password: any;
}
export class Forgetpassword {
  user_id: any;
}
export class Organization {
  value: string;
}
export class AlterRole {
  user_id: any;
  old_role: any;
  new_role: any;
}
export class UpdatePassword {
  password: any;
}
export class EnableDisableModel {
  status: any;
  userid: any;
}
