import {
  Entry,
  APP_HAS_ERRORED,
  APP_IS_LOADING,
  ENTRY_FETCH_SUCCESS,
  ISBN_IMAGE_FETCH_SUCCESS,
  ENTRY_BEING_EDITED
} from "../types";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers/index";
import { Action } from "redux";

export function appHasErrored(hasErrored: boolean) {
  return {
    type: APP_HAS_ERRORED,
    hasErrored: hasErrored
  };
}

export function appIsLoading(isLoading: boolean) {
  return {
    type: APP_IS_LOADING,
    isLoading: isLoading
  };
}

export function entryFetchSuccess(json: Array<Entry>) {
  return {
    type: ENTRY_FETCH_SUCCESS,
    entries: json
  };
}

export function IsbnImageFetchSuccessAction(imageData: string) {
  return {
    type: ISBN_IMAGE_FETCH_SUCCESS,
    image: imageData
  };
}

export function editEntry(id: number) {
  return {
    type: ENTRY_BEING_EDITED,
    id: id
  };
}

export const fetchEntries = (): ThunkAction<
  void,
  AppState,
  null,
  Action<string>
> => async dispatch => {
  dispatch(appIsLoading(true));
  let init = { method: "GET" };
  fetch("/api", init)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(response => dispatch(entryFetchSuccess(response)))
    .then(() => dispatch(appIsLoading(false)))
    .catch(() => dispatch(appHasErrored(true)));
};

export const createEntry = (
  title: string,
  content: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  dispatch(appIsLoading(true));
  let data = { title: title, content: content };
  let init = { method: "PUT" };
  fetch("/api?title=" + title + "&content=" + content, init)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
    })
    .then(() => dispatch(appIsLoading(false)))
    .catch(() => dispatch(appHasErrored(true)))
    .then(() => dispatch(fetchEntries()));
};

export const deleteEntry = (
  id: number
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  dispatch(appIsLoading(true));
  let init = { method: "DELETE" };
  fetch("/api/" + id, init)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
    })
    .catch(() => dispatch(appHasErrored(true)))
    .then(() => dispatch(fetchEntries()));
};

export const selectEntry = (
  entry: Entry
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  dispatch(appIsLoading(true));
  entry.selected = !entry.selected;
  let init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry)
  };
  fetch("/api", init)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
    })
    .catch(() => dispatch(appHasErrored(true)))
    .then(() => dispatch(fetchEntries()));
};

export const fetchIsbnImage = (
  isbnCode: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  dispatch(appIsLoading(true));
  let init = { method: "GET" };
  fetch("/api/data?isbnCode=" + isbnCode, init)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(response => dispatch(IsbnImageFetchSuccessAction(response.imageData)))
    .then(() => dispatch(appIsLoading(false)))
    .catch(() => dispatch(appHasErrored(true)));
};
