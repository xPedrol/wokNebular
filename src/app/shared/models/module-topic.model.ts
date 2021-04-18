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
  private _activated: boolean;
  private _activeTime: moment.Moment;
  private _availableToDo: boolean;
  private _availableToSee: boolean;
  private _createdDate: moment.Moment;
  private _deactiveTime: moment.Moment;
  private _endTime: moment.Moment;
  private _exercises: IModuleTopicExercise[];
  private _freezeTime: moment.Moment;
  private _id: number;
  private _itemorder: number;
  private _lastModifiedDate: moment.Moment;
  private _maxGrade: number;
  private _maxScoreCached: number;
  private _minScore: number;
  private _module: IModule;
  private _numAExercisesCached: number;
  private _numBExercisesCached: number;
  private _numCExercisesCached: number;
  private _numDExercisesCached: number;
  private _startTime: moment.Moment;
  private _targetScore: number;
  private _topic: ITopicBasic;
  private _unfreezeTime: moment.Moment;

  constructor(mT: IModuleTopic) {
    this._activated = mT.activated;
    this._activeTime = mT.activeTime;
    this._createdDate = moment(mT.createdDate);
    this._deactiveTime = moment(mT.deactiveTime);
    this._endTime = moment(mT.endTime);
    this._exercises = mT.exercises || [];
    this._freezeTime = moment(mT.freezeTime);
    this._id = mT.id;
    this._itemorder = mT.itemorder;
    this._lastModifiedDate = moment(mT.lastModifiedDate);
    this._maxGrade = mT.maxGrade;
    this._maxScoreCached = mT.maxScoreCached;
    this._minScore = mT.minScore;
    this._module = mT.module;
    this._numAExercisesCached = mT.numAExercisesCached;
    this._numBExercisesCached = mT.numBExercisesCached;
    this._numCExercisesCached = mT.numCExercisesCached;
    this._numDExercisesCached = mT.numDExercisesCached;
    this._startTime = moment(mT.startTime);
    this._targetScore = mT.targetScore;
    this._topic = new TopicBasic(mT.topic);
    this._unfreezeTime = moment(mT.unfreezeTime);

    if (this.dateActiveCompare()) {
      this._availableToSee = true;
      this._availableToDo = this.dateStartCompare();
    } else {
      this._availableToSee = false;
      this._availableToDo = false;
    }
  }

  public dateActiveCompare(): boolean {
    const currentDate = new Date();
    if (this._activeTime && this._deactiveTime) {
      return moment(currentDate).isBetween(moment(this._activeTime), moment(this._deactiveTime));
    }
    return false;
  }

  public dateEndCompare(): boolean {
    const currentDate = new Date();
    if (this._endTime) {
      return moment(this._endTime).isBefore(currentDate);
    }
    return false;
  }

  public dateStartCompare(): boolean {
    const currentDate = new Date();
    if (this._startTime && this._endTime) {
      return moment(currentDate).isBetween(moment(this._startTime), moment(this._endTime));
    }
    return false;
  }

  get activated(): boolean {
    return this._activated;
  }

  get activeTime(): moment.Moment {
    return this._activeTime;
  }

  get availableToDo(): boolean {
    return this._availableToDo;
  }

  get availableToSee(): boolean {
    return this._availableToSee;
  }

  get createdDate(): moment.Moment {
    return this._createdDate;
  }

  get deactiveTime(): moment.Moment {
    return this._deactiveTime;
  }

  get endTime(): moment.Moment {
    return this._endTime;
  }

  get exercises(): IModuleTopicExercise[] {
    return this._exercises;
  }

  get freezeTime(): moment.Moment {
    return this._freezeTime;
  }

  get id(): number {
    return this._id;
  }

  get itemorder(): number {
    return this._itemorder;
  }

  get lastModifiedDate(): moment.Moment {
    return this._lastModifiedDate;
  }

  get maxGrade(): number {
    return this._maxGrade;
  }

  get maxScoreCached(): number {
    return this._maxScoreCached;
  }

  get minScore(): number {
    return this._minScore;
  }

  get module(): IModule {
    return this._module;
  }

  get numAExercisesCached(): number {
    return this._numAExercisesCached;
  }

  get numBExercisesCached(): number {
    return this._numBExercisesCached;
  }

  get numCExercisesCached(): number {
    return this._numCExercisesCached;
  }

  get numDExercisesCached(): number {
    return this._numDExercisesCached;
  }

  get startTime(): moment.Moment {
    return this._startTime;
  }

  get targetScore(): number {
    return this._targetScore;
  }

  get topic(): ITopicBasic {
    return this._topic;
  }

  get unfreezeTime(): moment.Moment {
    return this._unfreezeTime;
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
