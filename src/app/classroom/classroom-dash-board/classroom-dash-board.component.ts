import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Authority} from '../../shared/constants/authority.constants';
import {CourseService} from '../../shared/services/course.service';
import {ICourse} from '../../shared/models/course.model';
import {DashboardService} from '../../shared/services/dashboard.service';
import {ISummaryStudent} from '../../shared/models/summary-student.model';
import {NbDialogService} from '@nebular/theme';
import {AddCourseDialogComponent} from '../add-public-course-dialog/add-course-dialog.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-classroom-dash-board',
  templateUrl: './classroom-dash-board.component.html',
  styleUrls: ['./classroom-dash-board.component.scss']
})
export class ClassroomDashBoardComponent implements OnInit, OnDestroy {
  on = true;
  isTeacher = false;
  isParticipating = true;
  courses: ICourse[];
  trainings?: ICourse[];
  showAll = false;
  loadingCourse = true;
  loadingTraining = true;
  loadingSummary = true;
  summary?: ISummaryStudent;
  authorities: Authority[];
  subject$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private dashboardService: DashboardService,
    private dialogService: NbDialogService
  ) {
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }

  ngOnInit(): void {
    this.authorities = this.activatedRoute.snapshot.data.authorities;
    this.getSummary();
    if (this.authorities && this.authorities.includes(Authority.TEACHER)) {
      this.isTeacher = true;
      this.isParticipating = false;
    }
    this.getCourses();
  }

  getSummary(): void {
    this.loadingSummary = true;
    if (this.isParticipating) {
      this.dashboardService.getSummaryStudent().pipe(takeUntil(this.subject$)).subscribe((summary) => {
        this.summary = summary || null;
        this.loadingSummary = false;
      }, () => {
        this.summary = null;
        this.loadingSummary = false;
      });
    } else {
      this.dashboardService.getSummaryTeacher().pipe(takeUntil(this.subject$)).subscribe((summary) => {
        this.summary = summary || null;
        this.loadingSummary = false;
      }, () => {
        this.summary = null;
        this.loadingSummary = false;
      });
    }
  }

  getCourses(refresh = false) {
    this.loadingCourse = true;
    this.loadingTraining = true;
    if (this.isTeacher) {
      if (this.isParticipating) {
        this.getLearningCourses(refresh);
      } else {
        this.getTeachingCourses(refresh);
      }
    } else {
      this.getLearningCourses(refresh);
    }
    this.getSummary();
  }

  getLearningCourses(refresh = false): void {
    this.courseService.getLearningCourses(this.authorities, this.showAll, refresh).pipe(takeUntil(this.subject$))
      .subscribe((courses) => {
        this.divideCourses(courses);
      }, () => {
        this.trainings = [];
        this.courses = [];
        this.loadingCourse = false;
        this.loadingTraining = false;
      });
  }

  getTeachingCourses(refresh = false): void {
    this.courseService.getTeachingCourses(this.authorities, this.showAll, refresh).pipe(takeUntil(this.subject$))
      .subscribe((courses) => {
        this.divideCourses(courses);
      }, () => {
        this.trainings = [];
        this.courses = [];
        this.loadingCourse = false;
        this.loadingTraining = false;
      });
  }

  divideCourses(coursesT: ICourse[]) {
    const trainings: ICourse[] = [];
    const courses: ICourse[] = [];
    if (coursesT && coursesT.length > 0) {
      coursesT.forEach((course: ICourse) => {
        if (course.isTraining()) {
          trainings.push(course);
        } else if (course.isPrivate()) {
          courses.push(course);
        }
      });
    }
    this.trainings = trainings || [];
    this.courses = courses || [];
    this.loadingCourse = false;
    this.loadingTraining = false;
    this.getCourseStatisticsForArrays();
  }

  openAddPublicCourseDialog(isPrivate = false): void {
    this.dialogService.open(AddCourseDialogComponent, {
      context: {
        isPrivate,
        authorities: this.authorities
      },
    }).onClose.pipe(takeUntil(this.subject$)).subscribe((res: any) => {
      if (res?.refresh) {
        this.getCourses(res?.refresh);
      }
    });
  }

  getCourseStatisticsForArrays(): void {
    this.courses.forEach((course, i) => {
      this.getCourseStatistics(course.id, i, true);
    });
    this.trainings.forEach((course, i) => {
      this.getCourseStatistics(course.id, i, false);
    });
  }

  getCourseStatistics(courseId: number, index: number, isPrivate: boolean): void {
    this.courseService.getCourseStatistics(this.authorities, courseId).pipe(takeUntil(this.subject$)).subscribe((statistics) => {
      if (isPrivate) {
        this.courses[index].amountTopics = statistics.amountTopics;
        this.courses[index].amountExercises = statistics.amountExercises;
      } else {
        this.trainings[index].amountTopics = statistics.amountTopics;
        this.trainings[index].amountExercises = statistics.amountExercises;
      }
    });
  }
}
