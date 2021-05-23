import {Moment} from 'moment';
import {IModuleTopicExerciseBasic} from './basic/moduleTopicExercise-basic.model';
import {IScenarioBasic, ScenarioBasic} from './basic/scenario-basic.model';

export interface IModuleTopicExerciseScenario {
  id?: number;
  activated?: boolean;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  moduleTopicExercise?: IModuleTopicExerciseBasic;
  scenario?: IScenarioBasic;
}

export class ModuleTopicExerciseScenario implements IModuleTopicExerciseScenario {
  activated: boolean;
  createdDate: moment.Moment;
  id: number;
  lastModifiedDate: moment.Moment;
  moduleTopicExercise: IModuleTopicExerciseBasic;
  scenario: IScenarioBasic;

  constructor(mTEScenario: IModuleTopicExerciseScenario) {
    this.activated = mTEScenario.activated;
    this.createdDate = mTEScenario.createdDate;
    this.id = mTEScenario.id;
    this.lastModifiedDate = mTEScenario.lastModifiedDate;
    this.moduleTopicExercise = mTEScenario.moduleTopicExercise;
    this.scenario = new ScenarioBasic(mTEScenario.scenario);
  }

}
