import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassroomContentComponent} from './classroom-content/classroom-content.component';
import {RouterModule} from '@angular/router';
import {ClassroomDashBoardComponent} from './classroom-dash-board/classroom-dash-board.component';
import {SharedModule} from '../shared/shared.module';
import {AddCourseDialogComponent} from './add-public-course-dialog/add-course-dialog.component';
import {ClassroomCourseComponent} from './classroom-course/classroom-course.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CourseRankComponent} from './ranks/course-rank/course-rank.component';
import {TreeViewComponent} from './tree-view/tree-view.component';
import {ClassroomTopicComponent} from './classroom-topic/classroom-topic.component';
import {ClassroomModuleComponent} from './classroom-module/classroom-module.component';
import {ClassroomExerciseComponent} from './classroom-exercise/classroom-exercise.component';
import {ClassroomSubmissionComponent} from './classroom-submission/classroom-submission.component';
import {ClassroomSolutionComponent} from './classroom-solution/classroom-solution.component';
import {ModuleRankComponent} from './ranks/module-rank/module-rank.component';
import {ClassroomCourseCardComponent} from './classroom-course-card/classroom-course-card.component';
import {UsersResultsTablesComponent} from './users-results-tables/users-results-tables.component';
import {UsersResultsTableComponent} from './users-results-tables/users-results-table/users-results-table.component';
import {SubmitExerciseResolutionComponent} from './submit-exercise-resolution/submit-exercise-resolution.component';
import {SubmissionTableComponent} from './submission-table/submission-table.component';
import {ClassroomSubmissionUploadDialogComponent} from './classroom-submission-upload-dialog/classroom-submission-upload-dialog.component';
import {NgxDropzoneModule} from 'ngx-dropzone';

@NgModule({
  declarations: [
    ClassroomContentComponent,
    ClassroomCourseComponent,
    ClassroomDashBoardComponent,
    AddCourseDialogComponent,
    CourseRankComponent,
    TreeViewComponent,
    ClassroomTopicComponent,
    ClassroomModuleComponent,
    ClassroomExerciseComponent,
    ClassroomSubmissionComponent,
    ClassroomSolutionComponent,
    ModuleRankComponent,
    ClassroomCourseCardComponent,
    UsersResultsTablesComponent,
    UsersResultsTableComponent,
    SubmitExerciseResolutionComponent,
    SubmissionTableComponent,
    ClassroomSubmissionUploadDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ],
  exports: [
    ClassroomContentComponent,
    SharedModule,
    ModuleRankComponent,
    SubmissionTableComponent
  ]
})
export class ClassroomModule {
}
