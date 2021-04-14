import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {NB_AUTH_OPTIONS, NbAuthService, NbAuthSocialLink, NbLoginComponent} from '@nebular/auth';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from 'ngx-webstorage';
import {AuthService} from '../../shared/services/auth.service';
import {IUserLogin, UserLogin} from '../../shared/models/user/UserLogin.model';
import {Account} from '../../shared/models/user/account.model';
import {AccountService} from '../../shared/services/account.service';

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
    public cd: ChangeDetectorRef,
    public router: Router,
    private authService: AuthService,
    private accountService: AccountService,
    private localStorage: LocalStorageService,
    @Inject(NB_AUTH_OPTIONS) protected options = {}
  ) {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid) {
      this.submitted = true;
      this.authService.login(this.getUserFromForm()).subscribe(() => {
        let urlBack: string = this.localStorage.retrieve('url_back');
        if (urlBack) {
          urlBack = urlBack.replace('student', `${this.accountService.account.isTeacher() ? 'teacher' : 'student'}`).replace('teacher', `${this.accountService.account.isTeacher() ? 'teacher' : 'student'}`);
          console.warn(urlBack);
          this.router.navigateByUrl(this.localStorage.retrieve(urlBack));
          this.localStorage.clear('url_back');
        } else {
          console.warn(this.accountService.account.isTeacher());
          this.router.navigateByUrl(`/${this.accountService.account.isTeacher() ? 'teacher' : 'student'}/dashboard`);
        }
      });

    }
  }

  getUserFromForm(): IUserLogin {
    const user: IUserLogin = new UserLogin();
    user.username = this.loginForm.get('login').value;
    user.password = this.loginForm.get('password').value;
    return user;
  }
}
