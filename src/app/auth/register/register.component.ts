import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IUserAuth, UserAuth} from '../../shared/models/user/UserLogin.model';
import {AffiliationBasic, IAffiliationBasic} from '../../shared/models/basic/affiliation-basic.model';
import {AffiliationService} from '../../shared/services/affiliation.service';
import {AuthService} from '../../shared/services/auth.service';
import {LanguageKey} from '../../shared/models/enumerations/language-key.model';
import {NbToastrService} from '@nebular/theme';
import {NbAuthSocialLink} from '@nebular/auth';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showPassword = false;
  showCPassword = false;
  registerForm: FormGroup;
  affiliations: IAffiliationBasic[];
  socialLinks: NbAuthSocialLink[];
  submitted = false;
  subject$ = new Subject();
  constructor(
    private authService: AuthService,
    public router: Router,
    private affiliationService: AffiliationService,
    private toastService: NbToastrService
  ) {
    this.registerForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required, this.passwordValidation]),
      affiliation: new FormControl(null, [Validators.required]),
      agreeTerms: new FormControl(false, [Validators.requiredTrue])
    });
  }

  ngOnInit(): void {
    this.getAllAffiliations();
  }

  register(): void {
    if (this.registerForm.valid) {
      this.submitted = true;
      this.authService
        .register(this.getUserFromForm()).pipe(takeUntil(this.subject$))
        .subscribe(
          () => {
            this.toastService.show('', 'Registrado com sucesso', {status: 'success'});
            this.router.navigate(['auth/login'], {queryParams: {justSignedUp: 'true'}});
            this.submitted = false;
          }, () => this.submitted = false
        );
    }
  }

  getUserFromForm(): IUserAuth {
    const user: IUserAuth = new UserAuth();
    user.login = this.registerForm.get(['login']).value;
    user.email = this.registerForm.get(['email']).value;
    user.agreeTerms = this.registerForm.get(['agreeTerms']).value;
    user.company = {
      ...new AffiliationBasic(
        this.registerForm.get(['affiliation']).value
      ),
    };
    user.password = this.registerForm.get(['password']).value;
    // @ts-ignore
    user.langKey = 'pt-br';
    return user;
  }

  getAllAffiliations(): void {
    const options = {
      size: 1000,
    };
    this.affiliationService
      .getAllAffiliation(options).pipe(takeUntil(this.subject$))
      .subscribe((affiliations: IAffiliationBasic[]) => {
        this.affiliations = affiliations || [];
      });
  }

  passwordValidation = (confirmPassword: FormControl): any => {
    if (this.registerForm) {
      console.warn('teste');
      if (confirmPassword.value !== this.registerForm.get('password')?.value) {
        return {
          passwordCheck: true
        };
      }
    }
    return null;
  }
}
