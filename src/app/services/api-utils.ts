import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IRawHttpRequest, IUriObject } from './api.interface';
import { Observable } from 'rxjs';
export type TResponseType = 'json' | 'text' | 'arraybuffer' | 'blob';
/**
 * API Utils service.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiUtils {
  constructor(public http: HttpClient, @Inject('API_BASE_URL') public API_BASE_URL: string) {}

  /**
   * Build URI by asset, ID and subEntities.
   * @return Result URI.
   */
  public buildUri({ object = this.API_BASE_URL, asset = '', subEntity = '' }: Partial<IUriObject>): string {
    let uri = object;
    if (asset) {
      uri = `${uri}/${asset}`;
    }
    if (subEntity) {
      uri = `${uri}/${subEntity}`;
    }
    return uri;
  }

  /**
   * Fires an API Request.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public send<T = any>({
    path,
    method,
    params: fromObject,
    headers: httpHeaders,
    body,
    responseType = 'json',
    observe = 'body',
    noAuth,
    host = this.API_BASE_URL,
  }: IRawHttpRequest): Observable<T> {
    const subEntity = path
      .split('/')
      .map((each) => encodeURIComponent(each))
      .join('/');
    const headers = new HttpHeaders({ ...httpHeaders, noAuth: JSON.stringify(noAuth) });
    const params = new HttpParams({ fromObject });
    return this.http.request(method, this.buildUri({ subEntity, object: host }), {
      body,
      params,
      headers,
      responseType,
      observe,
    });
  }

  /**
   * Safe URI append.
   * @param path Path to be safely appended with /
   * @param prefixSlash Indicator if prefixed with /
   * @return Safe URI.
   */
  public static safeURIAppend(path?: string | number, prefixSlash = true): string {
    return path ? `${prefixSlash ? '/' : ''}${path}` : '';
  }
}
