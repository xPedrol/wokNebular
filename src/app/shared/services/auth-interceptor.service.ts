import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionStorageService} from 'ngx-webstorage';
import {SERVER_API_URL} from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private sessionStorage: SessionStorageService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req || !req.url || (req.url.startsWith('http') && !(SERVER_API_URL && req.url.startsWith(SERVER_API_URL)))) {
      return next.handle(req);
    }
    if (this.sessionStorage.retrieve('id_token')) {
      req = req.clone(
        {
          setHeaders: {
            Authorization: `Bearer ${this.sessionStorage.retrieve('id_token')}`
          }
        }
      );
    }
    return next.handle(req);
  }
}
