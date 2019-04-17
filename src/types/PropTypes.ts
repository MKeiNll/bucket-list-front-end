import { editEntry } from "../actions";
import { EntryDAO } from "./DaoTypes";
import { SystemState, EntryState, IsbnState } from ".";

export interface AppProps extends AppStateProps, AppDispatchProps {}

export interface AppStateProps {
  systemState: SystemState;
  entryState: EntryState;
  isbnState: IsbnState;
}

export interface AppDispatchProps
  extends EntryActions,
    EntryCreationFormProps,
    IsbnFormActions {
  initialFetch: () => void;
}

export interface EntryProps extends EntryActions, EntryDAO {}

export interface EntryListProps
  extends EntryCreationFormProps,
    EntryActions,
    EntryState {}

export interface EntryCreationFormProps {
  createEntry: (title: string, content: string) => void;
}

export interface IsbnFormProps extends IsbnFormActions, IsbnState {}

interface IsbnFormActions {
  fetchIsbnImage: (image: string) => void;
}

interface EntryActions {
  deleteEntry: (id: number) => void;
  editEntry: typeof editEntry;
  submitEntryEdits: (id: number, title: string, content: string) => void;
  selectEntry: (id: number) => void;
}
