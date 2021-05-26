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

  constructor(entryPoint: string, files: File[], languageId: string, userTeamId: number) {
    this.entryPoint = entryPoint;
    this.files = this.createSubmissionFileArray(files);
    this.languageId = languageId;
    this.userTeamId = userTeamId;
  }

  createSubmissionFileArray(files: File[]): ISubmissionFileBasic[] {
    const submissionFileArray: ISubmissionFileBasic[] = [];
    let solutionFile: string;
    files.forEach(item => {
      const reader = new FileReader();
      // Get extension
      let extension = item.name.split('/').pop();
      if (extension) {
        extension = extension.indexOf('.') < 1 ? '' : extension.split('.').pop();
      }
      // Get file
      reader.readAsDataURL(item);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          solutionFile = reader.result;
        }
        const splitedFile = solutionFile.split(',');
        const submissionFile = {
          ...new SubmissionFileBasic(),
          name: item.name,
          solutionFile: splitedFile[1],
          extension
        };
        submissionFileArray.push(submissionFile);
      };
      // SubmissionFileBasic object

      // submissionFile[i].name = item.file.name;

      // submissionFile[i].extension = item.file.type;
      // if (reader.result !== null) {
      // submissionFile[i].solutionFile = reader.result as string;
      // }
    });
    return submissionFileArray;
  }
}
