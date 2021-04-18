import {SERVER_API_IMAGE_URL} from '../../../app.constants';

export interface IUserBasic {
  id: number;
  login: string;
  email: string;
  imageUrl: string;
  activated: boolean;
}

export class UserBasic implements IUserBasic {
  private _activated: boolean;
  private _email: string;
  private _id: number;
  private _imageUrl: string;
  private _login: string;

  get activated(): boolean {
    return this._activated;
  }

  set activated(value: boolean) {
    this._activated = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get imageUrl(): string {
    return SERVER_API_IMAGE_URL + this._imageUrl;
  }

  set imageUrl(value: string) {
    this._imageUrl = value;
  }

  get login(): string {
    return this._login;
  }

  set login(value: string) {
    this._login = value;
  }

  constructor(user: IUserBasic) {
    this._activated = user.activated;
    this._email = user.email;
    this._id = user.id;
    this._imageUrl = user.imageUrl;
    this._login = user.login;
  }
}
