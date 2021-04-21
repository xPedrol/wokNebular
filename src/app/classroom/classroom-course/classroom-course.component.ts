import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbWindowService} from '@nebular/theme';
import {ActivatedRoute} from '@angular/router';
import {Authority} from '../../shared/constants/authority.constants';
import {ICourse} from '../../shared/models/course.model';
import {IModule} from '../../shared/models/module.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SharedFunctions} from '../../shared/shared.functions';

@Component({
  selector: 'app-classroom-dashboard',
  templateUrl: './classroom-course.component.html',
  styleUrls: ['./classroom-course.component.scss']
})
export class ClassroomCourseComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  selectedStatus = 0;
  authorities: Authority[];
  isTeacher = false;
  course: ICourse;
  modules: IModule[];
  routePrefix = '/';
  loadingCourse = true;

  constructor(
    private windowService: NbWindowService,
    private activatedRoute: ActivatedRoute,
    public sF: SharedFunctions
  ) {
  }

  ngOnInit(): void {
    this.authorities = this.activatedRoute.snapshot.data.authorities;
    this.routePrefix += this.sF.routeAuthSwitch(this.authorities, true);
    if (this.authorities && this.authorities.includes(Authority.TEACHER)) {
      this.isTeacher = true;
    }
    this.loadingCourse = true;
    this.activatedRoute.data.pipe(takeUntil(this.destroy$)).subscribe(({course}) => {
      this.loadingCourse = false;
      this.course = course || null;
    }, () => this.loadingCourse = false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
