import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from '../../app.constants';
import {EMPTY, Observable, of} from 'rxjs';
import {AccountService} from './account.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpService: HttpClient,
    private accountService: AccountService
  ) {
  }

  getSummaryStudent(): Observable<any> {
    if (this.accountService.account.isStudent()) {
      return this.httpService.get(`${SERVER_API_URL}account/summaryStudent`);
    } else {
      return EMPTY;
    }
  }

}
