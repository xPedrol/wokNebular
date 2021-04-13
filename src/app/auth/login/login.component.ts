import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {NB_AUTH_OPTIONS, NbAuthService, NbLoginComponent} from '@nebular/auth';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: NbAuthService,
    public cd: ChangeDetectorRef,
    public router: Router,
    @Inject(NB_AUTH_OPTIONS) protected options = {}
  ) {
    super(authService, options, cd, router);
    this.loginForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid) {
      console.warn('valido');
    }
    console.warn('oiii');
  }
}
