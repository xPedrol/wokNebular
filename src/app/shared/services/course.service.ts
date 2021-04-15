import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from '../../app.constants';
import {Course, ICourse} from '../models/course.model';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AccountService} from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
  }

  getCourses(all: boolean = false): Observable<ICourse[]> {
    if (this.accountService.account.isStudent()) {
      const url = `account/courses?all=${all}`;
      return this.http.get<ICourse[]>(`${SERVER_API_URL}${url}`).pipe(map((courses) => {
        return courses.map((course: ICourse) => {
          return new Course(course);
        });
      }));
    }
    return of([]);
  }

  getTeachingCourses(all: boolean = false): Observable<ICourse[]> {
    if (this.accountService.account.isTeacher()) {
      const url = `teacher/courses?all=${all}`;
      return this.http.get<ICourse[]>(`${SERVER_API_URL}${url}`).pipe(map((courses) => {
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
}
