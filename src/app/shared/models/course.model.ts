import {CourseType} from './enumerations/course-type.model';
import {IModule, Module} from './module.model';
import {IAffiliationBasic} from './basic/affiliation-basic.model';
import {IUserBasic, UserBasic} from './user/user-basic.model';
import {Moment} from 'moment';
import * as moment from 'moment';

export interface ICourse {
  id: number;
  name: string;
  description: string;
  passcode: string;
  courseType: CourseType;
  activated: boolean;
  createdDate: Moment;
  startDate: Moment;
  endDate: Moment;
  lastModifiedDate: Moment;
  modules: IModule[];
  affiliation: IAffiliationBasic;
  teacher: IUserBasic;
  slug: string;
  amountTopics: number;
  amountExercises: number;

  isTraining(): boolean;

  isPrivate(): boolean;
}

export class Course implements ICourse {
  constructor(course?: ICourse) {
    if (course) {
      this.activated = course.activated;
      this.affiliation = course.affiliation;
      this.courseType = course.courseType;
      this.createdDate = moment(course.createdDate);
      this.description = course.description;
      this.endDate = moment(course.endDate);
      this.id = course.id;
      this.lastModifiedDate = moment(course.lastModifiedDate);
      this.modules = course.modules;
      this.name = course.name;
      this.passcode = course.passcode;
      this.slug = course.slug;
      this.startDate = moment(course.startDate);
      this.teacher = new UserBasic(course.teacher);
      if (this.modules && this.modules.length > 0) {
        this.modules = this.modules.map((module) => {
          return new Module(module);
        });
      }
    }
  }

  activated: boolean;
  affiliation: IAffiliationBasic;
  courseType: CourseType;
  createdDate: moment.Moment;
  description: string;
  endDate: moment.Moment;
  id: number;
  lastModifiedDate: moment.Moment;
  modules: IModule[];
  name: string;
  passcode: string;
  slug: string;
  startDate: moment.Moment;
  teacher: IUserBasic;
  amountExercises: number;
  amountTopics: number;

  isTraining(): boolean {
    return this.courseType === CourseType.TEST || this.courseType === CourseType.PUBLIC;
  }

  isPrivate(): boolean {
    return this.courseType === CourseType.PRIVATE;
  }
}
