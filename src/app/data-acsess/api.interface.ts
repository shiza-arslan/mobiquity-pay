import { HttpParams } from '@angular/common/http';
/**
 * URI Object.
 */
export interface IUriObject {
  /**
   * Entity Name.
   * @example /users
   */
  object: string;
  /**
   * The Asset.
   * @example /api/v1
   */
  asset?: string;
  /**
   * Sub path.
   * @example /type/:id
   */
  subEntity?: string;
}

/**
 * Api Request object.
 * Used to hit the underlying http.request method.
 * most of the time you would need IRequest
 */
export interface IRawHttpRequest extends Partial<IApiResponseType> {
  /**
   * Host name.
   */
  host?: string;
  /**
   * The Entity name.
   */
  path: string;
  /**
   * HTTP verb.
   */
  method: string;
  /**
   * Http Header.
   * Will be appended along with the default header.
   */
  headers?: {
    // tslint:disable-next-line:no-any
    [key: string]: any;
  };
  /**
   * Http query params.
   */
  params?: TAnyObj;
  /**
   * Indicator if the request is multipart.
   */
  isMultipart?: boolean;
  /**
   * Indicator if the request is noAuth.
   */
  noAuth?: boolean;
  /**
   * HTTP request Body.
   * Only for relevant http verb.
   */
  // tslint:disable-next-line:no-any
  body?: any;
}

/**
 * Used when calling {@link Api}
 */
export interface IApiRequest extends Partial<IApiResponseType> {
  /**
   * Path. Sub entity.
   */
  subEntity?: string | number;
  /**
   * Query params.
   */
  params?: TAnyObj;
  /**
   * Headers to append.
   */
  headers?: TAnyObj;
  /**
   * Indicator for multi part.
   * defaults to false.
   */
  isMultipart?: boolean;
  /**
   * Indicator no auth for request.
   * defaults to false.
   */
  noAuth?: boolean;
  /**
   * Body.
   */
  // tslint:disable-next-line:no-any
  body?: any;
}

export type TAnyObj = {
  // tslint:disable-next-line:no-any
  [key: string]: any;
};

/**
 * Api response time and observe type.
 */
export interface IApiResponseType {
  /**
   * Http response type.
   * defaults to `json`
   */
  responseType: 'json' | 'arraybuffer' | 'text' | 'blob';
  /**
   * Response type.
   * @example 'response' | 'events'
   */
  observe: 'response' | 'events' | 'body';
}
