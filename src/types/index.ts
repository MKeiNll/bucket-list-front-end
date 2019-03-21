export interface Entry {
  id: number;
  title: string;
  content: string;
  selected: boolean;
}

export interface SystemState {
  entries: Array<Entry>;
  isLoading: boolean;
  hasErrored: boolean;
}

export const APP_HAS_ERRORED = "APP_HAS_ERRORED";
export const APP_IS_LOADING = "APP_IS_LOADING";
export const FETCH_SUCCESS = "FETCH_SUCCESS";

interface AppHasErroredAction {
  type: typeof APP_HAS_ERRORED;
  hasErrored: boolean;
}

interface AppIsLoadingAction {
  type: typeof APP_IS_LOADING;
  isLoading: boolean;
}

interface FetchSuccessAction {
  type: typeof FETCH_SUCCESS;
  entries: Array<Entry>;
}

export type ActionTypes =
  | AppHasErroredAction
  | AppIsLoadingAction
  | FetchSuccessAction;
