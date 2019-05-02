import { EntryDAO } from "./DaoTypes";

export interface SystemState {
  loading: boolean;
  error?: Error;
}

export interface EntryListState {
  entries: Array<EntryDAO>;
}

export interface EntryCreationFormState {
  emptyEntrySubmitted: boolean;
}

export interface IsbnState {
  isbnImage: string;
}
