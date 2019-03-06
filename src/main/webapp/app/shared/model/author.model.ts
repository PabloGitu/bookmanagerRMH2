import { Moment } from 'moment';
import { IBook } from 'app/shared/model/book.model';

export const enum Genre {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export interface IAuthor {
  id?: number;
  name?: string;
  genre?: Genre;
  birthdate?: Moment;
  deathDate?: Moment;
  country?: string;
  imageContentType?: string;
  image?: any;
  books?: IBook[];
}

export const defaultValue: Readonly<IAuthor> = {};
