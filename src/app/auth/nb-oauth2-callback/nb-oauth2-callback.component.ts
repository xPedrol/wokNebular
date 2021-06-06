import {Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {NbAuthResult, NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-nb-oauth2-callback',
  templateUrl: './nb-oauth2-callback.component.html',
  styleUrls: ['./nb-oauth2-callback.component.scss']
})
export class NbOAuth2CallbackComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(
    private nbAuthService: NbAuthService,
    private router: Router,
    private authService: AuthService
  ) {
    this.nbAuthService.authenticate('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
        // console.warn(authResult.getToken().getPayload());
        this.authService.getUserByGoogleToken(authResult.getToken());
        // if (authResult.isSuccess()) {
        //   this.router.navigateByUrl('/pages/dashboard');
        // }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
