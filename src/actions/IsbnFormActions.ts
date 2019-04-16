import { ISBN_IMAGE_FETCH_SUCCESS } from "../types";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../reducers/index";
import { Action, ActionCreator } from "redux";
import { loading, error } from "./SystemActions";

export const fetchIsbnImageSuccess: ActionCreator<Action> = (
  imageData: string
) => ({
  type: ISBN_IMAGE_FETCH_SUCCESS,
  image: imageData
});

export function fetchIsbnImage(isbnCode: string) {
  return (dispatch: ThunkDispatch<AppState, {}, Action>) => {
    dispatch(loading(true));
    let init = { method: "GET" };
    fetch("/ester/data/getImageByIsbn?isbnCode=" + isbnCode, init)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => dispatch(fetchIsbnImageSuccess(response.imageData)))
      .then(() => dispatch(loading(false)))
      .catch(() => dispatch(error()));
  };
}
