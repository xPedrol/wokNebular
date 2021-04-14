import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {childrenRoutes} from '../classroom/classroom.routes';
import {ClassroomModule} from '../classroom/classroom.module';

const routes: Routes = [
  {
    path: '',
    children: childrenRoutes
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
export class StudentModule {
}
