import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
/**
 * Authentication interceptor.
 * Will intercept all http requests which do not have the `noAuth` header
 * and will add the accessToken to them.
 * In case that we have received a 401 and we could not refresh the token
 * we will logout the user.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router) {}

  /**
   * Intercepts the HTTP request and makes modifications to it.
   * @param req The request.
   * @param next The next middleware.
   * @return HttpEvent
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('mobiquity.pay.access_token'); // replace the string with injectables.

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let authorizedRequest: HttpRequest<any>;
    if (accessToken) {
      authorizedRequest = req.clone({ headers: req.headers.set('Authorization', `Bearer ${accessToken}`) });
    } else {
      authorizedRequest = req;
    }

    return next.handle(authorizedRequest).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (isDevMode()) {
          // eslint-disable-next-line no-console
          console.warn(errorResponse.message);
        }
        if (errorResponse.status === HttpStatusCode.Unauthorized) {
          this.router.navigate(['/login']);
        }
        return throwError(errorResponse);
      }),
    );
  }
}
