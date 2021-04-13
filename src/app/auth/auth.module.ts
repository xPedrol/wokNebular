import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {SharedThemeModuleModule} from '../@theme/shared-theme-module.module';
import {RouterModule, Routes} from '@angular/router';
import {NbAuthComponent, NbAuthModule} from '@nebular/auth';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent, // <---
  },
  {
    path: 'register',
    component: RegisterComponent, // <---
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedThemeModuleModule,
    NbAuthModule.forRoot(),
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {
}
