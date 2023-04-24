import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  private readonly TIMEOUT = 5000; // Timeout de 5 segundos

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      timeout(this.TIMEOUT), // Define o timeout
      /*catchError((error) => {
        // Lógica para lidar com o erro de timeout
        return throwError(error);
      })  */
    );
  }
}
