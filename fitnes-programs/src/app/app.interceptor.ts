import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { environment } from "src/environments/environment.development";
import { getItem } from "./user/utils/storage-management";
import { Router } from "@angular/router";

@Injectable()

export class AppInterceptor implements HttpInterceptor {
    private api = environment.api;
    private headers = new HttpHeaders(environment.apiHeaders);

    constructor(private router: Router) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.startsWith('api/')) {
            req = req.clone({
                url: req.url.replace('api/', this.api),
                headers: this.headers
            });
        }

        const sessionToken = getItem('AuthToken');
        
        if (sessionToken) {

            req = req.clone({
                headers: req.headers.set('X-Parse-Session-Token', sessionToken)

            })
        }

        return next.handle(req).pipe(
            catchError((err) => {
                if (err.error.code === 209) {
                    this.router.navigate(['/user/login'])
                }
                return [err]
            })
        )
    }
}

export const appInterceptorProvider: Provider = {
    useClass: AppInterceptor,
    multi: true,
    provide: HTTP_INTERCEPTORS
}