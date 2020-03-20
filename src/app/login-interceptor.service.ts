import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';


@Injectable()
export class LoginInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // if (req.url === '/login') {
            const modReq = req.clone({
                params: new HttpParams().set('cm', 'login')
            })
            return next.handle(modReq)

        // }
        // return next.handle(req);

    }

}