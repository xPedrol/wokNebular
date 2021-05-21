import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbWindowService} from '@nebular/theme';
import {ActivatedRoute} from '@angular/router';
import {Authority} from '../../shared/constants/authority.constants';
import {ICourse} from '../../shared/models/course.model';
import {IModule} from '../../shared/models/module.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SharedFunctions} from '../../shared/shared.functions';
import {UserRankService} from '../../shared/services/user-rank.service';
import {IUserRank} from '../../shared/models/user-rank.model';

@Component({
  selector: 'app-classroom-dashboard',
  templateUrl: './classroom-course.component.html',
  styleUrls: ['./classroom-course.component.scss']
})
export class ClassroomCourseComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  authorities: Authority[];
  isTeacher = false;
  course: ICourse;
  modules: IModule[];
  routePrefix = '/';
  loadingCourse = true;
  courseRank: IUserRank[];
  loadingCourseRank = false;

  constructor(
    private windowService: NbWindowService,
    private activatedRoute: ActivatedRoute,
    private rankService: UserRankService,
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

  changeTab(event: any): void {
    if (event.tabId === 2) {
      this.getCourseRank();
    }
  }

  getCourseRank(): void {
    this.loadingCourseRank = true;
    this.rankService.getCourseRank(this.course.id).pipe(takeUntil(this.destroy$)).subscribe((rank) => {
      this.courseRank = rank || null;
      this.loadingCourseRank = false;
    }, () => {
      this.courseRank = null;
      this.loadingCourseRank = false;
    });
  }
}
