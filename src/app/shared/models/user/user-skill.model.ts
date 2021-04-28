import {IUserBasic} from './user-basic.model';
import {ISkillBasic} from '../basic/skill-basic.model';

export interface IUserSkill {
  user: IUserBasic;
  skill: ISkillBasic;
  classification: number;
  point: number;
  maxPoint: number;
  nameSkill: string;
  idSkill: number;
  imageUrlSkill: string;
  colorSkill: string;
  slugSkill: string;

  getPercent(round?: boolean): number;
}

export class UserSkill implements IUserSkill {
  classification: number;
  colorSkill: string;
  idSkill: number;
  imageUrlSkill: string;
  maxPoint: number;
  nameSkill: string;
  point: number;
  skill: ISkillBasic;
  slugSkill: string;
  user: IUserBasic;

  getPercent(round?: boolean): number {
    if (this.point && this.maxPoint) {
      return round
        ? Math.round((this.point / this.maxPoint) * 100)
        : (this.point / this.maxPoint) * 100;
    }
    return 0;
  }

  constructor(userSkill: IUserSkill) {
    this.classification = userSkill.classification;
    this.colorSkill = userSkill.colorSkill;
    this.idSkill = userSkill.idSkill;
    this.imageUrlSkill = userSkill.imageUrlSkill;
    this.maxPoint = userSkill.maxPoint;
    this.nameSkill = userSkill.nameSkill;
    this.point = userSkill.point;
    this.skill = userSkill.skill;
    this.slugSkill = userSkill.slugSkill;
    this.user = userSkill.user;
  }
}
