import { EntryDAO } from "./DaoTypes";

export interface SystemState {
  loading: boolean;
  error: boolean;
}

export interface EntryState {
  entries: Array<EntryDAO>;
}

export interface IsbnState {
  isbnImage: string;
}
