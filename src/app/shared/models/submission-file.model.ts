import {Moment} from 'moment';

export interface ISubmissionFile {
  id: number;
  name: string;
  createdDate: Moment;
  lastModifiedDate: Moment;
  extension: string;
  solutionFile: string;

  atob(): string;

  btoa(): string;
}

export class SubmissionFile implements ISubmissionFile {


  createdDate: moment.Moment;
  extension: string;
  id: number;
  lastModifiedDate: moment.Moment;
  name: string;
  solutionFile: string;

  constructor(file?: ISubmissionFile) {
    if (file) {
      this.createdDate = file.createdDate;
      this.extension = file.extension;
      this.id = file.id;
      this.lastModifiedDate = file.lastModifiedDate;
      this.name = file.name;
      this.solutionFile = file.solutionFile;
    }
  }

  atob(): string {
    return atob(this.solutionFile);
  }

  btoa(): string {
    return btoa(this.solutionFile);
  }
}
