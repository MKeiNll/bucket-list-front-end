import { editEntry } from "../actions";
import { EntryDAO } from "./DaoTypes";
import { SystemState, EntryState, IsbnState } from ".";

export interface AppProps {
  systemState: SystemState;
  entryState: EntryState;
  isbnState: IsbnState;
  initialFetch: () => void;
  deleteEntry: (id: number) => void;
  selectEntry: (id: number) => void;
  createEntry: (title: string, content: string) => void;
  editEntry: typeof editEntry;
  submitEntryEdits: (id: number, title: string, content: string) => void;
  fetchIsbnImage: (image: string) => void;
}

export interface AppStateProps {
  systemState: SystemState;
  entryState: EntryState;
  isbnState: IsbnState;
}

export interface AppDispatchProps {
  initialFetch: () => void;
  deleteEntry: (id: number) => void;
  selectEntry: (id: number) => void;
  createEntry: (title: string, content: string) => void;
  editEntry: typeof editEntry;
  submitEntryEdits: (id: number, title: string, content: string) => void;
  fetchIsbnImage: (image: string) => void;
}

export interface AppOwnProps {
  systemState: SystemState;
  entryState: EntryState;
  isbnState: IsbnState;
}

export interface EntryProps {
  id: number;
  deleteEntry: (id: number) => void;
  editEntry: typeof editEntry;
  submitEntryEdits: (id: number, title: string, content: string) => void;
  selectEntry: (id: number) => void;
  title: string;
  content: string;
  selected: boolean;
  beingEdited: boolean;
}

export interface EntryListProps {
  entries: Array<EntryDAO>;
  deleteEntry: (id: number) => void;
  editEntry: typeof editEntry;
  submitEntryEdits: (id: number, title: string, content: string) => void;
  selectEntry: (id: number) => void;
  createEntry: (title: string, content: string) => void;
}

export interface EntryCreationFormProps {
  createEntry: (title: string, content: string) => void;
}

export interface ISBNFormProps {
  image: string;
  fetchIsbnImage: (image: string) => void;
}
