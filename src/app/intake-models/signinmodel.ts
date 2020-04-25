/**
* Author - Biplab Dey
* Version - 1.0
* Create date - 9 september 19
*/

export interface getSignin {
  statusCode: number;
  success: boolean;
}

export interface apiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;
}
