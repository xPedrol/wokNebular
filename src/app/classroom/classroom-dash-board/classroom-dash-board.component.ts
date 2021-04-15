import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Authority} from '../../shared/constants/authority.constants';
import {CourseService} from '../../shared/services/course.service';
import {ICourse} from '../../shared/models/course.model';
import {DashboardService} from '../../shared/services/dashboard.service';
import {ISummaryStudent} from '../../shared/models/summary-student.model';
import {NbDialogService} from '@nebular/theme';
import {AddPublicCourseDialogComponent} from '../add-public-course-dialog/add-public-course-dialog.component';

@Component({
  selector: 'app-classroom-dash-board',
  templateUrl: './classroom-dash-board.component.html',
  styleUrls: ['./classroom-dash-board.component.scss']
})
export class ClassroomDashBoardComponent implements OnInit {
  on = true;
  isTeacher = false;
  isParticipating = false;
  courses: ICourse[];
  trainings?: ICourse[];
  showAll = false;
  loadingCourse = true;
  loadingTraining = true;
  loadingSummary = true;
  summary?: ISummaryStudent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private dashboardService: DashboardService,
    private dialogService: NbDialogService
  ) {
  }

  ngOnInit(): void {
    this.getSummary();
    if (this.activatedRoute.snapshot.data.authorities.includes(Authority.TEACHER)) {
      this.isTeacher = true;
      this.getCourses();
    }
  }

  getSummary(): void {
    this.loadingSummary = true;
    this.dashboardService.getSummaryStudent().subscribe((summary) => {
      this.summary = summary || null;
      this.loadingSummary = false;
    }, () => {
      this.summary = null;
      this.loadingSummary = false;
    });
  }

  getCourses() {
    this.loadingCourse = true;
    this.loadingTraining = true;
    if (this.isTeacher) {
      if (this.isParticipating) {
        this.getLearningCourses();
      } else {
        this.getTeachingCourses();
      }
    } else {
      this.getLearningCourses();
    }
  }

  getLearningCourses(): void {
    this.courseService.getCourses(this.showAll)
      .subscribe((courses) => {
        this.divideCourses(courses);
      }, () => {
        this.trainings = [];
        this.courses = [];
        this.loadingCourse = false;
        this.loadingTraining = false;
      });
  }

  getTeachingCourses(): void {
    this.courseService.getTeachingCourses(this.showAll)
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
  }

  openAddPublicCourseDialog(): void {
    this.dialogService.open(AddPublicCourseDialogComponent);
  }

}
