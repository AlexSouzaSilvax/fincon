import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  private readonly TIMEOUT = 30000; // Timeout de 30 segundos

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      timeout(this.TIMEOUT) // Define o timeout
      /*catchError((error) => {
        // Lógica para lidar com o erro de timeout
        return throwError(error);
      })  */
    );
  }
}
