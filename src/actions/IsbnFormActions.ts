import { ISBN_IMAGE_FETCH_SUCCESS } from "../types";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers/index";
import { Action } from "redux";
import { loading, error } from "./SystemActions";

export function fetchIsbnImageSuccess(imageData: string) {
  return {
    type: ISBN_IMAGE_FETCH_SUCCESS,
    image: imageData
  };
}

export function fetchIsbnImage(
  isbnCode: string
): ThunkAction<void, AppState, null, Action<string>> {
  return function(dispatch) {
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
