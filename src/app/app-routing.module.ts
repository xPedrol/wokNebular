import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/services/auth-guard.service';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {Authority} from './shared/constants/authority.constants';
import {AccessDeniedComponent} from './shared/components/access-denied/access-denied.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
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
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
