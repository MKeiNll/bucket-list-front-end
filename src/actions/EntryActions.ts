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
  ENTRY_MOVED_SUCCESS
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

export const deleteEntrySuccess: ActionCreator<Action> = (
  entries: Array<EntryDAO>
) => ({
  type: DELETE_ENTRY_SUCCESS,
  entries: entries
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
  entries: Array<EntryDAO>
) => ({
  type: EMPTY_ENTRY_DISCARDED_SUCCESS,
  entries: entries
});

export const entryMovedSuccess: ActionCreator<Action> = (
  entries: Array<EntryDAO>
) => ({ type: ENTRY_MOVED_SUCCESS, entries: entries });

export function moveEntry(
  meta: {
    oldIndex: number;
    newIndex: number;
  },
  totalEntries: number
): (dispatch: ThunkDispatch<AppState, {}, Action>) => void {
  return (dispatch: ThunkDispatch<AppState, {}, Action>) => {
    dispatch(loading(true));
    let init = { method: "POST" };
    // Reverse indexation
    const from = totalEntries - 1 - meta.oldIndex;
    const to = totalEntries - 1 - meta.newIndex;
    fetch("/api/move?from=" + from + "&to=" + to, init)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => dispatch(entryMovedSuccess(response)))
      .then(() => dispatch(loading(false)))
      .catch(e => dispatch(error(e)));
  };
}

export function initialFetch(): (
  dispatch: ThunkDispatch<AppState, {}, Action>
) => void {
  return (dispatch: ThunkDispatch<AppState, {}, Action>) => {
    let init = { method: "GET" };
    fetch("/api", init)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => dispatch(initialFetchSuccess(response)))
      .then(() => dispatch(loading(false)))
      .catch(e => dispatch(error(e)));
  };
}

export function createEntry(
  title: string,
  content: string
): (dispatch: ThunkDispatch<AppState, {}, Action>) => void {
  return (dispatch: ThunkDispatch<AppState, {}, Action>) => {
    dispatch(loading(true));
    let init = { method: "PUT" };
    fetch("/api?title=" + title + "&content=" + content, init)
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
      .catch(e => dispatch(error(e)));
  };
}

export function deleteEntry(
  id: number
): (dispatch: ThunkDispatch<AppState, {}, Action>) => void {
  return (dispatch: ThunkDispatch<AppState, {}, Action>) => {
    dispatch(loading(true));
    let init = { method: "DELETE" };
    fetch("/api/" + id, init)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => dispatch(deleteEntrySuccess(response)))
      .then(() => dispatch(loading(false)))
      .catch(e => dispatch(error(e)));
  };
}

export function discardEmptyEntry(
  id: number
): (dispatch: ThunkDispatch<AppState, {}, Action>) => void {
  return (dispatch: ThunkDispatch<AppState, {}, Action>) => {
    dispatch(loading(true));
    let init = { method: "DELETE" };
    fetch("/api/" + id, init)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => dispatch(emptyEntryDiscardedSuccess(response)))
      .then(() => dispatch(loading(false)))
      .catch(e => dispatch(error(e)));
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
    fetch("/api/" + id + "/select", init)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => dispatch(selectEntrySuccess(response.id)))
      .then(() => dispatch(loading(false)))
      .catch(e => dispatch(error(e)));
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
    fetch("/api/" + id + "/edit?title=" + title + "&content=" + content, init)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
      })
      .then(() => dispatch(submitEntryEditsSuccess(id, title, content)))
      .then(() => dispatch(loading(false)))
      .catch(e => dispatch(error(e)));
  };
}
