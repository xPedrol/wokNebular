import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {NB_AUTH_OPTIONS, NbAuthService, NbAuthSocialLink, NbLoginComponent} from '@nebular/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from 'ngx-webstorage';
import {AuthService} from '../../shared/services/auth.service';
import {AccountService} from '../../shared/services/account.service';
import {IUserAuth, UserAuth} from '../../shared/models/user/UserLogin.model';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;
  socialLinks: NbAuthSocialLink[];
  showPassword = false;
  justSignedUp = false;
  subject$ = new Subject();

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(
    public router: Router,
    private authService: AuthService,
    private accountService: AccountService,
    private localStorage: LocalStorageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.justSignedUp = this.activatedRoute.snapshot.queryParams?.justSignedUp;
  }

  login(): void {
    if (this.loginForm.valid) {
      this.submitted = true;
      this.authService.login(this.getUserFromForm()).pipe(takeUntil(this.subject$)).subscribe(() => {
        let urlBack: string = this.localStorage.retrieve('url_back');
        if (urlBack) {
          urlBack = urlBack.replace('student', `${this.accountService.account.isTeacher() ? 'teacher' : 'student'}`).replace('teacher', `${this.accountService.account.isTeacher() ? 'teacher' : 'student'}`);
          this.router.navigateByUrl(urlBack);
          this.localStorage.clear('url_back');
        } else {
          this.router.navigateByUrl(`/${this.accountService.account.isTeacher() ? 'teacher' : 'student'}/dashboard`);
        }
      });

    }
  }

  getUserFromForm(): IUserAuth {
    const user: IUserAuth = new UserAuth();
    user.username = this.loginForm.get('login').value;
    user.password = this.loginForm.get('password').value;
    return user;
  }
}
