import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassroomContentComponent} from './classroom-content/classroom-content.component';
import {ClassroomInitialComponent} from './classroom-initial/classroom-initial.component';
import {SharedThemeModuleModule} from '../@theme/shared-theme-module.module';
import {RouterModule} from '@angular/router';
import {TopicListComponent} from './topic-list/topic-list.component';
import {ClassroomDashBoardComponent} from './classroom-dash-board/classroom-dash-board.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ClassroomContentComponent,
    ClassroomInitialComponent,
    TopicListComponent,
    ClassroomDashBoardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    ClassroomContentComponent,
    SharedModule,
    TopicListComponent
  ]
})
export class ClassroomModule {
}
