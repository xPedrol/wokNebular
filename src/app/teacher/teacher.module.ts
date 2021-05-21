import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {childrenRoutes} from '../classroom/classroom.routes';
import {ClassroomModule} from '../classroom/classroom.module';
import {ModuleManagerComponent} from './module-manager/module-manager.component';
import {childrenManagerRoutes} from './teacher-manager.route';
import {EditModuleTopicsTableComponent} from './edit-module-topics-table/edit-module-topics-table.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ModuleTopicManagerComponent } from './module-topic-manager/module-topic-manager.component';
import { ModuleTopicExerciseTableComponent } from './module-topic-exercise-table/module-topic-exercise-table.component';

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
    ModuleManagerComponent,
    EditModuleTopicsTableComponent,
    ModuleTopicManagerComponent,
    ModuleTopicExerciseTableComponent
  ],
    imports: [
        CommonModule,
        ClassroomModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ]
})
export class TeacherModule {
}
