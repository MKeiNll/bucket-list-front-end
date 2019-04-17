import {
  IsbnState,
  FetchIsbnImageSuccessAction,
  ISBN_IMAGE_FETCH_SUCCESS
} from "../types/index";

export const initialState: IsbnState = {
  isbnImage: ""
};

export function isbnReducer(
  state = initialState,
  action: FetchIsbnImageSuccessAction
): IsbnState {
  switch (action.type) {
    case ISBN_IMAGE_FETCH_SUCCESS:
      return { ...state, isbnImage: action.image };
    default:
      return state;
  }
}
