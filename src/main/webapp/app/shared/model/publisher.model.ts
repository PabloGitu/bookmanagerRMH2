import { IBook } from 'app/shared/model/book.model';

export const enum Distribution {
  WORLDWIDE = 'WORLDWIDE',
  REGIONAL = 'REGIONAL'
}

export interface IPublisher {
  id?: number;
  name?: string;
  distribution?: Distribution;
  localization?: string;
  books?: IBook[];
}

export const defaultValue: Readonly<IPublisher> = {};
