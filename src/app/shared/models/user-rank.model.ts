import {SERVER_API_IMAGE_URL} from '../../app.constants';

export interface IUserRank {
  activated: boolean;
  email: string;
  login: string;
  imageUrl: string;
  idUser: number;
  point: number;
  description: string;
  average: number;
  totalSub: number;
}

export class UserRank implements IUserRank {
  activated: boolean;
  average: number;
  description: string;
  email: string;
  idUser: number;
  private _imageUrl: string;
  login: string;
  point: number;
  totalSub: number;

  get imageUrl(): string {
    return SERVER_API_IMAGE_URL + this._imageUrl;
  }

  constructor(rank: IUserRank) {
    this.activated = rank.activated;
    this.average = rank.average;
    this.description = rank.description;
    this.email = rank.email;
    this.idUser = rank.idUser;
    this._imageUrl = rank.imageUrl;
    this.login = rank.login;
    this.point = rank.point;
    this.totalSub = rank.totalSub;
  }

}

export const RankTableColumn = [
  {
    title: 'Usuário',
    class: 'text-left'
  },
  // {
  //   title: 'Descrição',
  // },
  {
    title: 'Pontos',
    class: 'text-center'
  },
  {
    title: 'Submissões',
    class: 'text-center'
  }
];
