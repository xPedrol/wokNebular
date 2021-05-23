import {SERVER_API_IMAGE_URL} from '../../app.constants';

export interface IReportResults {
  maxGrade?: number;
  minScore?: number;
  point?: number;
  targetScore?: number;
  emailUser?: string;
  activatedUser?: boolean;
  imageUrlTopic?: string;
  imageUrlUser?: string;
  loginUser?: string;
  idModuleTopic?: number;
  langKeyTopic?: string;
  nameTopic?: string;
  slugTopic?: string;
  numA?: number;
  numB?: number;
  numC?: number;
  numD?: number;
  numAresolved?: number;
  numBresolved?: number;
  numCresolved?: number;
  numDresolved?: number;

  getProgress(): number;
}

export class ReportResults implements IReportResults {
  activatedUser?: boolean;
  emailUser?: string;
  idModuleTopic?: number;
  imageUrlTopic?: string;
  imageUrlUser?: string;
  langKeyTopic?: string;
  loginUser?: string;
  maxGrade?: number;
  minScore?: number;
  nameTopic?: string;
  numA?: number;
  numAresolved?: number;
  numB?: number;
  numBresolved?: number;
  numC?: number;
  numCresolved?: number;
  numD?: number;
  numDresolved?: number;
  point?: number;
  slugTopic?: string;
  targetScore?: number;

  constructor(result: IReportResults) {
    this.activatedUser = result.activatedUser;
    this.emailUser = result.emailUser;
    this.idModuleTopic = result.idModuleTopic;
    this.imageUrlTopic = result.imageUrlTopic ? SERVER_API_IMAGE_URL + result.imageUrlTopic : null;
    this.imageUrlUser = result.imageUrlUser ? SERVER_API_IMAGE_URL + result.imageUrlUser : null;
    this.langKeyTopic = result.langKeyTopic;
    this.loginUser = result.loginUser;
    this.maxGrade = result.maxGrade;
    this.minScore = result.minScore;
    this.nameTopic = result.nameTopic;
    this.numA = result.numA;
    this.numAresolved = result.numAresolved;
    this.numB = result.numB;
    this.numBresolved = result.numBresolved;
    this.numC = result.numC;
    this.numCresolved = result.numCresolved;
    this.numD = result.numD;
    this.numDresolved = result.numDresolved;
    this.point = result.point;
    this.slugTopic = result.slugTopic;
    this.targetScore = result.targetScore;
  }

  getProgress(): number {
    if (this?.point && this?.targetScore) {
      return (100 * this?.point) / this?.targetScore;
    }
    return 0;
  }
}
