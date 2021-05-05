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

  public static countExercisesByLevel(mTEs: IModuleTopicExercise[]) {
    let totalA = 0;
    let totalB = 0;
    let totalC = 0;
    let totalD = 0;
    let totalO = 0;
    mTEs?.forEach((exercise) => {
      if (exercise.difficultyLevel?.id === 'A') {
        totalA++;
      }
      if (exercise.difficultyLevel?.id === 'B') {
        totalB++;
      }
      if (exercise.difficultyLevel?.id === 'C') {
        totalC++;
      }
      if (exercise.difficultyLevel?.id === 'D') {
        totalD++;
      }
      if (exercise.difficultyLevel?.id === 'O') {
        totalO++;
      }
    });
    return {totalA, totalB, totalC, totalD, totalO};
  }
}
