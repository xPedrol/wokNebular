import {Moment} from 'moment';
import {IAffiliationBasic} from './affiliation-basic.model';
import {IUserBasic} from '../user/user-basic.model';

export interface ICoursebasic {
  id?: number;
  name?: string;
  affiliation?: IAffiliationBasic;
  teacher?: IUserBasic;
  startDate?: Moment;
  endDate?: Moment;
}

export class Coursebasic implements ICoursebasic {
  affiliation: IAffiliationBasic;
  endDate: Moment;
  id: number;
  name: string;
  startDate: Moment;
  teacher: IUserBasic;

  constructor(course: ICoursebasic) {
    this.affiliation = course.affiliation;
    this.endDate = course.endDate;
    this.id = course.id;
    this.name = course.name;
    this.startDate = course.startDate;
    this.teacher = course.teacher;
  }

}
