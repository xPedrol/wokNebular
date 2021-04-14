import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUserLogin} from '../models/user/UserLogin.model';
import {SERVER_API_URL} from '../../app.constants';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {SessionStorageService} from 'ngx-webstorage';
import {Observable, of} from 'rxjs';
import {AccountService} from './account.service';
import {Account} from '../models/user/account.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService,
    private accountService: AccountService,
    private router: Router
  ) {
  }

  login(user: IUserLogin): Observable<Account | null> {
    return this.loginMiddleware(user).pipe(mergeMap((result: boolean) => {
      if (result) {
        return this.accountService.getAccount(true);
      } else {
        return of(null);
      }
    }));
  }

  loginMiddleware(user: IUserLogin): Observable<boolean> {
    return this.http.post<any>(`${SERVER_API_URL}authenticate`, user).pipe(
      catchError(() => {
        return of(false);
      }),
      map((obj: any) => {
        this.sessionStorage.store('id_token', obj?.id_token);
        return true;
      }));
  }

  logout(): void {
    this.sessionStorage.clear('id_token');
    this.sessionStorage.clear('url_back');
    this.accountService.account = null;
    this.accountService.account$ = null;
    this.router.navigateByUrl('/auth/login');
  }
}
