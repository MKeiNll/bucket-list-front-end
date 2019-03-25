import {
  Entry,
  APP_HAS_ERRORED,
  APP_IS_LOADING,
  FETCH_SUCCESS
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

export function fetchSuccess(json: Array<Entry>) {
  return {
    type: FETCH_SUCCESS,
    entries: json
  };
}

export const fetchData = (): ThunkAction<
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
    .then(response => dispatch(fetchSuccess(response)))
    .then(() => dispatch(appIsLoading(false)))
    .catch(() => dispatch(appHasErrored(true)));
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
    .then(() => dispatch(fetchData()));
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
    .then(() => dispatch(fetchData()));
};
