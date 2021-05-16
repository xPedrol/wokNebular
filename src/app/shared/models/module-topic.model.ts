import {Moment} from 'moment';
import * as moment from 'moment';
import {IModule} from './module.model';
import {ITopicBasic, TopicBasic} from './basic/topic-basic.model';
import {IModuleTopicExercise} from './basic/module-topic-exercise.model';
import {IReportResults} from './module-topic-user-result.model';

export interface IModuleTopic {
  module: IModule;
  topic: ITopicBasic;
  id: number;
  maxGrade: number;
  targetScore: number;
  minScore: number;
  activated: boolean;
  createdDate: Moment;
  lastModifiedDate: Moment;
  startTime: Moment;
  activeTime: Moment;
  freezeTime: Moment;
  endTime: Moment;
  deactiveTime: Moment;
  unfreezeTime: Moment;
  availableToSee: boolean;
  availableToDo: boolean;
  exercises: IModuleTopicExercise[];
  itemorder: number;
  numAExercisesCached: number;
  numBExercisesCached: number;
  numCExercisesCached: number;
  numDExercisesCached: number;
  maxScoreCached: number;

  dateActiveCompare(): boolean;

  dateEndCompare(): boolean;

  dateStartCompare(): boolean;

  getTotalExercise(type: string): number;

  getUnresolvedResolved(results: IReportResults): number;
}

export class ModuleTopic implements IModuleTopic {
  public activated: boolean;
  public activeTime: moment.Moment;
  public availableToDo: boolean;
  public availableToSee: boolean;
  public createdDate: moment.Moment;
  public deactiveTime: moment.Moment;
  public endTime: moment.Moment;
  public exercises: IModuleTopicExercise[];
  public freezeTime: moment.Moment;
  public id: number;
  public itemorder: number;
  public lastModifiedDate: moment.Moment;
  public maxGrade: number;
  public maxScoreCached: number;
  public minScore: number;
  public module: IModule;
  public numAExercisesCached: number;
  public numBExercisesCached: number;
  public numCExercisesCached: number;
  public numDExercisesCached: number;
  public startTime: moment.Moment;
  public targetScore: number;
  public topic: ITopicBasic;
  public unfreezeTime: moment.Moment;

  constructor(mT: IModuleTopic) {
    this.activated = mT.activated;
    this.activeTime = mT.activeTime;
    this.createdDate = moment(mT.createdDate);
    this.deactiveTime = moment(mT.deactiveTime);
    this.endTime = moment(mT.endTime);
    this.exercises = mT.exercises || [];
    this.freezeTime = moment(mT.freezeTime);
    this.id = mT.id;
    this.itemorder = mT.itemorder;
    this.lastModifiedDate = moment(mT.lastModifiedDate);
    this.maxGrade = mT.maxGrade;
    this.maxScoreCached = mT.maxScoreCached;
    this.minScore = mT.minScore;
    this.module = mT.module;
    this.numAExercisesCached = mT.numAExercisesCached;
    this.numBExercisesCached = mT.numBExercisesCached;
    this.numCExercisesCached = mT.numCExercisesCached;
    this.numDExercisesCached = mT.numDExercisesCached;
    this.startTime = moment(mT.startTime);
    this.targetScore = mT.targetScore;
    this.topic = new TopicBasic(mT.topic);
    this.unfreezeTime = moment(mT.unfreezeTime);

    if (this.dateActiveCompare()) {
      this.availableToSee = true;
      this.availableToDo = this.dateStartCompare();
    } else {
      this.availableToSee = false;
      this.availableToDo = false;
    }
  }

  static synchronizeMTsDates(moduleTopics: IModuleTopic[], startDate: string | Moment, endTime: string | Moment): IModuleTopic[] {
    startDate = moment(startDate);
    endTime = moment(endTime);
    if (moduleTopics && moduleTopics?.length > 0) {
      moduleTopics?.forEach((moduleTopic) => {
        moduleTopic.activeTime = moment(startDate).add(1, 'minute');
        moduleTopic.deactiveTime = moment(endTime).subtract(1, 'minute');
        moduleTopic.startTime = moment(moduleTopic.activeTime).add(1, 'minute');
        moduleTopic.endTime = moment(moduleTopic.deactiveTime).subtract(
          1,
          'minute'
        );
        moduleTopic.freezeTime = moment(moduleTopic.startTime).add(1, 'minute');
        moduleTopic.unfreezeTime = moment(moduleTopic.endTime).subtract(
          1,
          'minute'
        );
      });
    }
    return moduleTopics;
  }

  public dateActiveCompare(): boolean {
    const currentDate = new Date();
    if (this.activeTime && this.deactiveTime) {
      return moment(currentDate).isBetween(moment(this.activeTime), moment(this.deactiveTime));
    }
    return false;
  }

  public dateEndCompare(): boolean {
    const currentDate = new Date();
    if (this.endTime) {
      return moment(this.endTime).isBefore(currentDate);
    }
    return false;
  }

  public dateStartCompare(): boolean {
    const currentDate = new Date();
    if (this.startTime && this.endTime) {
      return moment(currentDate).isBetween(moment(this.startTime), moment(this.endTime));
    }
    return false;
  }

  getTotalExercise(type: string): number {
    let total = 0;
    this.exercises.forEach((exercise) => {
      if (exercise.difficultyLevel.id === type) {
        total++;
      }
    });
    return total;
  }

  getUnresolvedResolved(results: IReportResults) {
    const resolveds = results.numAresolved + results.numBresolved + results.numCresolved + results.numDresolved;
    const unresolveds = this.exercises.length - resolveds;
    return unresolveds < 0 ? 0 : unresolveds;
  }
}
