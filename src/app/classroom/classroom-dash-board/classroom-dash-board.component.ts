import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Authority} from '../../shared/constants/authority.constants';
import {CourseService} from '../../shared/services/course.service';
import {ICourse} from '../../shared/models/course.model';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService
  ) {
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.data.authorities.includes(Authority.TEACHER)) {
      this.isTeacher = true;
      this.getCourses();
    }
  }

  getCourses() {
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
      });
  }

  getTeachingCourses(): void {
    this.courseService.getTeachingCourses(this.showAll)
      .subscribe((courses) => {
        this.divideCourses(courses);
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
  }

}
