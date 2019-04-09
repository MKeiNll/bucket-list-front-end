import {
  Entry,
  APP_HAS_ERRORED,
  APP_IS_LOADING,
  ENTRY_FETCH_SUCCESS,
  CREATE_ENTRY_SUCCESS,
  DELETE_ENTRY_SUCCESS,
  SELECT_ENTRY_SUCCESS,
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

export function createEntrySuccess(entry: Entry) {
  return {
    type: CREATE_ENTRY_SUCCESS,
    entry: entry
  };
}

export function deleteEntrySuccess(id: number) {
  return {
    type: DELETE_ENTRY_SUCCESS,
    id: id
  };
}

export function selectEntrySuccess(id: number) {
  return {
    type: SELECT_ENTRY_SUCCESS,
    id: id
  };
}

export function isbnImageFetchSuccessAction(imageData: string) {
  return {
    type: ISBN_IMAGE_FETCH_SUCCESS,
    image: imageData
  };
}

export function entryBeingEdited(id: number) {
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
  fetch("/ester", init)
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
  fetch("/ester?title=" + title + "&content=" + content, init)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(response => {
      Object.assign(response, { beingEdited: false });
      return response;
    })
    .then(response => dispatch(createEntrySuccess(response)))
    .then(() => dispatch(appIsLoading(false)))
    .catch(() => dispatch(appHasErrored(true)));
};

export const deleteEntry = (
  id: number
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  dispatch(appIsLoading(true));
  let init = { method: "DELETE" };
  fetch("/ester/" + id, init)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
    })
    .then(() => dispatch(deleteEntrySuccess(id)))
    .then(() => dispatch(appIsLoading(false)))
    .catch(() => dispatch(appHasErrored(true)));
};

export const selectEntry = (
  id: number
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  dispatch(appIsLoading(true));
  let init = {
    method: "POST"
  };
  fetch("/ester/select?id=" + id, init)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(response => dispatch(selectEntrySuccess(response.id)))
    .then(() => dispatch(appIsLoading(false)))
    .catch(() => dispatch(appHasErrored(true)));
};

export const editEntry = (
  entry: Entry,
  title: string,
  content: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  dispatch(appIsLoading(true));
  entry.title = title;
  entry.content = content;
  let init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry)
  };
  fetch("/ester", init)
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
  fetch("/ester/data/getImageByIsbn?isbnCode=" + isbnCode, init)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(response => dispatch(isbnImageFetchSuccessAction(response.imageData)))
    .then(() => dispatch(appIsLoading(false)))
    .catch(() => dispatch(appHasErrored(true)));
};
