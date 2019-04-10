import {
  SystemState,
  ActionTypes,
  APP_HAS_ERRORED,
  APP_IS_LOADING,
  ENTRY_FETCH_SUCCESS,
  CREATE_ENTRY_SUCCESS,
  DELETE_ENTRY_SUCCESS,
  SELECT_ENTRY_SUCCESS,
  EDIT_ENTRY_SUCCESS,
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
      return { ...state, hasErrored: action.hasErrored };
    case APP_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case ENTRY_FETCH_SUCCESS:
      return { ...state, entries: action.entries };
    case CREATE_ENTRY_SUCCESS:
      return {
        ...state,
        entries: [...state.entries, action.entry]
      };
    case DELETE_ENTRY_SUCCESS:
      return {
        ...state,
        entries: state.entries.filter(entry => {
          return entry.id !== action.id;
        })
      };
    case SELECT_ENTRY_SUCCESS:
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry.id === action.id) {
            return { ...entry, selected: !entry.selected };
          } else {
            return entry;
          }
        })
      };
    case ISBN_IMAGE_FETCH_SUCCESS:
      return { ...state, isbnImage: action.image };
    case ENTRY_BEING_EDITED:
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry.id === action.id) {
            return { ...entry, beingEdited: !entry.beingEdited };
          } else {
            return entry;
          }
        })
      };
    case EDIT_ENTRY_SUCCESS:
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry.id === action.id) {
            return { ...entry, title: action.title, content: action.content };
          } else {
            return entry;
          }
        })
      };
    default:
      return state;
  }
}
