import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../../app.constants';
import {CookieService} from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req || !req.url || (req.url.startsWith('http') && !(SERVER_API_URL && req.url.startsWith(SERVER_API_URL)))) {
      return next.handle(req);
    }
    if (this.cookieService.get('id_token')) {
      req = req.clone(
        {
          setHeaders: {
            Authorization: `Bearer ${this.cookieService.get('id_token')}`
          }
        }
      );
    }
    return next.handle(req);
  }
}
