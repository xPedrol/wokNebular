import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AccountService} from './account.service';
import {catchError, map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import {NbToastrService} from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router,
    private localStorage: LocalStorageService,
    private toastrService: NbToastrService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.getAccount().pipe(
      map((account) => {
        if (account && account.id) {
          if (this.accountService.hasAnyAuthority(route.data.authorities)) {
            return true;
          } else {
            this.showErrorMessage(state.url);
          }
        } else {
          this.showErrorMessage(state.url);
          return false;
        }
      }),
      catchError(() => {
        this.showErrorMessage(state.url);
        return of(false);
      }));
  }

  showErrorMessage(url: string) {
    this.toastrService.show(`Você não tem acesso à pagina ${url}`, 'Acesso negado', {status: 'danger'});
    this.localStorage.store('url_back', url);
    this.router.navigateByUrl('/accessdenied');
  }
}
