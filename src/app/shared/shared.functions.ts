import {Injectable} from '@angular/core';
import {AccountService} from './services/account.service';
import {Authority} from './constants/authority.constants';
import {RoutePrefix} from './constants/route-prefix';
import {IBreadcrumb} from './models/breadcrumb.model';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctions {

  constructor(
    public accountService: AccountService
  ) {
  }

  routeAuthSwitch(authorities: Authority[] | string[], noApi = false): RoutePrefix {
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

  isChangedUser(authorities: Authority[]): boolean {
    return !authorities.includes(Authority.TEACHER) && this.accountService.account.isTeacher();
  }
}
