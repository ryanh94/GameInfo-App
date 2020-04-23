import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../models/user';
import { Injectable } from '@angular/core';
import { UserService } from '../userService';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    static readonly baseUrl = environment.APIUrl;

    constructor(private router: Router, private userService: UserService) { }

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
        const token = this.userService.getToken();

        if (token && request.url !== UserService.loginUrl) {
            const clonedReq = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${token}`),
                url: this.appendBaseUrl(request.url)
            });
            return clonedReq;
        } else {
            const clonedReq = request.clone({
                url: this.appendBaseUrl(request.url)
            });

            return clonedReq;
        }
    }

    private appendBaseUrl(url: string): string {
        let baseUrl = AuthInterceptor.baseUrl;
        if (!baseUrl.endsWith('/')) {
            baseUrl += '/';
        }

        let path = url;
        if (path.startsWith('/')) {
            path = path.substring(1);
        }

        return `${baseUrl}${path}`;
    }
}
