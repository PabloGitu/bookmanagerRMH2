import { IBook } from 'app/shared/model/book.model';

export interface IComment {
  id?: number;
  userName?: string;
  description?: string;
  book?: IBook;
}

export const defaultValue: Readonly<IComment> = {};
