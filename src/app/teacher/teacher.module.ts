import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {childrenRoutes} from '../classroom/classroom.routes';
import {ClassroomModule} from '../classroom/classroom.module';
import {ModuleManagerComponent} from './module-manager/module-manager.component';
import {childrenManagerRoutes} from './teacher-manager.route';

const routes: Routes = [
  {
    path: '',
    children: childrenRoutes
  },
  {
    path: 'manager',
    children: childrenManagerRoutes
  }
];

@NgModule({
  declarations: [
    ModuleManagerComponent
  ],
  imports: [
    CommonModule,
    ClassroomModule,
    RouterModule.forChild(routes)
  ]
})
export class TeacherModule {
}
