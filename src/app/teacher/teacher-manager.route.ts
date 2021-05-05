import {Routes} from '@angular/router';
import {ModuleManagerComponent} from './module-manager/module-manager.component';

export const childrenManagerRoutes: Routes = [
  {
    path: 'course/:courseSlug/module/:disciplineSlug',
    component: ModuleManagerComponent
  }
];
