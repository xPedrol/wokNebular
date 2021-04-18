import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {IUserTeamBasic} from '../models/basic/userTeam-basic.model';
import {SERVER_API_URL} from '../../app.constants';
import {Authority} from '../constants/authority.constants';
import {AccountService} from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
  }

  getUserTeamsByAccount(): Observable<IUserTeamBasic[]> {
    let url = '';
    // if (this.accountService.account.isTeacher()) {
    //   url = `teacher/userteams`;
    // } else
    if (this.accountService.account.isStudent()) {
      url = `account/userteams`;
    }
    if (url) {
      return this.http.get<IUserTeamBasic[]>(`${SERVER_API_URL}${url}`);
    } else {
      return EMPTY;
    }
  }
}
