import {Routes} from '@angular/router';
import {ClassroomInitialComponent} from './classroom-initial/classroom-initial.component';
import {ClassroomContentComponent} from './classroom-content/classroom-content.component';
import {ClassroomDashBoardComponent} from './classroom-dash-board/classroom-dash-board.component';

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
        component: ClassroomInitialComponent
      },
      {
        path: 'module/:moduleSlug',
        component: ClassroomContentComponent
      },
      {
        path: 'content',
        component: ClassroomContentComponent
      }
    ]
  },

];
