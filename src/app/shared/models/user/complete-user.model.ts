import {Moment} from 'moment';
import {IAffiliationBasic} from '../basic/affiliation-basic.model';
import {IUserTeamBasic} from '../basic/userTeam-basic.model';
import {IProfile} from './profile.model';
import {SERVER_API_IMAGE_URL} from '../../../app.constants';


export interface ICompleteUser {
  id: number;
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  emailVerifiedAt: Moment;
  passwordHash: string;
  lastAccess: Moment;
  firstAccess: Moment;
  activated: boolean;
  agreeTerms: boolean;
  imageUrl: string;
  rememberToken: string;
  langKey: string;
  activationKey: string;
  resetKey: string;
  resetDate: Moment;
  lastIpAddress: string;
  createdBy: string;
  createdDate: Moment;
  lastModifiedBy: string;
  lastModifiedDate: Moment;
  importado: string;
  idusermaratona: number;
  idteammaratona: number;
  company: IAffiliationBasic;
  authorities: string[];
  teamList: IUserTeamBasic[];
  profile: IProfile;
  fullName: string;
  fullAddress: string;
  fullContact: string;
}

export class CompleteUser implements ICompleteUser {
  activated: boolean;
  activationKey: string;
  agreeTerms: boolean;
  authorities: string[];
  company: IAffiliationBasic;
  createdBy: string;
  createdDate: Moment;
  email: string;
  emailVerifiedAt: Moment;
  firstAccess: Moment;
  firstName: string;
  id: number;
  idteammaratona: number;
  idusermaratona: number;
  imageUrl: string;
  importado: string;
  langKey: string;
  lastAccess: Moment;
  lastIpAddress: string;
  lastModifiedBy: string;
  lastModifiedDate: Moment;
  lastName: string;
  login: string;
  passwordHash: string;
  profile: IProfile;
  rememberToken: string;
  resetDate: Moment;
  resetKey: string;
  teamList: IUserTeamBasic[];
  fullName: string;
  fullAddress: string;
  fullContact: string;

  constructor(user: ICompleteUser) {
    this.activated = user.activated;
    this.activationKey = user.activationKey;
    this.agreeTerms = user.agreeTerms;
    this.authorities = user.authorities;
    this.company = user.company;
    this.createdBy = user.createdBy;
    this.createdDate = user.createdDate;
    this.email = user.email;
    this.emailVerifiedAt = user.emailVerifiedAt;
    this.firstAccess = user.firstAccess;
    this.firstName = user.firstName;
    this.id = user.id;
    this.idteammaratona = user.idteammaratona;
    this.idusermaratona = user.idusermaratona;
    this.imageUrl = SERVER_API_IMAGE_URL + user.imageUrl;
    this.importado = user.importado;
    this.langKey = user.langKey;
    this.lastAccess = user.lastAccess;
    this.lastIpAddress = user.lastIpAddress;
    this.lastModifiedBy = user.lastModifiedBy;
    this.lastModifiedDate = user.lastModifiedDate;
    this.lastName = user.lastName;
    this.login = user.login;
    this.passwordHash = user.passwordHash;
    this.profile = user.profile;
    this.rememberToken = user.rememberToken;
    this.resetDate = user.resetDate;
    this.resetKey = user.resetKey;
    this.teamList = user.teamList;
    this.fullName = `${(this.firstName ? this.firstName : '')} ${(this.lastName ? this.lastName : '')}`;
    this.fullContact = `${(this.email ? this.email : '')}`;
    this.fullAddress = `${(this.profile.country ? this.profile.country : '---')} ${(this.profile.uf ? this.profile.uf : '---')} ${(this.profile.city ? this.profile.city : '---')}`;
  }


}
