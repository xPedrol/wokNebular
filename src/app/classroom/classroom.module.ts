import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassroomContentComponent} from './classroom-content/classroom-content.component';
import {ClassroomInitialComponent} from './classroom-initial/classroom-initial.component';
import {RouterModule} from '@angular/router';
import {TopicListComponent} from './topic-list/topic-list.component';
import {ClassroomDashBoardComponent} from './classroom-dash-board/classroom-dash-board.component';
import {SharedModule} from '../shared/shared.module';
import { AddPublicCourseDialogComponent } from './add-public-course-dialog/add-public-course-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ClassroomContentComponent,
    ClassroomInitialComponent,
    TopicListComponent,
    ClassroomDashBoardComponent,
    AddPublicCourseDialogComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
    ],
  exports: [
    ClassroomContentComponent,
    SharedModule,
    TopicListComponent
  ]
})
export class ClassroomModule {
}
