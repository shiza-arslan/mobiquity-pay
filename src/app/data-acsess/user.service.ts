import { Injectable } from '@angular/core';
import { ApiUtils } from './api-utils';
import { Api } from './api';

/**
 * User HTTP service.
 * /users endpoint.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService extends Api {
  constructor(apiUtils: ApiUtils) {
    super(apiUtils, 'users');
  }
}
