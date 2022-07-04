import { Observable } from 'rxjs';
import { ApiUtils } from './api-utils';
import { IApiRequest } from './api.interface';

/**
 * Api Base class.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Api<TParams = any, TData = any> {
  constructor(protected apiUtils: ApiUtils, private endpoint: string) {}

  /**
   * Performs a GET request including paging parameter.
   * @param params Query Params.
   * @param subEntity Request specific sub path.
   * @param headers Http Headers.
   * @param noAuth Indicator auth.
   * @param responseType Response type.
   * @param observe Observe type.
   * @return A stream of data from the API response.
   */
  public get<Params = TParams, Data = TData>({
    params,
    subEntity = '',
    headers,
    noAuth = false,
    responseType = 'json',
    observe = 'body',
  }: IApiRequest): Observable<Data> {
    return this.apiUtils.send<Data>({
      method: 'GET',
      path: `${this.endpoint}${ApiUtils.safeURIAppend(subEntity)}`,
      headers,
      params,
      noAuth,
      responseType,
      observe,
    });
  }

  /**
   * Performs a POST request including paging parameter.
   * @param params Query Params.
   * @param subEntity Request specific sub path.
   * @param headers Http Headers.
   * @param noAuth Indicator auth.
   * @param body Request body.
   * @param responseType Response type.
   * @param observe Observe type.
   * @return A stream of data from the API response.
   */
  public post<Body = TParams, Data = TData>({
    params,
    subEntity = '',
    headers,
    noAuth = false,
    body,
    responseType = 'json',
    observe = 'body',
  }: IApiRequest): Observable<Data> {
    return this.apiUtils.send<Data>({
      method: 'POST',
      path: `${this.endpoint}${ApiUtils.safeURIAppend(subEntity)}`,
      headers,
      params,
      noAuth,
      body,
      observe,
      responseType,
    });
  }

  /**
   * Performs a PUT request including paging parameter.
   * @param params Query Params.
   * @param subEntity Request specific sub path.
   * @param headers Http Headers.
   * @param noAuth Indicator auth.
   * @param body Request body.
   * @param responseType Response type.
   * @param observe Observe type.
   * @return A stream of data from the API response.
   */
  public put<Body = TParams, Data = TData>({
    params,
    subEntity = '',
    headers,
    noAuth = false,
    body,
    responseType = 'json',
    observe = 'body',
  }: IApiRequest): Observable<Data> {
    return this.apiUtils.send<Data>({
      method: 'PUT',
      path: `${this.endpoint}${ApiUtils.safeURIAppend(subEntity)}`,
      headers,
      params,
      noAuth,
      responseType,
      observe,
      body,
    });
  }

  /**
   * Performs a DELETE request including paging parameter.
   * @param params Query Params.
   * @param subEntity Request specific sub path.
   * @param headers Http Headers.
   * @param noAuth Indicator auth.
   * @param responseType Response type.
   * @param observe Observe type.
   * @return A stream of data from the API response.
   */
  public delete<Params = TParams, Data = TData>({
    params,
    subEntity = '',
    headers,
    noAuth = false,
    responseType = 'json',
    observe = 'body',
  }: IApiRequest): Observable<Data> {
    return this.apiUtils.send<Data>({
      method: 'DELETE',
      path: `${this.endpoint}${ApiUtils.safeURIAppend(subEntity)}`,
      headers,
      params,
      responseType,
      observe,
      noAuth,
    });
  }
}
