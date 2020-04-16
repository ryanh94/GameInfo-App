import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../models/user';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const newRequest = this.setHeaders(request);
        return next.handle(newRequest)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    if ((err.status === 0 || err.status === 400) && request.url.indexOf('token')) {
                        return throwError('Username/Password invalid');
                    // tslint:disable-next-line: triple-equals
                    } else if (err instanceof HttpErrorResponse && err.status == 401) {
                        this.router.navigate(['/login']);
                        // alert(err.status);
                    }
                    return throwError(err);
                })

            );

    }

    private setHeaders(request: HttpRequest<any>) {
        const user = JSON.parse(sessionStorage.getItem('user')) as User;
        if (user != null) {
            const clonedreq = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + user.token)
            });
            return clonedreq;
        }
        return request;
    }
}
