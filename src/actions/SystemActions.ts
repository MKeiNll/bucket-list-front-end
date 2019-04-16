import { EntryDAO, ERROR, LOADING, INITIAL_FETCH_SUCCESS } from "../types";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../reducers/index";
import { Action, ActionCreator } from "redux";

export const error: ActionCreator<Action> = () => ({
  type: ERROR
});

export const loading: ActionCreator<Action> = (loading: boolean) => ({
  type: LOADING,
  loading: loading
});

export const initialFetchSuccess: ActionCreator<Action> = (
  json: Array<EntryDAO>
) => ({
  type: INITIAL_FETCH_SUCCESS,
  entries: json
});

export function initialFetch() {
  return (dispatch: ThunkDispatch<AppState, {}, Action>) => {
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
