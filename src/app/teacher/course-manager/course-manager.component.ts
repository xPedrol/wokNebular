import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Authority} from '../../shared/constants/authority.constants';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ICourse} from '../../shared/models/course.model';
import {CourseService} from '../../shared/services/course.service';
import {ActivatedRoute} from '@angular/router';
import {SharedFunctions} from '../../shared/shared.functions';
import {DATE_TIME_FORMAT} from '../../shared/constants/input.constants';
import {NbDialogService} from "@nebular/theme";
import {AddModuleDialogComponent} from "../add-module-dialog/add-module-dialog.component";

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
    private dialogService: NbDialogService
  ) {
  }

  ngOnInit(): void {
    this.authorities = this.activatedRoute.snapshot.data.authorities;
    this.routePrefix += this.sF.routeAuthSwitch(this.authorities, true);
    this.courseSlug = this.activatedRoute.snapshot.params.courseSlug;
    this.findCourse();
    this.courseForm = new FormGroup({
      passcode: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      activated: new FormControl(null)
    });
  }

  saveCourse() {

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
