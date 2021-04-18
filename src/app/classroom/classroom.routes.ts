import {ActivatedRouteSnapshot, Resolve, Router, Routes} from '@angular/router';
import {ClassroomContentComponent} from './classroom-content/classroom-content.component';
import {ClassroomDashBoardComponent} from './classroom-dash-board/classroom-dash-board.component';
import {ClassroomCourseComponent} from './classroom-course/classroom-course.component';
import {EMPTY, Observable, of} from 'rxjs';
import {Course, ICourse} from '../shared/models/course.model';
import {mergeMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {CourseService} from '../shared/services/course.service';
import {IModule} from '../shared/models/module.model';
import {ModuleService} from '../shared/services/module.service';
import {ClassroomModuleComponent} from './classroom-module/classroom-module.component';
import {IModuleTopic} from '../shared/models/module-topic.model';
import {ModuleTopicService} from '../shared/services/module-topic.service';
import {CourseResolve, ModuleTopicResolve} from '../shared/resolves';
import {ClassroomTopicComponent} from './classroom-topic/classroom-topic.component';


export const childrenRoutes: Routes = [
  {
    path: 'dashboard',
    component: ClassroomDashBoardComponent
  },
  {
    path: 'classroom',
    children: [
      {
        path: 'course/:courseSlug',
        component: ClassroomCourseComponent,
        resolve: {
          course: CourseResolve
        }
      },
      {
        path: 'course/:courseSlug/module/:disciplineSlug',
        component: ClassroomModuleComponent,
        resolve: {
          moduleTopics: ModuleTopicResolve
        }
      },
      {
        path: 'course/:courseSlug/module/:disciplineSlug/topic/topicSlug',
        component: ClassroomTopicComponent
      }
    ]
  },

];
