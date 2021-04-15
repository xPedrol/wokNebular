import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../shared/services/course.service';
import {ICourse} from '../../shared/models/course.model';
import {IUserTeamBasic} from '../../shared/models/basic/userTeam-basic.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-public-course-dialog',
  templateUrl: './add-public-course-dialog.component.html',
  styleUrls: ['./add-public-course-dialog.component.scss']
})
export class AddPublicCourseDialogComponent implements OnInit {
  options: string[];
  filteredOptions: string[];
  loadingCourses = true;
  selectedCourseName = '';
  selectedCourse: ICourse;
  courses: ICourse[];
  teams: IUserTeamBasic[];
  form: FormGroup;

  constructor(
    private courseService: CourseService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      team: new FormControl(null, [Validators.required])
    });
    this.getPublicCourses();
  }

  getPublicCourses(): void {
    this.loadingCourses = true;
    this.courseService.getPublicCourses().subscribe((courses) => {
      this.courses = courses || [];
      this.options = this.courses.map((course) => {
        return course?.name;
      });
      this.filteredOptions = this.options;
      this.loadingCourses = false;
      console.warn(this.options);
    }, () => this.loadingCourses = false);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  onChange(value: string) {
    this.filteredOptions = this.filter(value);
  }

  onSelectionChange(event) {
    this.getCourseByName(event);
    this.filteredOptions = this.filter(event);
  }

  getCourseByName(value: string) {
    const index = this.options.indexOf(value);
    if (index >= 0) {
      this.selectedCourse = this.courses[index];
    }
  }

}
