import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUserRank, UserRank} from '../models/user-rank.model';
import {SERVER_API_URL} from '../../app.constants';
import {RoutePrefix} from '../constants/route-prefix';
import {map} from 'rxjs/operators';
import {Course, ICourse} from '../models/course.model';
import {SharedFunctions} from '../shared.functions';
import {Authority} from '../constants/authority.constants';

@Injectable({
  providedIn: 'root'
})
export class UserRankService {

  constructor(
    private http: HttpClient,
    private sF: SharedFunctions
  ) {
  }

  getCourseRank(courseId: number): Observable<IUserRank[]> {
    const url = `${RoutePrefix.PUBLIC}courses/${courseId}/users/courseRank`;
    return this.http.get<IUserRank[]>(`${SERVER_API_URL}${url}`).pipe(map((ranks) => {
      return ranks.map((rank: IUserRank) => {
        return new UserRank(rank);
      });
    }));
  }

  getModuleRank(authorities: Authority[], moduleId: number): Observable<IUserRank[]> {
    const url = `${this.sF.routeAuthSwitch(authorities, false)}modules/${moduleId}/users/moduleRank`;
    return this.http.get<IUserRank[]>(`${SERVER_API_URL}${url}`).pipe(map((ranks) => {
      return ranks.map((rank: IUserRank) => {
        return new UserRank(rank);
      });
    }));
  }
}
