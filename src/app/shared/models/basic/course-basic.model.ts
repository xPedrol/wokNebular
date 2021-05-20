import {Moment} from 'moment';
import {IAffiliationBasic} from './affiliation-basic.model';
import {IUserBasic} from '../user/user-basic.model';

export interface ICoursebasic {
  id?: number;
  name?: string;
  affiliation?: IAffiliationBasic;
  teacher?: IUserBasic;
  startDate?: Moment;
  endTime?: Moment;
}

export class Coursebasic implements ICoursebasic {
  affiliation: IAffiliationBasic;
  endTime: moment.Moment;
  id: number;
  name: string;
  startDate: moment.Moment;
  teacher: IUserBasic;

  constructor(course: ICoursebasic) {
    this.affiliation = course.affiliation;
    this.endTime = course.endTime;
    this.id = course.id;
    this.name = course.name;
    this.startDate = course.startDate;
    this.teacher = course.teacher;
  }

}
