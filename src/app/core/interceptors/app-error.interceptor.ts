import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppErrorInterceptor implements HttpInterceptor {
    constructor(private toasterService:ToastrService){}
    
    intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(evt => {
            
            }),
            catchError((err: any) => {
                this.toasterService.error(err.error.description);
                return of(err);
            }));
    
    }

}