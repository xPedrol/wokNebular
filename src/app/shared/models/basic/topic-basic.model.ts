import {SERVER_API_IMAGE_URL} from '../../../app.constants';

export interface ITopicBasic {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  langKey: string;
}

export class TopicBasic implements ITopicBasic {
  constructor(topic: ITopicBasic) {
    this.id = topic.id;
    this.imageUrl = SERVER_API_IMAGE_URL + topic.imageUrl;
    this.langKey = topic.langKey;
    this.name = topic.name;
    this.slug = topic.slug;
  }

  id: number;
  imageUrl: string;
  langKey: string;
  name: string;
  slug: string;
}
