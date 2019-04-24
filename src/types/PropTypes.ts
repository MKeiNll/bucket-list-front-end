import { editEntry, entryMoved } from "../actions";
import { EntryDAO } from "./DaoTypes";
import {
  SystemState,
  EntryListState,
  EntryCreationFormState,
  IsbnState
} from ".";

export interface AppProps extends AppStateProps, AppDispatchProps {}

export interface AppStateProps {
  systemState: SystemState;
  entryListState: EntryListState;
  entryCreationFormState: EntryCreationFormState;
  isbnState: IsbnState;
}

export interface AppDispatchProps
  extends EntryActions,
    EntryListActions,
    EntryCreationFormActions,
    IsbnFormActions {
  initialFetch: () => void;
}

export interface EntryProps extends EntryActions, EntryDAO {}

export interface EntryListProps
  extends EntryCreationFormProps,
    EntryActions,
    EntryListState,
    EntryListActions {}

export interface EntryCreationFormProps
  extends EntryCreationFormActions,
    EntryCreationFormState {}

interface EntryCreationFormActions {
  createEntry: (title: string, content: string) => void;
  submitEmptyEntry: () => void;
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
  discardEmptyEntry: (id: number) => void;
}

interface EntryListActions {
  moveEntry: typeof entryMoved;
}
