import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/services/auth-guard.service';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {Authority} from './shared/constants/authority.constants';
import {AccessDeniedComponent} from './shared/components/access-denied/access-denied.component';
import {NoAuthGuard} from './shared/services/no-auth-guard.service';
import {NbOAuth2CallbackComponent} from './auth/nb-oauth2-callback/nb-oauth2-callback.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  // {
  //   path: 'home',
  //   component: HomeComponent
  // },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    data: {
      authorities: [Authority.TEACHER, Authority.USER, Authority.ADMIN]
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
    data: {
      authorities: [Authority.ADMIN, Authority.USER]
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'teacher',
    loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule),
    data: {
      authorities: [Authority.ADMIN, Authority.TEACHER]
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'accessdenied',
    component: AccessDeniedComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
