import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassroomContentComponent} from './classroom-content/classroom-content.component';
import {RouterModule} from '@angular/router';
import {ClassroomDashBoardComponent} from './classroom-dash-board/classroom-dash-board.component';
import {SharedModule} from '../shared/shared.module';
import {AddCourseDialogComponent} from './add-public-course-dialog/add-course-dialog.component';
import {ClassroomCourseComponent} from './classroom-course/classroom-course.component';
import {ReactiveFormsModule} from '@angular/forms';
import { CourseRankComponent } from './ranks/course-rank/course-rank.component';
import {TreeViewComponent} from './tree-view/tree-view.component';
import { ClassroomTopicComponent } from './classroom-topic/classroom-topic.component';
import { ClassroomModuleComponent } from './classroom-module/classroom-module.component';
import {BreadcrumbModule} from 'xng-breadcrumb';

@NgModule({
  declarations: [
    ClassroomContentComponent,
    ClassroomCourseComponent,
    ClassroomDashBoardComponent,
    AddCourseDialogComponent,
    CourseRankComponent,
    TreeViewComponent,
    ClassroomTopicComponent,
    ClassroomModuleComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
        BreadcrumbModule,
    ],
  exports: [
    ClassroomContentComponent,
    SharedModule
  ]
})
export class ClassroomModule {
}
