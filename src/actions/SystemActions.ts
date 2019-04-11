import { Entry, ERROR, LOADING, INITIAL_FETCH_SUCCESS } from "../types";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers/index";
import { Action } from "redux";

export function error() {
  return {
    type: ERROR
  };
}

export function loading(loading: boolean) {
  return {
    type: LOADING,
    loading: loading
  };
}

export function initialFetchSuccess(json: Array<Entry>) {
  return {
    type: INITIAL_FETCH_SUCCESS,
    entries: json
  };
}

export function initialFetch(): ThunkAction<
  void,
  AppState,
  null,
  Action<string>
> {
  return function(dispatch) {
    let init = { method: "GET" };
    fetch("/ester", init)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => dispatch(initialFetchSuccess(response)))
      .then(() => dispatch(loading(false)))
      .catch(() => dispatch(error()));
  };
}
