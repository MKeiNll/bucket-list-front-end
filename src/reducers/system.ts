import {
  SystemState,
  ActionTypes,
  APP_HAS_ERRORED,
  APP_IS_LOADING,
  ENTRY_FETCH_SUCCESS,
  ISBN_IMAGE_FETCH_SUCCESS,
  ENTRY_BEING_EDITED
} from "../types";

export const initialState: SystemState = {
  entries: [],
  isLoading: true,
  hasErrored: false,
  isbnImage: ""
};

export function systemReducer(
  state = initialState,
  action: ActionTypes
): SystemState {
  switch (action.type) {
    case APP_HAS_ERRORED:
      return Object.assign({}, state, { hasErrored: action.hasErrored });
    case APP_IS_LOADING:
      return Object.assign({}, state, { isLoading: action.isLoading });
    case ENTRY_FETCH_SUCCESS:
      return Object.assign({}, state, { entries: action.entries });
    case ISBN_IMAGE_FETCH_SUCCESS:
      return Object.assign({}, state, { isbnImage: action.image });
    case ENTRY_BEING_EDITED:
      // let updatedEntries = Object.assign([], ...state.entries);
      // updatedEntries[action.id].beingEdited = !updatedEntries[action.id]
      //   .beingEdited;
      // console.log(Object.assign([], ...state.entries));
      // return Object.assign({}, state, { entries: updatedEntries });
      return Object.assign({}, state);
    default:
      return state;
  }
}
