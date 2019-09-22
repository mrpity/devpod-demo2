import { HttpRequest } from '@angular/common/http';

export interface GraphqlError {
  operationName?: string;
  message?: string;
  status?: ErrorCodes;
  request: HttpRequest<any>;
}

export enum ErrorCodes {
  GATEWAY_TIMEOUT = 504,
  UNAUTHORIZED = 401,
  UNKNOWN = 0
}
