import {Component, Input, OnInit} from '@angular/core';
import {ICourse} from '../../shared/models/course.model';

@Component({
  selector: 'app-classroom-course-card',
  templateUrl: './classroom-course-card.component.html',
  styleUrls: ['./classroom-course-card.component.scss']
})
export class ClassroomCourseCardComponent implements OnInit {
  @Input() course: ICourse;
  @Input() isTeacher: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
