export interface IUserLogin {
  password: string;
  login: string;
  email?: string;
  affiliation?: any;
  agreeTerms?: boolean;
}

export class UserLogin implements IUserLogin {
  password: string;
  login: string;
  affiliation?: any;
  email?: string;
  agreeTerms?: boolean;
}
