import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../shared/services/course.service';
import {ICourse} from '../../shared/models/course.model';
import {IUserTeamBasic} from '../../shared/models/basic/userTeam-basic.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {Authority} from '../../shared/constants/authority.constants';

@Component({
  selector: 'app-add-public-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.scss']
})
export class AddCourseDialogComponent implements OnInit {
  options: string[];
  filteredOptions: string[];
  loadingCourses = true;
  selectedCourseName = '';
  selectedCourse: ICourse;
  courses: ICourse[];
  userTeams: IUserTeamBasic[];
  form: FormGroup;
  isPrivate = false;
  authorities: Authority[];

  constructor(
    // private dialogConfig: NbDialogConfig,
    private courseService: CourseService,
    private userService: UserService,
    private toastService: NbToastrService,
    public dialogRef: NbDialogRef<AddCourseDialogComponent>
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      team: new FormControl(null, [Validators.required])
    });
    this.getPublicCourses();
    this.getUserTeams();
  }

  getUserTeams(): void {
    this.userService.getUserTeamsByAccount().subscribe(userTeams => {
      this.userTeams = userTeams || [];
    });
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
      this.form.get('code').setValue(this.selectedCourse.passcode);
    }
  }

  registerIntoCourse() {
    if (this.form.valid) {
      this.courseService.registerIntoCourse(this.authorities, this.form.get('code').value, this.form.get('team').value).subscribe(() => {
        this.toastService.show('', 'Registrado com sucesso', {status: 'success'});
        this.dialogRef.close({refresh: true});
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

}
