import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {IUserTeamBasic} from '../models/basic/userTeam-basic.model';
import {SERVER_API_URL} from '../../app.constants';
import {Authority} from '../constants/authority.constants';
import {AccountService} from './account.service';
import {CompleteUser, ICompleteUser} from '../models/user/complete-user.model';
import {map} from 'rxjs/operators';
import {IUserProfileStatistics} from '../models/user/user-profile-statistics.model';
import {IUserExerciseResult, UserExerciseResult} from '../models/user/user-exercise-result.model';
import {IUserTopicResult} from '../models/user/user-topic-result.model';

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

  getCompleteUser() {
    const url = 'account/users';
    return this.http.get<ICompleteUser>(`${SERVER_API_URL}${url}`).pipe(map(user => {
      return new CompleteUser(user);
    }));
  }

  getUserProfileStatistics() {
    const url = 'account/reportUser';
    return this.http.get<IUserProfileStatistics>(`${SERVER_API_URL}${url}`);
  }

  getExercisesResult(
    courseSlug: string,
    disciplineSlug: string,
    topicSlug: string
  ): Observable<IUserExerciseResult[]> {
    return this.http
      .get<IUserExerciseResult[]>(
        `${SERVER_API_URL}account/disciplines/${disciplineSlug}/courses/${courseSlug}/topics/${topicSlug}/submissions/studentResults`)
      .pipe(map((exerciseResults) => {
        return exerciseResults = exerciseResults.map((exerciseResult) => {
          return new UserExerciseResult(exerciseResult);
        });
      }));
  }

  getTopicResult(
    topicId: number
  ): Observable<IUserTopicResult> {
    return this.http
      .get<IUserTopicResult>(
        `${SERVER_API_URL}account/modules/topics/${topicId}/reportResults`)
      .pipe(map((topicResult) => {
        const topicResultT = Object.keys(topicResult).map((key) => {
          return topicResult[key];
        });
        if (topicResultT[0]) {
          return topicResultT[0];
        }
        return null;
      }));
  }
}
