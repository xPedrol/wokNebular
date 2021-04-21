import {CourseType} from './enumerations/course-type.model';
import {IModule} from './module.model';
import {IAffiliationBasic} from './basic/affiliation-basic.model';
import {IUserBasic, UserBasic} from './user/user-basic.model';
import {Moment} from 'moment';

export interface ICourse {
  id: number;
  name: string;
  description: string;
  passcode: string;
  courseType: CourseType;
  activated: boolean;
  createdDate: Moment;
  startDate: Moment;
  endDate: Moment;
  lastModifiedDate: Moment;
  modules: IModule[];
  affiliation: IAffiliationBasic;
  teacher: IUserBasic;
  slug: string;
  amountTopics: number;
  amountExercises: number;

  isTraining(): boolean;

  isPrivate(): boolean;
}

export class Course implements ICourse {
  constructor(course?: ICourse) {
    if (course) {
      this._activated = course.activated;
      this._affiliation = course.affiliation;
      this._courseType = course.courseType;
      this._createdDate = course.createdDate;
      this._description = course.description;
      this._endDate = course.endDate;
      this._id = course.id;
      this._lastModifiedDate = course.lastModifiedDate;
      this._modules = course.modules;
      this._name = course.name;
      this._passcode = course.passcode;
      this._slug = course.slug;
      this._startDate = course.startDate;
      this._teacher = new UserBasic(course.teacher);
    }
  }

  private _activated: boolean;
  private _affiliation: IAffiliationBasic;
  private _courseType: CourseType;
  private _createdDate: moment.Moment;
  private _description: string;
  private _endDate: moment.Moment;
  private _id: number;
  private _lastModifiedDate: moment.Moment;
  private _modules: IModule[];
  private _name: string;
  private _passcode: string;
  private _slug: string;
  private _startDate: moment.Moment;
  private _teacher: IUserBasic;
  private _amountExercises: number;
  private _amountTopics: number;

  get activated(): boolean {
    return this._activated;
  }

  set activated(value: boolean) {
    this._activated = value;
  }

  get affiliation(): IAffiliationBasic {
    return this._affiliation;
  }

  set affiliation(value: IAffiliationBasic) {
    this._affiliation = value;
  }

  get courseType(): CourseType {
    return this._courseType;
  }

  set courseType(value: CourseType) {
    this._courseType = value;
  }

  get createdDate(): moment.Moment {
    return this._createdDate;
  }

  set createdDate(value: moment.Moment) {
    this._createdDate = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get endDate(): moment.Moment {
    return this._endDate;
  }

  set endDate(value: moment.Moment) {
    this._endDate = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get lastModifiedDate(): moment.Moment {
    return this._lastModifiedDate;
  }

  set lastModifiedDate(value: moment.Moment) {
    this._lastModifiedDate = value;
  }

  get modules(): IModule[] {
    return this._modules;
  }

  set modules(value: IModule[]) {
    this._modules = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get passcode(): string {
    return this._passcode;
  }

  set passcode(value: string) {
    this._passcode = value;
  }

  get slug(): string {
    return this._slug;
  }

  set slug(value: string) {
    this._slug = value;
  }

  get startDate(): moment.Moment {
    return this._startDate;
  }

  set startDate(value: moment.Moment) {
    this._startDate = value;
  }

  get teacher(): IUserBasic {
    return this._teacher;
  }

  set teacher(value: IUserBasic) {
    this._teacher = value;
  }

  isTraining(): boolean {
    return this._courseType === CourseType.TEST || this._courseType === CourseType.PUBLIC;
  }

  isPrivate(): boolean {
    return this._courseType === CourseType.PRIVATE;
  }

  get amountExercises(): number {
    return this._amountExercises;
  }

  set amountExercises(value: number) {
    this._amountExercises = value;
  }

  get amountTopics(): number {
    return this._amountTopics;
  }

  set amountTopics(value: number) {
    this._amountTopics = value;
  }
}
