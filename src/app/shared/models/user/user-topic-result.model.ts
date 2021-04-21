import {IUserBasic} from './user-basic.model';
import {ITopicBasic} from '../basic/topic-basic.model';

export interface IUserTopicResult {
  maxGrade?: number;
  minScore?: number;
  point?: number;
  targetScore?: number;
  user?: IUserBasic;
  topic?: ITopicBasic;
  idModuleTopic?: number;
  numA?: number;
  numB?: number;
  numC?: number;
  numD?: number;
  numAresolved?: number;
  numBresolved?: number;
  numCresolved?: number;
  numDresolved?: number;
}

export class UserTopicResult implements IUserTopicResult {

}
