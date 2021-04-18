import {Injectable} from '@angular/core';
import {AccountService} from './services/account.service';
import {Authority} from './constants/authority.constants';
import {RoutePrefix} from './constants/route-prefix';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctions {

  constructor(public accountService: AccountService) {
  }

  routeAuthSwitch(authorities: Authority[], noApi = false): RoutePrefix {
    if (authorities.includes(Authority.TEACHER)) {
      if (this.accountService.account.isTeacher()) {
        return RoutePrefix.TEACHER;
      }
    } else if (authorities.includes(Authority.USER)) {
      if (this.accountService.account.isStudent()) {
        if (noApi) {
          return RoutePrefix.STUDENT_NO_API;
        }
        return RoutePrefix.STUDENT;
      }
    }
    return RoutePrefix.UNSET;
  }
}
