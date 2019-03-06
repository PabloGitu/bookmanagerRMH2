import { Moment } from 'moment';
import { IComment } from 'app/shared/model/comment.model';
import { IAuthor } from 'app/shared/model/author.model';
import { IPublisher } from 'app/shared/model/publisher.model';

export const enum BookCover {
  SOFT = 'SOFT',
  HARD = 'HARD'
}

export const enum BookGenre {
  THRILLER = 'THRILLER',
  ROMANTIC = 'ROMANTIC',
  ADVENTURE = 'ADVENTURE',
  SCARY = 'SCARY',
  SCIENCEFICTION = 'SCIENCEFICTION',
  CHILD = 'CHILD',
  POLICY = 'POLICY',
  SOCIETY = 'SOCIETY',
  OTHER = 'OTHER'
}

export interface IBook {
  id?: number;
  title?: string;
  description?: string;
  publicationDate?: Moment;
  price?: number;
  bookCover?: BookCover;
  genre?: BookGenre;
  isBestSeller?: boolean;
  imageContentType?: string;
  image?: any;
  comments?: IComment[];
  author?: IAuthor;
  publisher?: IPublisher;
}

export const defaultValue: Readonly<IBook> = {
  isBestSeller: false
};
