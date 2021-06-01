import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable, Injector} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NbToastrService} from '@nebular/theme';
import {SERVER_API_URL} from "../../app.constants";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  exceptions = ['account'];

  constructor(
    // private translate: TranslateService,
    private toastService: NbToastrService,
    private injector: Injector
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          // if(this.exceptions.indexOf(`${SERVER_API_URL}${request.url}`))
          const stop = this.exceptions.some((exception) => {
            const completeUrl = `${SERVER_API_URL}${exception}`;
            return completeUrl.indexOf(request.url) > -1;
          });
          if (!stop) {
            // if (error.error instanceof ErrorEvent) {
            //   console.log('this is client side error');
            //   errorMsg = `Error: ${error.error.message}`;
            // }
            // else {
            //   console.log('this is server side error');
            //   errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            // }
            // console.log(errorMsg);
            this.injector.get(TranslateService).get(error.error.message).subscribe((res: any) => {
              this.toastService.show(res?.description, res?.title, {status: 'danger'});
              errorMsg = res;
            });
            // this.toastService.show('', 'teste', {status: 'success'});
          }
          return throwError(errorMsg);
        })
      );
  }
}
