import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from '../../app.constants';
import {EMPTY, Observable, of} from 'rxjs';
import {AccountService} from './account.service';
import {map} from 'rxjs/operators';
import {ISummaryStudent, SummaryStudent} from '../models/summary-student.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpService: HttpClient,
    private accountService: AccountService
  ) {
  }

  getSummaryStudent(): Observable<ISummaryStudent> {
    if (this.accountService.account.isStudent()) {
      return this.httpService.get<ISummaryStudent>(`${SERVER_API_URL}account/summaryStudent`).pipe(map((summary) => {
        return new SummaryStudent(summary);
      }));
    } else {
      return EMPTY;
    }
  }

  getSummaryTeacher(): Observable<ISummaryStudent> {
    if (this.accountService.account.isTeacher()) {
      return this.httpService.get<ISummaryStudent>(`${SERVER_API_URL}account/summaryTeacher`).pipe(map((summary) => {
        return new SummaryStudent(summary);
      }));
    } else {
      return EMPTY;
    }
  }

}
