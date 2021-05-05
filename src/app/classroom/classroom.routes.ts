import {Routes} from '@angular/router';
import {ClassroomDashBoardComponent} from './classroom-dash-board/classroom-dash-board.component';
import {ClassroomCourseComponent} from './classroom-course/classroom-course.component';
import {ClassroomModuleComponent} from './classroom-module/classroom-module.component';
import {CourseResolve, ModuleTopicResolve} from '../shared/resolves';
import {ClassroomTopicComponent} from './classroom-topic/classroom-topic.component';
import {ClassroomExerciseComponent} from './classroom-exercise/classroom-exercise.component';
import {ClassroomSolutionComponent} from './classroom-solution/classroom-solution.component';


export const childrenRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: ClassroomDashBoardComponent
  },
  {
    path: 'classroom',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
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
        path: 'course/:courseSlug/module/:disciplineSlug/topic/:topicSlug',
        component: ClassroomTopicComponent
      },
      {
        path: 'course/:courseSlug/module/:disciplineSlug/topic/:topicSlug/exercise/:exerciseSlug',
        component: ClassroomExerciseComponent
      },
      {
        path: 'course/:courseSlug/module/:disciplineSlug/topic/:topicSlug/exercise/:exerciseSlug/solution/:solutionSlug',
        component: ClassroomSolutionComponent
      }
    ]
  },

];
