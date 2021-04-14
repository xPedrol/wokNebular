import {Moment} from 'moment';
import {IModuleTopic} from './module-topic.model';
import {ICoursebasic} from './basic/course-basic.model';
import {IDisciplineBasic} from './basic/discipline-basic.model';

export interface IModule {
  id?: number;
  alias?: string;
  activated?: boolean;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  course?: ICoursebasic;
  discipline?: IDisciplineBasic;
  topics?: IModuleTopic[];
  topicsM?: IModuleTopic[][];
}

export class Module implements IModule {
  constructor(
    public id?: number,
    public alias?: string,
    public activated?: boolean,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public course?: ICoursebasic,
    public discipline?: IDisciplineBasic,
    public topics?: IModuleTopic[],
    public topicsM?: IModuleTopic[][]
  ) {
    this.activated = this.activated || false;
  }
}
