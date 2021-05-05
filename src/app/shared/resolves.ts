import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {ICourse} from './models/course.model';
import {CourseService} from './services/course.service';
import {EMPTY, Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {IModule} from './models/module.model';
import {ModuleService} from './services/module.service';
import {IModuleTopic} from './models/module-topic.model';
import {ModuleTopicService} from './services/module-topic.service';

@Injectable({providedIn: 'root'})
export class CourseResolve implements Resolve<ICourse> {
  constructor(private service: CourseService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ICourse> | Observable<never> {
    const slug = route.params?.courseSlug;
    const authorities = route.data.authorities;
    if (slug) {
      return this.service.findCourse(authorities, slug).pipe(
        mergeMap((course: ICourse) => {
          if (course) {
            return of(course);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return EMPTY;
  }
}

// @Injectable({providedIn: 'root'})
// export class ModuleResolve implements Resolve<IModule> {
//   constructor(private service: ModuleService, private router: Router) {
//   }
//
//   resolve(route: ActivatedRouteSnapshot): Observable<IModule> | Observable<never> {
//     const slug = route.params?.courseSlug;
//     const authorities = route.data.authorities;
//     if (slug) {
//       return this.service.getModule(authorities, slug).pipe(
//         mergeMap((module: IModule) => {
//           if (module) {
//             return of(module);
//           } else {
//             this.router.navigate(['404']);
//             return EMPTY;
//           }
//         })
//       );
//     }
//     return EMPTY;
//   }
// }

@Injectable({providedIn: 'root'})
export class ModuleTopicResolve implements Resolve<IModuleTopic[][]> {
  constructor(private service: ModuleTopicService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IModuleTopic[][]> | Observable<never> {
    const disciplineSlug = route.params?.disciplineSlug;
    const courseSlug = route.params?.courseSlug;
    const authorities = route.data.authorities;
    if (courseSlug && disciplineSlug) {
      return this.service.getModuleTopics(authorities, courseSlug, disciplineSlug).pipe(
        mergeMap((mTs: IModuleTopic[][]) => {
          if (mTs) {
            return of(mTs);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return EMPTY;
  }
}
