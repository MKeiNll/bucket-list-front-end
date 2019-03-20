import { APP_HAS_ERRORED, APP_IS_LOADING, FETCH_SUCCESS } from "../actions";

export function error(state = false, action) {
  switch (action.type) {
    case APP_HAS_ERRORED:
      return action.hasErrored;
    default:
      return state;
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case APP_IS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}

export function entries(state = [], action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return action.entries;
    default:
      return state;
  }
}
