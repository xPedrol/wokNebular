import {IUserBasic} from '../user/user-basic.model';

export interface ITeamBasic {
  id?: number;
  name?: string;
  slug?: string;
  owner?: IUserBasic;
}

export class TeamBasic implements ITeamBasic {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public owner?: IUserBasic
  ) {}
}
