import { EntryDAO } from "./DaoTypes";

export const ERROR = "ERROR";
export const LOADING = "LOADING";
export const INITIAL_FETCH_SUCCESS = "INITIAL_FETCH_SUCCESS";
export const CREATE_ENTRY_SUCCESS = "CREATE_ENTRY_SUCCESS";
export const DELETE_ENTRY_SUCCESS = "DELETE_ENTRY_SUCCESS";
export const SELECT_ENTRY_SUCCESS = "SELECT_ENTRY_SUCCESS";
export const SUBMIT_ENTRY_EDITS_SUCCESS = "SUBMIT_ENTRY_EDITS_SUCCESS";
export const EDIT_ENTRY = "EDIT_ENTRY";
export const EMPTY_ENTRY_SUBMITTED = "EMPTY_ENTRY_SUBMITTED";
export const EMPTY_ENTRY_DISCARDED_SUCCESS = "EMPTY_ENTRY_DISCARDED";
export const ENTRY_MOVED_SUCCESS = "ENTRY_MOVED_SUCCESS";
export const ISBN_IMAGE_FETCH_SUCCESS = "ISBN_IMAGE_FETCH_SUCCESS";

interface ErrorAction {
  type: typeof ERROR;
  error: Error;
}

interface LoadingAction {
  type: typeof LOADING;
  loading: boolean;
}

interface InitialFetchSuccessAction {
  type: typeof INITIAL_FETCH_SUCCESS;
  entries: Array<EntryDAO>;
}

interface CreateEntrySuccessAction {
  type: typeof CREATE_ENTRY_SUCCESS;
  entry: EntryDAO;
}

interface DeleteEntrySuccessAction {
  type: typeof DELETE_ENTRY_SUCCESS;
  entries: Array<EntryDAO>;
}

interface SelectEntrySuccessAction {
  type: typeof SELECT_ENTRY_SUCCESS;
  id: number;
}

interface SubmitEntryEditsSuccessAction {
  type: typeof SUBMIT_ENTRY_EDITS_SUCCESS;
  id: number;
  title: string;
  content: string;
}

export interface EditEntryAction {
  type: typeof EDIT_ENTRY;
  id: number;
  edit: boolean;
}

interface EmptyEntrySubmittedAction {
  type: typeof EMPTY_ENTRY_SUBMITTED;
}

interface EmptyEntryDiscardedSuccessAction {
  type: typeof EMPTY_ENTRY_DISCARDED_SUCCESS;
  entries: Array<EntryDAO>;
}

interface EntryMovedSuccessAction {
  type: typeof ENTRY_MOVED_SUCCESS;
  entries: Array<EntryDAO>;
}

export interface FetchIsbnImageSuccessAction {
  type: typeof ISBN_IMAGE_FETCH_SUCCESS;
  image: string;
}

export type SystemActionTypes = ErrorAction | LoadingAction;

export type EntryListActionTypes =
  | InitialFetchSuccessAction
  | CreateEntrySuccessAction
  | DeleteEntrySuccessAction
  | SelectEntrySuccessAction
  | SubmitEntryEditsSuccessAction
  | EditEntryAction
  | EmptyEntryDiscardedSuccessAction
  | EntryMovedSuccessAction;

export type EntryCreationFormActionTypes =
  | CreateEntrySuccessAction
  | EmptyEntrySubmittedAction;
