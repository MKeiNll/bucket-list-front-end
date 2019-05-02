import { SystemState, SystemActionTypes, ERROR, LOADING } from "../types/index";

export const initialState: SystemState = {
  loading: true
};

export function systemReducer(
  state = initialState,
  action: SystemActionTypes
): SystemState {
  switch (action.type) {
    case ERROR:
      return { ...state, loading: false, error: action.error };
    case LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}
