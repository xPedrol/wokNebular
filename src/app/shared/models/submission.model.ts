import { Moment } from 'moment';
import {IExerciseBasic} from './basic/exercise-basic.model';
import {IModuleTopicExerciseBasic} from './basic/moduleTopicExercise-basic.model';
import {ILanguageBasic} from './basic/language-basic.model';
import {IRejudgingBasic} from './basic/rejudging-basic.model';
import {IUserTeamBasic} from './basic/userTeam-basic.model';
import {IJudgehostBasic} from './basic/judgehost-basic.mode';
import {ISubmissionFile} from './submission-file.model';
import {IScenarioBasic} from './basic/scenario-basic.model';
import {IRunResult} from './run-result.model';

export interface ISubmission {
  id?: number;
  submitTime?: Moment;
  valid?: boolean;
  expectedResults?: string;
  entryPoint?: string;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  idSubmmit?: number;
  exercise?: IExerciseBasic;
  moduleTopicExercise?: IModuleTopicExerciseBasic;
  language?: ILanguageBasic;
  judgehost?: IJudgehostBasic;
  rejudging?: IRejudgingBasic;
  userTeam?: IUserTeamBasic;
  files?: ISubmissionFile[];
  helpScenario?: IScenarioBasic;
  runPercentA?: number;
  runPercentB?: number;
  runPercentC?: number;
  runPercentD?: number;
  runResult?: IRunResult;
  cacheResultScoreExercise?: number;
  cacheResultScoreTopic?: number;
  cacheResultExercise?: string;
  cacheResultTopic?: string;
}
export class Submission implements ISubmission {
  constructor(
    public id?: number,
    public submittime?: number,
    public valid?: boolean,
    public expectedResults?: string,
    public entryPoint?: string,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public idSubmmit?: number,
    public exercise?: IExerciseBasic,
    public moduleTopicExercise?: IModuleTopicExerciseBasic,
    public language?: ILanguageBasic,
    public judgehost?: IJudgehostBasic,
    public rejudging?: IRejudgingBasic,
    public userTeam?: IUserTeamBasic,
    public files?: ISubmissionFile[],
    public helpScenario?: IScenarioBasic,
    public runPercentA?: number,
    public runPercentB?: number,
    public runPercentC?: number,
    public runPercentD?: number,
    public runResult?: IRunResult,
    public cacheResultScoreExercise?: number,
    public cacheResultScoreTopic?: number,
    public cacheResultExercise?: string,
    public cacheResultTopic?: string,
    public submitTime?: Moment
  ) {
    this.valid = this.valid || false;
  }
}
