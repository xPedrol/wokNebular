import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {IUserTeamBasic} from '../models/basic/userTeam-basic.model';
import {SERVER_API_URL} from '../../app.constants';
import {Authority} from '../constants/authority.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  getUserTeams(authority: Authority): Observable<IUserTeamBasic> {
    let url = '';
    if (authority === Authority.TEACHER) {
      url = `teacher/userteams`;
    } else if (authority === Authority.USER) {
      url = `account/userteams`;
    }
    if (url) {
      return this.http.get<IUserTeamBasic>(`${SERVER_API_URL}${url}`);
    } else {
      return EMPTY;
    }
  }
}
