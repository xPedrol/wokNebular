import {Moment} from 'moment';
import {IModuleTopic} from './module-topic.model';
import {ICoursebasic} from './basic/course-basic.model';
import {DisciplineBasic, IDisciplineBasic} from './basic/discipline-basic.model';

export interface IModule {
  id: number;
  alias: string;
  activated: boolean;
  createdDate: Moment;
  lastModifiedDate: Moment;
  course: ICoursebasic;
  discipline: IDisciplineBasic;
  topics: IModuleTopic[];
  topicsM: IModuleTopic[][];
}

export class Module implements IModule {
  activated: boolean;
  alias: string;
  course: ICoursebasic;
  createdDate: moment.Moment;
  discipline: IDisciplineBasic;
  id: number;
  lastModifiedDate: moment.Moment;
  topics: IModuleTopic[];
  topicsM: IModuleTopic[][];

  constructor(module: IModule) {
    this.activated = module.activated;
    this.alias = module.alias;
    this.course = module.course;
    this.createdDate = module.createdDate;
    this.discipline = new DisciplineBasic(module.discipline);
    this.id = module.id;
    this.lastModifiedDate = module.lastModifiedDate;
    this.topics = module.topics;
    this.topicsM = module.topicsM;
  }

  getTotalTopics() {
    return this.topics?.length ? this.topics?.length : 0;
  }
}
