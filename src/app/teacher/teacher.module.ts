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
import { ModuleTopicExerciseManagerComponent } from './module-topic-exercise-manager/module-topic-exercise-manager.component';
import { ModuleTopicExerciseScenarioTableComponent } from './module-topic-exercise-scenario-table/module-topic-exercise-scenario-table.component';
import { ScenarioSkillsDialogComponent } from './scenario-skills-dialog/scenario-skills-dialog.component';

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
    ModuleTopicExerciseTableComponent,
    ModuleTopicExerciseManagerComponent,
    ModuleTopicExerciseScenarioTableComponent,
    ScenarioSkillsDialogComponent
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
