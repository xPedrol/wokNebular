import {Moment} from 'moment';
import {GenderType} from '../enumerations/gender-type.model';
import {IUserBasic} from './user-basic.model';
import * as moment from 'moment';

export interface IProfile {
  id: number;
  aboutMe: string;
  education: string;
  experience: string;
  country: string;
  gender: GenderType;
  birthday: Moment;
  city: string;
  uf: string;
  publicProfile: boolean;
  publicRank: boolean;
  instagram: string;
  lattes: string;
  mobileNumber: string;
  facebook: string;
  hackerrank: string;
  uri: string;
  linkedin: string;
  user: IUserBasic;
}

export class Profile implements IProfile {
  aboutMe: string;
  birthday: moment.Moment;
  city: string;
  country: string;
  education: string;
  experience: string;
  facebook: string;
  gender: GenderType;
  hackerrank: string;
  id: number;
  instagram: string;
  lattes: string;
  linkedin: string;
  mobileNumber: string;
  publicProfile: boolean;
  publicRank: boolean;
  uf: string;
  uri: string;
  user: IUserBasic;

  constructor(profile: IProfile) {
    this.aboutMe = profile.aboutMe;
    this.birthday = moment(profile.birthday);
    this.city = profile.city;
    this.country = profile.country;
    this.education = profile.education;
    this.experience = profile.experience;
    this.facebook = profile.facebook;
    this.gender = profile.gender;
    this.hackerrank = profile.hackerrank;
    this.id = profile.id;
    this.instagram = profile.instagram;
    this.lattes = profile.lattes;
    this.linkedin = profile.linkedin;
    this.mobileNumber = profile.mobileNumber;
    this.publicProfile = profile.publicProfile;
    this.publicRank = profile.publicRank;
    this.uf = profile.uf;
    this.uri = profile.uri;
    this.user = profile.user;
  }

}
