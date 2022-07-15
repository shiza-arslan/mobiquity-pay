import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, options: any = null): Observable<any> {
    return this.http.get(`${path}`, options ?? new HttpHeaders()).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}, options: any = null): Observable<any> {
    return this.http
      .put(`${path}`, JSON.stringify(body), options ?? new HttpHeaders())
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}, options: any = null): Observable<any> {
    return this.http
      .post(`${path}`, JSON.stringify(body), options ?? new HttpHeaders())
      .pipe(catchError(this.formatErrors));
  }

  delete(path: any, options: any = null): Observable<any> {
    return this.http.delete(`${path}`, options ?? new HttpHeaders()).pipe(catchError(this.formatErrors));
  }
}
