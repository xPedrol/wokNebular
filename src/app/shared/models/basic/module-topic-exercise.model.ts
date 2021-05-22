import {Moment} from 'moment';
import {IModuleTopicBasic} from './moduleTopic-basic.model';
import {IExerciseBasic} from './exercise-basic.model';
import {DifficultyLevelBasic, IDifficultyLevelBasic} from './difficultyLevel-basic.model';
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
  activated: boolean;
  alias: string;
  allowJudge: boolean;
  allowSubmit: boolean;
  collor: string;
  createdDate: moment.Moment;
  difficultyLevel: IDifficultyLevelBasic;
  exercise: IExerciseBasic;
  id: number;
  lastModifiedDate: moment.Moment;
  lazyEvalResults: boolean;
  moduleTopic: IModuleTopicBasic;
  readonly: boolean;
  statement: IStatement;

  constructor(mTE: IModuleTopicExercise) {
    this.alias = mTE.alias;
    this.collor = mTE.collor;
    this.createdDate = mTE.createdDate;
    this.difficultyLevel = new DifficultyLevelBasic(mTE.difficultyLevel);
    this.exercise = mTE.exercise;
    this.id = mTE.id;
    this.lastModifiedDate = mTE.lastModifiedDate;
    this.moduleTopic = mTE.moduleTopic;
    this.statement = mTE.statement;
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
