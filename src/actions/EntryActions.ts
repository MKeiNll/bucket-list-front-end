import {
  EntryDAO,
  CREATE_ENTRY_SUCCESS,
  DELETE_ENTRY_SUCCESS,
  SELECT_ENTRY_SUCCESS,
  SUBMIT_ENTRY_EDITS_SUCCESS,
  EDIT_ENTRY,
  INITIAL_FETCH_SUCCESS,
  EMPTY_ENTRY_SUBMITTED,
  EMPTY_ENTRY_DISCARDED_SUCCESS,
  ENTRY_MOVED
} from "../types/index";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../reducers/index";
import { Action, ActionCreator } from "redux";
import { error, loading } from "./SystemActions";

export const initialFetchSuccess: ActionCreator<Action> = (
  json: Array<EntryDAO>
) => ({
  type: INITIAL_FETCH_SUCCESS,
  entries: json
});

export const createEntrySuccess: ActionCreator<Action> = (entry: EntryDAO) => ({
  type: CREATE_ENTRY_SUCCESS,
  entry: entry
});

export const deleteEntrySuccess: ActionCreator<Action> = (id: number) => ({
  type: DELETE_ENTRY_SUCCESS,
  id: id
});

export const selectEntrySuccess: ActionCreator<Action> = (id: number) => ({
  type: SELECT_ENTRY_SUCCESS,
  id: id
});

export const submitEntryEditsSuccess: ActionCreator<Action> = (
  id: number,
  title: string,
  content: string
) => ({
  type: SUBMIT_ENTRY_EDITS_SUCCESS,
  id: id,
  title: title,
  content: content
});

export const editEntry: ActionCreator<Action> = (
  id: number,
  edit: boolean
) => ({
  type: EDIT_ENTRY,
  id: id,
  edit: edit
});

export const emptyEntrySubmitted: ActionCreator<Action> = () => ({
  type: EMPTY_ENTRY_SUBMITTED
});

export const emptyEntryDiscardedSuccess: ActionCreator<Action> = (
  id: number
) => ({
  type: EMPTY_ENTRY_DISCARDED_SUCCESS,
  id: id
});

export const entryMoved: ActionCreator<Action> = (meta: {
  oldIndex: number;
  newIndex: number;
}) => ({
  type: ENTRY_MOVED,
  meta: meta
});

export function initialFetch(): (
  dispatch: ThunkDispatch<AppState, {}, Action>
) => void {
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

export function createEntry(
  title: string,
  content: string
): (dispatch: ThunkDispatch<AppState, {}, Action>) => void {
  return (dispatch: ThunkDispatch<AppState, {}, Action>) => {
    dispatch(loading(true));
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
      .then(() => dispatch(loading(false)))
      .catch(() => dispatch(error()));
  };
}

export function deleteEntry(
  id: number
): (dispatch: ThunkDispatch<AppState, {}, Action>) => void {
  return (dispatch: ThunkDispatch<AppState, {}, Action>) => {
    dispatch(loading(true));
    let init = { method: "DELETE" };
    fetch("/ester/" + id, init)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
      })
      .then(() => dispatch(emptyEntryDiscardedSuccess(id)))
      .then(() => dispatch(loading(false)))
      .catch(() => dispatch(error()));
  };
}

export function discardEmptyEntry(
  id: number
): (dispatch: ThunkDispatch<AppState, {}, Action>) => void {
  return (dispatch: ThunkDispatch<AppState, {}, Action>) => {
    dispatch(loading(true));
    let init = { method: "DELETE" };
    fetch("/ester/" + id, init)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
      })
      .then(() => dispatch(deleteEntrySuccess(id)))
      .then(() => dispatch(loading(false)))
      .catch(() => dispatch(error()));
  };
}

export function selectEntry(
  id: number
): (dispatch: ThunkDispatch<AppState, {}, Action>) => void {
  return (dispatch: ThunkDispatch<AppState, {}, Action>) => {
    dispatch(loading(true));
    let init = {
      method: "POST"
    };
    fetch("/ester/" + id + "/select", init)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => dispatch(selectEntrySuccess(response.id)))
      .then(() => dispatch(loading(false)))
      .catch(() => dispatch(error()));
  };
}

export function submitEntryEdits(
  id: number,
  title: string,
  content: string
): (dispatch: ThunkDispatch<AppState, {}, Action>) => void {
  return (dispatch: ThunkDispatch<AppState, {}, Action>) => {
    dispatch(loading(true));
    let init = {
      method: "POST"
    };
    fetch("/ester/" + id + "/edit?title=" + title + "&content=" + content, init)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
      })
      .then(() => dispatch(submitEntryEditsSuccess(id, title, content)))
      .then(() => dispatch(loading(false)))
      .catch(() => dispatch(error()));
  };
}
