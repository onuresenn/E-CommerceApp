import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    
    return next.handle(request)
    .pipe(
      catchError(error =>{
        if(error.status == 400){
          if(error.error.errors){
              throw error.error;
          }
          else{
            this.toastr.error(error.error.message,error.statuscode)
          }
          
        };

        if(error.status == 401){
          this.toastr.error(error.error.message,error.statuscode)
        };
        if(error === 404){
          this.router.navigateByUrl('/not-found');
        }
        if(error === 500){
          this.router.navigateByUrl('/server-error');
        }
        return throwError(error);
      }
      
      )
    );
          
  }
}
