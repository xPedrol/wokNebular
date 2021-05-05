import {DisciplineType} from '../enumerations/discipline-type.model';
import {SERVER_API_IMAGE_URL} from '../../../app.constants';

export interface IDisciplineBasic {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  shortDescription: string;
  disciplineType: DisciplineType;
}

export class DisciplineBasic implements IDisciplineBasic {
  disciplineType: DisciplineType;
  id: number;
  imageUrl: string;
  name: string;
  shortDescription: string;
  slug: string;

  constructor(discipline: IDisciplineBasic) {
    this.disciplineType = discipline.disciplineType;
    this.id = discipline.id;
    this.imageUrl = SERVER_API_IMAGE_URL + discipline.imageUrl;
    this.name = discipline.name;
    this.shortDescription = discipline.shortDescription;
    this.slug = discipline.slug;
  }

}
