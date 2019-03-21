import {
  SystemState,
  ActionTypes,
  APP_HAS_ERRORED,
  APP_IS_LOADING,
  FETCH_SUCCESS
} from "../types";

export const initialState: SystemState = {
  entries: [],
  isLoading: true,
  hasErrored: false
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
    case FETCH_SUCCESS:
      return Object.assign({}, state, { entries: action.entries });
    default:
      return state;
  }
}
