import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NB_AUTH_OPTIONS, NbAuthService, NbRegisterComponent} from '@nebular/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends NbRegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(
    private authService: NbAuthService,
    public cd: ChangeDetectorRef,
    public router: Router,
    @Inject(NB_AUTH_OPTIONS) protected options = {}
  ) {
    super(authService, options, cd, router);
    this.registerForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      affiliation: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  register(): void {
    if (this.registerForm.valid) {
      console.warn('valido');
    }
    console.warn('oiii');
  }
}
