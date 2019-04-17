import { SystemState, SystemActionTypes, ERROR, LOADING } from "../types/index";

export const initialState: SystemState = {
  loading: true,
  error: false
};

export function systemReducer(
  state = initialState,
  action: SystemActionTypes
): SystemState {
  switch (action.type) {
    case ERROR:
      return { ...state, error: true };
    case LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}
