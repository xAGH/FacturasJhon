import { Work } from './work';

export interface Invoice {
  date: string;
  client_name: string;
  client_phone: string;
  client_document: string;
  client_address: string;
  works: Work[];
};
