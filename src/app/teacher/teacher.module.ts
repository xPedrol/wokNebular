import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {childrenRoutes} from '../classroom/classroom.routes';
import {Authority} from '../shared/constants/authority.constants';
import {ClassroomModule} from '../classroom/classroom.module';

const routes: Routes = [
  {
    path: '',
    children: childrenRoutes,
    data: {
      authorities: [Authority.ADMIN, Authority.USER]
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClassroomModule,
    RouterModule.forChild(routes)
  ]
})
export class TeacherModule {
}
