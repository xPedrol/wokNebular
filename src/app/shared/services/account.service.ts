import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Account, IAccount} from '../models/user/account.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map, shareReplay, tap} from 'rxjs/operators';
import {SERVER_API_URL} from '../../app.constants';
import {IProfile} from '../models/user/profile.model';

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
      this.account$ = this.getAccountFromApi(force).pipe(tap((account: IAccount) => {
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

  getAccountFromApi(force?: boolean): Observable<IAccount> {
    const forceS = force ? force.toString() : 'false';
    const options = {headers: new HttpHeaders({force: forceS})};
    return this.http.get<IAccount>(`${environment.API_URL}account`, {...options, responseType: 'json'});
  }

  save(account: IAccount): Observable<{}> {
    return this.http.post(`${SERVER_API_URL}account`, account);
  }

  imageUpload(image: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('file', image, image.name);
    return this.http.put<boolean>(`${SERVER_API_URL}account/users/image`, formData);
    // .pipe(map(() => { return true; }));
  }

  saveprofile(profile: IProfile) {
    const url = `account/profile/`;
    return this.http.put<boolean>(`${SERVER_API_URL}${url}`, profile);
  }
}
