import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_KEY = 'kid_ry7kDWD0E';
const API_MASTER_SECRET = '7c99bfca4b32489cbd6cd8d354a4dff7';
const API_SECRET = 'e18f7a8f659d49a590dcfab87880cfef';
const API_URL = 'https://baas.kinvey.com';

export class AppHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers;

        if (req.params.get("isBasic") == "1") {
            headers = new HttpHeaders({
                'Authorization': `Basic ${btoa(API_KEY + ':' + API_SECRET)}`
            });
        }
        else if(req.params.get("isMaster")=="1"){
            headers = new HttpHeaders({
                'Authorization': `Basic ${btoa(API_KEY + ':' + API_MASTER_SECRET)}`
            });
        }
        else {
            console.log(localStorage.getItem('token'));
            headers = new HttpHeaders({
                'Authorization': 'Kinvey ' + localStorage.getItem('token')
            });
        }

        return next.handle(req.clone({
            headers: headers,
            url: API_URL + req.url
        }));
    }

}