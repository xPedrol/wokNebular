import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Authority} from '../../shared/constants/authority.constants';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Course, ICourse} from '../../shared/models/course.model';
import {CourseService} from '../../shared/services/course.service';
import {ActivatedRoute} from '@angular/router';
import {SharedFunctions} from '../../shared/shared.functions';
import {DATE_TIME_FORMAT} from '../../shared/constants/input.constants';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {AddModuleDialogComponent} from '../add-module-dialog/add-module-dialog.component';
import * as moment from 'moment'

@Component({
  selector: 'app-course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.scss']
})
export class CourseManagerComponent implements OnInit {
  subject = new Subject();
  courseSlug: string;
  authorities: Authority[];
  loadingCourse = true;
  routePrefix = '/';
  courseForm: FormGroup;
  course: ICourse;

  constructor(
    private courseService: CourseService,
    public sF: SharedFunctions,
    private activatedRoute: ActivatedRoute,
    private dialogService: NbDialogService,
    private toastService: NbToastrService
  ) {
  }

  ngOnInit(): void {
    this.courseForm = new FormGroup({
      passcode: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      activated: new FormControl(null)
    });
    this.authorities = this.activatedRoute.snapshot.data.authorities;
    this.routePrefix += this.sF.routeAuthSwitch(this.authorities, true);
    this.courseSlug = this.activatedRoute.snapshot.params.courseSlug;
    this.findCourse();
  }

  saveCourse() {
    if (this.courseForm.valid) {
      const course = this.getCourseFromForm();
      this.courseService.updateCourseByTeacher(course).subscribe((course1) => {
        this.course = course1;
        this.toastService.show('', 'Editado com sucesso', {status: 'success'});
      });
    }
  }

  getCourseFromForm(): ICourse {
    const course: ICourse = new Course();
    course.id = this.course.id;
    course.passcode = this.courseForm.get('passcode').value;
    course.startDate = moment(this.courseForm.get('startDate').value);
    course.endDate = moment(this.courseForm.get('endDate').value);
    course.activated = !!this.courseForm.get('activated').value;
    return course;
  }

  findCourse(): void {
    this.loadingCourse = true;
    this.courseService.findCourse(this.authorities, this.courseSlug).subscribe((course) => {
      this.course = course || undefined;
      this.loadingCourse = false;
      this.updateForm();
    }, () => this.loadingCourse = false);
  }

  updateForm() {
    this.courseForm.get('startDate').setValue(this.course.startDate.format(DATE_TIME_FORMAT));
    this.courseForm.get('endDate').setValue(this.course.endDate.format(DATE_TIME_FORMAT));
    this.courseForm.get('passcode').setValue(this.course.passcode);
    this.courseForm.get('activated').setValue(this.course.activated ? this.course.activated : false);
  }

  openAddModuleDialog(): void {
    this.dialogService.open(AddModuleDialogComponent);
  }
}
