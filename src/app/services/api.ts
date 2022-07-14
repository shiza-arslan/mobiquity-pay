import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class Api {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${path}`, { params }).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${path}`, JSON.stringify(body)).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
      }),
    };
    return this.http.post(`${path}`, JSON.stringify(body), httpOptions).pipe(catchError(this.formatErrors));
  }

  delete(path: any): Observable<any> {
    return this.http.delete(`${path}`).pipe(catchError(this.formatErrors));
  }
}
