import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptService implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar,
              private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(retry(environment.REINTENTOS)).
      pipe(tap(event => {
        if (event instanceof HttpResponse) {
          if (event.body && event.body.error === true && event.body.errorMessage) {
            throw new Error(event.body.errorMessage);
          }
        }
      })).pipe(catchError((err) => {
        // tslint:disable-next-line: quotemark
        if (err.status === 400 && err.error.error_description === "Bad credentials") {
          // tslint:disable-next-line: quotemark
          this.openSnacBar("Usuario o Contraseña Incorrecta");
        // tslint:disable-next-line: quotemark
        } else if (err.status === 401 && err.error.error_description === "----Nick o password incorecto") {
          // tslint:disable-next-line: quotemark
          this.openSnacBar("Usuario o Contraseña Incorrecta");
        }
        else {
          this.router.navigate([`/error/${err.status}/${err.error.message}`]);
        }
        return EMPTY;
      }));
  }

  openSnacBar(message: string) {
    this.snackBar.open(message, 'Informacion', {
      duration: 3000
    });
  }
}
