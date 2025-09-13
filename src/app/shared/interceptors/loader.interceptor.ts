import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError, tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

export function loaderInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {

  const loaderService = inject(LoaderService);
  loaderService.show();

  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // Éxito
      }
    }),
    catchError((error: HttpErrorResponse) => {
      return throwError(() => error);
    }),
    finalize(() => {
      loaderService.hide();
    })
  );
}