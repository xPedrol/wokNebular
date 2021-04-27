import {IAffiliationBasic} from '../basic/affiliation-basic.model';

export interface IUserAuth {
  password: string;
  login: string;
  email?: string;
  affiliation?: any;
  agreeTerms?: boolean;
  company?: IAffiliationBasic;
  username?: string;
}

export class UserAuth implements IUserAuth {
  password: string;
  login: string;
  affiliation?: any;
  email?: string;
  agreeTerms?: boolean;
  company?: IAffiliationBasic;
  username?: string;
}
