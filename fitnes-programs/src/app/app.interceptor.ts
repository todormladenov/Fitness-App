import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { getItem } from "./user/utils/storage-management";

@Injectable()

class AppInterceptor implements HttpInterceptor {
    private api = environment.api;
    private headers = new HttpHeaders(environment.apiHeaders);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const sessionToken = getItem('AuthToken');

        if (sessionToken) {
            this.headers.append('X-Parse-Session-Token', sessionToken);    
        }

        if (req.url.startsWith('api/')) {
            req = req.clone({
                url: req.url.replace('api/', this.api),
                headers: this.headers
            });
        }
        
        return next.handle(req)
    }
}

export const appInterceptorProvider: Provider = {
    useClass: AppInterceptor,
    multi: true,
    provide: HTTP_INTERCEPTORS
}