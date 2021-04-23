import {Injectable} from '@angular/core';
import {AccountService} from './account.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SharedFunctions} from '../shared.functions';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private sF: SharedFunctions,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.getAccount().pipe(
      map((account) => {
        if (account && account.id) {
          this.router.navigateByUrl(`${this.sF.routeAuthSwitch(account.authorities, true)}dashboard`);
          return false;
        } else {
          return true;
        }
      }),
      catchError(() => {
        return of(true);
      }));
  }
}
