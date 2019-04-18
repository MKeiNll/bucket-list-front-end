import { EntryDAO } from "./DaoTypes";

export interface SystemState {
  loading: boolean;
  error: boolean;
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
