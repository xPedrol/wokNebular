import {Moment} from 'moment';
import {IModuleTopicBasic} from './moduleTopic-basic.model';
import {IExerciseBasic} from './exercise-basic.model';
import {IDifficultyLevelBasic} from './difficultyLevel-basic.model';
import {IStatement} from '../statement.model';

export interface IModuleTopicExercise {
  id?: number;
  alias?: string;
  activated?: boolean;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  collor?: string;
  lazyEvalResults?: boolean;
  allowJudge?: boolean;
  allowSubmit?: boolean;
  readonly?: boolean;
  moduleTopic?: IModuleTopicBasic;
  exercise?: IExerciseBasic;
  statement?: IStatement;
  difficultyLevel?: IDifficultyLevelBasic;
}

export class ModuleTopicExercise implements IModuleTopicExercise {
  constructor(
    public id?: number,
    public alias?: string,
    public activated?: boolean,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public collor?: string,
    public lazyEvalResults?: boolean,
    public allowJudge?: boolean,
    public allowSubmit?: boolean,
    public readonly?: boolean,
    public moduleTopic?: IModuleTopicBasic,
    public exercise?: IExerciseBasic,
    public statement?: IStatement,
    public difficultyLevel?: IDifficultyLevelBasic
  ) {
    this.activated = this.activated || false;
    this.lazyEvalResults = this.lazyEvalResults || false;
    this.allowJudge = this.allowJudge || false;
    this.allowSubmit = this.allowSubmit || false;
    this.readonly = this.readonly || false;
  }
}
