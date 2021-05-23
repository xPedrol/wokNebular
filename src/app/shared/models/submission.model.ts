import {Moment} from 'moment';
import {IExerciseBasic} from './basic/exercise-basic.model';
import {IModuleTopicExerciseBasic} from './basic/moduleTopicExercise-basic.model';
import {ILanguageBasic} from './basic/language-basic.model';
import {IRejudgingBasic} from './basic/rejudging-basic.model';
import {IUserTeamBasic} from './basic/userTeam-basic.model';
import {IJudgehostBasic} from './basic/judgehost-basic.mode';
import {ISubmissionFile} from './submission-file.model';
import {IScenarioBasic} from './basic/scenario-basic.model';
import {IRunResult, RunResult} from './run-result.model';
import * as moment from 'moment';

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
  cacheResultExercise: string;
  cacheResultScoreExercise: number;
  cacheResultScoreTopic: number;
  cacheResultTopic: string;
  createdDate: moment.Moment;
  entryPoint: string;
  exercise: IExerciseBasic;
  expectedResults: string;
  files: ISubmissionFile[];
  helpScenario: IScenarioBasic;
  id: number;
  idSubmmit: number;
  judgehost: IJudgehostBasic;
  language: ILanguageBasic;
  lastModifiedDate: moment.Moment;
  moduleTopicExercise: IModuleTopicExerciseBasic;
  rejudging: IRejudgingBasic;
  runPercentA: number;
  runPercentB: number;
  runPercentC: number;
  runPercentD: number;
  runResult: IRunResult;
  submitTime: moment.Moment;
  userTeam: IUserTeamBasic;
  valid: boolean;

  constructor(submission: ISubmission) {
    this.cacheResultExercise = submission.cacheResultExercise;
    this.cacheResultScoreExercise = submission.cacheResultScoreExercise;
    this.cacheResultScoreTopic = submission.cacheResultScoreTopic;
    this.cacheResultTopic = submission.cacheResultTopic;
    this.createdDate = moment(submission.createdDate);
    this.entryPoint = submission.entryPoint;
    this.exercise = submission.exercise;
    this.expectedResults = submission.expectedResults;
    this.files = submission.files;
    this.helpScenario = submission.helpScenario;
    this.id = submission.id;
    this.idSubmmit = submission.idSubmmit;
    this.judgehost = submission.judgehost;
    this.language = submission.language;
    this.lastModifiedDate = moment(submission.lastModifiedDate);
    this.moduleTopicExercise = submission.moduleTopicExercise;
    this.rejudging = submission.rejudging;
    this.runPercentA = submission.runPercentA;
    this.runPercentB = submission.runPercentB;
    this.runPercentC = submission.runPercentC;
    this.runPercentD = submission.runPercentD;
    this.runResult = new RunResult(submission.runResult);
    this.submitTime = moment(submission.submitTime);
    this.userTeam = submission.userTeam;
    this.valid = submission.valid;
  }
}
