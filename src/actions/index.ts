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
