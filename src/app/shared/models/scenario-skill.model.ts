import { Moment } from 'moment';
import {IScenarioBasic} from './basic/scenario-basic.model';
import {ISkillBasic} from './basic/skill-basic.model';

export interface IScenarioSkill {
  id?: number;
  points?: number;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  testScenario?: IScenarioBasic;
  skill?: ISkillBasic;
}

export class ScenarioSkill implements IScenarioSkill {
  constructor(
    public id?: number,
    public points?: number,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public testScenario?: IScenarioBasic,
    public skill?: ISkillBasic
  ) {}
}
