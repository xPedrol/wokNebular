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
  status = ['basic', 'primary', 'info', 'success', 'warning', 'danger', 'control'];

  constructor(
    private windowService: NbWindowService,
    private activatedRoute: ActivatedRoute,
    public sF: SharedFunctions
  ) {
  }

  ngOnInit(): void {
    this.authorities = this.activatedRoute.snapshot.data.authorities;
    if (this.authorities && this.authorities.includes(Authority.TEACHER)) {
      this.isTeacher = true;
    }
    this.activatedRoute.data.pipe(takeUntil(this.destroy$)).subscribe(({course}) => {
      this.course = course;
    });
    this.selectedStatus = Math.floor(Math.random() * 8);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  oi(oi) {
    console.warn(oi);
  }

  // openTopicsWindow(moduleId: number) {
  //   const authorities = this.activatedRoute.snapshot.data.authorities;
  //   this.windowService.open(TopicListComponent, {title: `Lista de tópicos`, context: {authorities, moduleId: 'moduleId'}});
  // }

}
