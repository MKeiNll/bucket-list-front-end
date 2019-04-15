import {
  EntryDAO,
  CREATE_ENTRY_SUCCESS,
  DELETE_ENTRY_SUCCESS,
  SELECT_ENTRY_SUCCESS,
  SUBMIT_ENTRY_EDITS_SUCCESS,
  EDIT_ENTRY
} from "../types";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers/index";
import { Action } from "redux";
import { error, loading } from "./SystemActions";

export function createEntrySuccess(entry: EntryDAO) {
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

export function submitEntryEditsSuccess(
  id: number,
  title: string,
  content: string
) {
  return {
    type: SUBMIT_ENTRY_EDITS_SUCCESS,
    id: id,
    title: title,
    content: content
  };
}

export function editEntry(id: number, edit: boolean) {
  return {
    type: EDIT_ENTRY,
    id: id,
    edit: edit
  };
}

export function createEntry(
  title: string,
  content: string
): ThunkAction<void, AppState, null, Action<string>> {
  return function(dispatch) {
    dispatch(loading(true));
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
      .then(() => dispatch(loading(false)))
      .catch(() => dispatch(error()));
  };
}

export function deleteEntry(
  id: number
): ThunkAction<void, AppState, null, Action<string>> {
  return function(dispatch) {
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
): ThunkAction<void, AppState, null, Action<string>> {
  return function(dispatch) {
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
): ThunkAction<void, AppState, null, Action<string>> {
  return function(dispatch) {
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
