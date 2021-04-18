import {SERVER_API_IMAGE_URL} from '../../../app.constants';
import {Authority} from '../../constants/authority.constants';

export interface IAccount {
  id: number;
  activated: boolean;
  authorities: string[];
  email: string;
  firstName: string;
  langKey: string;
  lastName: string;
  login: string;
  imageUrl: string;

  isTeacher(): boolean;

  isAdmin(): boolean;

  isStudent(): boolean;
}

export class Account {
  private _id: number;
  private _activated: boolean;
  private _authorities: string[];
  private _email: string;
  private _firstName: string;
  private _langKey: string;
  private _lastName: string;
  private _login: string;
  private _imageUrl: string;

  constructor(account: IAccount) {
    this._id = account.id;
    this._authorities = account.authorities;
    this._email = account.email;
    this._login = account.login;
    this._imageUrl = account.imageUrl;
    this._activated = account.activated;
    this._langKey = account.langKey;
    this._lastName = account.lastName;
    this._firstName = account.firstName;
  }

  // get getImageUrl(): string {
  //   return `${SERVER_API_IMAGE_URL}${this._imageUrl}`;
  // }

  // getImageUrl(): string {
  //   return `${SERVER_API_IMAGE_URL}${this.imageUrl}`;
  // }

  isTeacher(): boolean {
    if (this) {
      return this._authorities.includes(Authority.TEACHER);
    }
    return false;
  }

  isAdmin(): boolean {
    if (this) {
      return this._authorities.includes(Authority.ADMIN);
    }
    return false;
  }

  isStudent(): boolean {
    if (this) {
      return this._authorities.includes(Authority.USER);
    }
    return false;
  }

  hasAnyAuthority(authorities: string[]): boolean {
    if (this.authorities && this.authorities?.length > 0) {
      return this.authorities.some((authority) => {
        return authorities.includes(authority);
      });
    }
    return false;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get activated(): boolean {
    return this._activated;
  }

  set activated(value: boolean) {
    this._activated = value;
  }

  get authorities(): string[] {
    return this._authorities;
  }

  set authorities(value: string[]) {
    this._authorities = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get langKey(): string {
    return this._langKey;
  }

  set langKey(value: string) {
    this._langKey = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get login(): string {
    return this._login;
  }

  set login(value: string) {
    this._login = value;
  }

  get imageUrl(): string {
    return `${SERVER_API_IMAGE_URL}${this._imageUrl}`;
  }

  set imageUrl(value: string) {
    this._imageUrl = value;
  }
}
