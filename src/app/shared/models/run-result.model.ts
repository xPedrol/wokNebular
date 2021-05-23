import {Moment} from 'moment';

export interface IRunResult {
  createdDate?: Moment;
  description?: string;
  minLength?: number;
  maxLength?: number;
  id?: string;
  lastModifiedDate?: Moment;
  name?: string;

  getColor(): string;
}

export class RunResult implements IRunResult {
  createdDate: moment.Moment;
  description: string;
  id: string;
  lastModifiedDate: moment.Moment;
  maxLength: number;
  minLength: number;
  name: string;

  constructor(runResult: IRunResult) {
    this.createdDate = runResult.createdDate;
    this.description = runResult.description;
    this.id = runResult.id;
    this.lastModifiedDate = runResult.lastModifiedDate;
    this.maxLength = runResult.maxLength;
    this.minLength = runResult.minLength;
    this.name = runResult.name;
  }

  getColor(): string {
    if (this?.id === 'correct') {
      return 'success';
    } else {
      return 'basic';
    }
    // if (this.id === 'B') {
    //   return 'info';
    // }
    // if (this.id === 'C') {
    //   return 'warning';
    // }
    // if (this.id === 'D') {
    //   return 'danger';
    // }
    // if (this.id === 'O') {
    //   return 'secondary';
    // }
  }
}
