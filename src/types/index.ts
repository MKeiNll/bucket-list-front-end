export interface Entry {
  id: number;
  title: string;
  content: string;
  selected: boolean;
  beingEdited: boolean;
}

export interface SystemState {
  entries: Array<Entry>;
  isLoading: boolean;
  hasErrored: boolean;
  isbnImage: string;
}

export const APP_HAS_ERRORED = "APP_HAS_ERRORED";
export const APP_IS_LOADING = "APP_IS_LOADING";
export const ENTRY_FETCH_SUCCESS = "FETCH_SUCCESS";
export const CREATE_ENTRY_SUCCESS = "CREATE_ENTRY_SUCCESS";
export const DELETE_ENTRY_SUCCESS = "DELETE_ENTRY_SUCCESS";
export const SELECT_ENTRY_SUCCESS = "SELECT_ENTRY_SUCCESS";
export const ISBN_IMAGE_FETCH_SUCCESS = "ISBN_IMAGE_FETCH_SUCCESS";
export const ENTRY_BEING_EDITED = "ENTRY_BEING_EDITED";

interface AppHasErroredAction {
  type: typeof APP_HAS_ERRORED;
  hasErrored: boolean;
}

interface AppIsLoadingAction {
  type: typeof APP_IS_LOADING;
  isLoading: boolean;
}

interface EntryFetchSuccessAction {
  type: typeof ENTRY_FETCH_SUCCESS;
  entries: Array<Entry>;
}

interface CreateEntrySuccessAction {
  type: typeof CREATE_ENTRY_SUCCESS;
  entry: Entry;
}

interface DeleteEntrySuccessAction {
  type: typeof DELETE_ENTRY_SUCCESS;
  id: number;
}

interface SelectEntrySuccessAction {
  type: typeof SELECT_ENTRY_SUCCESS;
  id: number;
}

interface IsbnImageFetchSuccessAction {
  type: typeof ISBN_IMAGE_FETCH_SUCCESS;
  image: string;
}

interface EntryBeingEdited {
  type: typeof ENTRY_BEING_EDITED;
  id: number;
}

export type ActionTypes =
  | AppHasErroredAction
  | AppIsLoadingAction
  | EntryFetchSuccessAction
  | CreateEntrySuccessAction
  | DeleteEntrySuccessAction
  | SelectEntrySuccessAction
  | IsbnImageFetchSuccessAction
  | EntryBeingEdited;
