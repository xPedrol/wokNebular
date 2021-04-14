import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Account, IAccount} from '../models/user/account.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {shareReplay, tap} from 'rxjs/operators';
import {Authority} from '../constants/authority.constants';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  account$: Observable<IAccount | null>;
  account: IAccount;

  constructor(
    private http: HttpClient
  ) {
  }

  getAccount(force?: boolean) {
    if (force || !this.account$) {
      this.account$ = this.getAccountFromApi().pipe(tap((account: IAccount) => {
        this.account = new Account(account);
      }), shareReplay(1));
    }
    return this.account$;
  }

  hasAnyAuthority(authorities: string[]): boolean {
    if (this.account) {
      return this.account.authorities.some((authority: string) =>
        authorities.includes(authority)
      );
    }
  }

  getAccountFromApi(): Observable<IAccount> {
    return this.http.get<IAccount>(`${environment.API_URL}account`);
  }
}
