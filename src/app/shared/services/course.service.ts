import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SERVER_API_URL} from '../../app.constants';
import {Course, ICourse} from '../models/course.model';
import {map} from 'rxjs/operators';
import {EMPTY, Observable, of} from 'rxjs';
import {AccountService} from './account.service';
import {ICourseStatistics} from '../models/course-statistics.model';
import {SharedFunctions} from '../shared.functions';
import {Authority} from '../constants/authority.constants';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private sF: SharedFunctions
  ) {
  }

  getLearningCourses(authorities: Authority[], all: boolean = false, refresh: boolean = false): Observable<ICourse[]> {
    const url = `${this.sF.routeAuthSwitch(authorities)}courses?all=${all}`;
    const options = {headers: new HttpHeaders({force: String(refresh)})};
    return this.http.get<ICourse[]>(`${SERVER_API_URL}${url}`, {...options, responseType: 'json'}).pipe(map((courses) => {
      return courses.map((course: ICourse) => {
        return new Course(course);
      });
    }));
  }

  getTeachingCourses(authorities: Authority[], all: boolean = false, refresh: boolean = false): Observable<ICourse[]> {
    if (this.accountService.account.isTeacher()) {
      const url = `teacher/courses?all=${all}`;
      const options = {headers: new HttpHeaders({force: String(refresh)})};
      return this.http.get<ICourse[]>(`${SERVER_API_URL}${url}`, {...options, responseType: 'json'}).pipe(map((courses) => {
        return courses.map((course: ICourse) => {
          return new Course(course);
        });
      }));
    }
    return of([]);
  }

  getPublicCourses(): Observable<ICourse[]> {
    const url = `public/courses/contests`;
    return this.http.get<ICourse[]>(`${SERVER_API_URL}${url}`).pipe(map((courses) => {
      return courses.map((course: ICourse) => {
        return new Course(course);
      });
    }));
  }

  registerIntoCourse(authorities: Authority[], code: string, userTeamId: string) {
    const formData = new FormData();
    formData.append('codeCourse', code);
    formData.append('userTeamId', userTeamId);
    const url = `/account/courses/registrations`;
    return this.http.post(`${SERVER_API_URL}${url}`, formData);
  }

  getCourseStatistics(authorities: Authority[], courseId: number): Observable<ICourseStatistics> {
    let url = ``;
    if (this.accountService.account.isTeacher()) {
      url = `teacher/courses/${courseId}/statistics`;
    } else if (this.accountService.account.isStudent()) {
      url = `account/courses/${courseId}/statistics`;
    }

    return this.http.get<ICourseStatistics>(`${SERVER_API_URL}${url}`);
  }

  findCourse(
    authorities: Authority[],
    id: number | string
  ): Observable<ICourse> {
    const url = `${this.sF.routeAuthSwitch(authorities)}courses/${id}`;
    return this.http
      .get<ICourse>(`${SERVER_API_URL}${url}`).pipe(map((course) => {
        if (course) {
          return new Course(course);
        }
        return null;
      }));
  }
}
