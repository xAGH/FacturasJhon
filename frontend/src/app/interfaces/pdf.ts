import { Work } from "./work";

export interface PDF {
  date: string;
  client_name: string;
  client_phone: string;
  client_document: string;
  client_address: string;
  works: Work[];
  iva?: number;
  raw_payment?: number;
  total?: number;
  doc_type?: string;
  invoice_no?: string;
  budget_no?: string;
  expiration_date: string;
};
