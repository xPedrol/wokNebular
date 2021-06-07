import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUserAuth} from '../models/user/UserLogin.model';
import {SERVER_API_URL} from '../../app.constants';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import {Observable, of} from 'rxjs';
import {AccountService} from './account.service';
import {Account} from '../models/user/account.model';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';
import * as moment from 'moment';
import {NbAuthToken} from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private cookieService: CookieService,
    private accountService: AccountService,
    private router: Router
  ) {
  }

  login(user: IUserAuth): Observable<Account | null> {
    return this.loginMiddleware(user).pipe(mergeMap((result: boolean) => {
      if (result) {
        return this.accountService.getAccount(true);
      } else {
        return of(null);
      }
    }));
  }

  loginMiddleware(user: IUserAuth): Observable<boolean> {
    return this.http.post<any>(`${SERVER_API_URL}authenticate`, user).pipe(
      catchError(() => {
        return of(false);
      }),
      map((obj: any) => {
        const date = new Date(moment().add(1, 'months').format('YYYY-MM-DD'));
        this.cookieService.put('id_token', obj?.id_token, {expires: date});
        return true;
      }));
  }

  register(user: IUserAuth): Observable<boolean> {
    return this.http.post<boolean>(`${SERVER_API_URL}register`, user);
  }

  logout(): void {
    this.cookieService.remove('id_token');
    this.localStorage.clear('url_back');
    this.accountService.account = null;
    this.accountService.account$ = null;
    this.router.navigateByUrl('/auth/login');
  }

  getUserByGoogleToken(userToken: NbAuthToken): void {
    this.http.get(`https://www.googleapis.com/plus/v1/people/me?access_token=${userToken.getValue()}`).subscribe((user) => {
    });
    // this.http.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {headers: {Authorization: 'Bearer ' + userToken.getValue()}}).subscribe((user) => {
    //   console.warn(user);
    // });
  }
}
