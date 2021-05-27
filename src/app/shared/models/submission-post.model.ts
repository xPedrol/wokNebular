import {ISubmissionFileBasic, SubmissionFileBasic} from './basic/submission-file-basic.model';

export interface ISubmissionPost {
  entryPoint?: string;
  files?: ISubmissionFileBasic[];
  languageId?: string;
  userTeamId?: number;
}

export class SubmissionPost implements ISubmissionPost {
  entryPoint: string;
  files?: ISubmissionFileBasic[];
  languageId: string;
  userTeamId: number;

  constructor(entryPoint: string, languageId: string, userTeamId: number) {
    this.entryPoint = entryPoint;
    // this.files = this.createSubmissionFileArray(files);
    this.languageId = languageId;
    this.userTeamId = userTeamId;
  }

}
