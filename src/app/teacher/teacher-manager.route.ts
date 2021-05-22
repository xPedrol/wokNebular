import {Routes} from '@angular/router';
import {ModuleManagerComponent} from './module-manager/module-manager.component';
import {ModuleTopicManagerComponent} from './module-topic-manager/module-topic-manager.component';
import {ModuleTopicExerciseManagerComponent} from './module-topic-exercise-manager/module-topic-exercise-manager.component';

export const childrenManagerRoutes: Routes = [
  {
    path: 'course/:courseSlug/module/:disciplineSlug',
    component: ModuleManagerComponent
  },
  {
    path: 'course/:courseSlug/module/:disciplineSlug/topic/:topicSlug',
    component: ModuleTopicManagerComponent
  },
  {
    path: 'course/:courseSlug/module/:disciplineSlug/topic/:topicSlug/exercise/:exerciseSlug',
    component: ModuleTopicExerciseManagerComponent
  }
];
