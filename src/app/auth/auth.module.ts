import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {SharedThemeModuleModule} from '../@theme/shared-theme-module.module';
import {RouterModule, Routes} from '@angular/router';
import {NbAuthModule, NbOAuth2AuthStrategy, NbOAuth2ResponseType} from '@nebular/auth';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NbOAuth2CallbackComponent} from './nb-oauth2-callback/nb-oauth2-callback.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent, // <---
  },
  {
    path: 'register',
    component: RegisterComponent, // <---
  },
  {
    path: 'google/callback',
    component: NbOAuth2CallbackComponent,
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NbOAuth2CallbackComponent
  ],
  imports: [
    CommonModule,
    SharedThemeModuleModule,
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'google',
          clientId: '629837693052-mt102d6j24s4ubapiatvt8162hbkd21k.apps.googleusercontent.com',
          clientSecret: '',
          authorize: {
            endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            responseType: NbOAuth2ResponseType.TOKEN,
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
            redirectUri: 'http://localhost:8080/auth/google/callback'
          },
        }),
      ],
    }),
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {
}
