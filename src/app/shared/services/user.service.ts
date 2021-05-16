import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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
import {ISubmission} from '../models/submission.model';
import {SharedFunctions} from '../shared.functions';
import {ISkillBasic} from '../models/basic/skill-basic.model';
import {IUserSkill, UserSkill} from '../models/user/user-skill.model';
import {IReportResults} from '../models/module-topic-user-result.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private sF: SharedFunctions
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
        return exerciseResults.map((exerciseResult) => {
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

  getSubmissionByExercise(
    authorities: Authority[],
    courseSlug: string,
    disciplineSlug: string,
    topicSlug: string,
    exerciseSlug: string
  ): Observable<ISubmission[]> {
    const options = null;
    // const options = createRequestOption(req);
    const url = `${this.sF.routeAuthSwitch(authorities)}courses/${courseSlug}/disciplines/${disciplineSlug}/topics/${topicSlug}/exercises/${exerciseSlug}/submissions`;
    return this.http
      .get<ISubmission[]>(`${SERVER_API_URL}${url}`, {params: options});
  }

  getUserSkillsMatriz(): Observable<IUserSkill[][]> {
    const url = `account/users/skills/`;
    return this.http.get<IUserSkill[][]>(`${SERVER_API_URL}${url}`).pipe(map((skill) => {
      return skill = Object.keys(skill).map((key) => {
        return skill ? skill[key] : [];
      });
    }));
  }

  getUserSkillsArray(): Observable<IUserSkill[]> {
    const url = `account/users/skills/`;
    return this.http.get<IUserSkill[][]>(`${SERVER_API_URL}${url}`).pipe(map((skill) => {
      const skillA: IUserSkill[] = (Object.keys(skill).map((key) => {
        return skill ? skill[key] : [];
      })).reduce(
        (acc, val) => acc.concat(val),
        []
      );
      return skillA.map((skill1) => {
        return new UserSkill(skill1);
      });
    }));
  }

  getReportResultsByModule(
    authorities: Authority[],
    moduleId: number
  ): Observable<IReportResults[][]> {
    const url = `${this.sF.routeAuthSwitch(authorities)}modules/${moduleId}/reportResults`;
    return this.http
      .get<IReportResults[][]>(`${SERVER_API_URL}${url}`);
  }
}
