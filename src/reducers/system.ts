import {
  SystemState,
  ActionTypes,
  ERROR,
  LOADING,
  INITIAL_FETCH_SUCCESS,
  CREATE_ENTRY_SUCCESS,
  DELETE_ENTRY_SUCCESS,
  SELECT_ENTRY_SUCCESS,
  SUBMIT_ENTRY_EDITS_SUCCESS,
  EDIT_ENTRY,
  ISBN_IMAGE_FETCH_SUCCESS
} from "../types";

export const initialState: SystemState = {
  entries: [],
  loading: true,
  error: false,
  isbnImage: ""
};

export function systemReducer(
  state = initialState,
  action: ActionTypes
): SystemState {
  switch (action.type) {
    case ERROR:
      return { ...state, error: true };
    case LOADING:
      return { ...state, loading: action.loading };
    case INITIAL_FETCH_SUCCESS:
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
    case EDIT_ENTRY:
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry.id === action.id) {
            return { ...entry, beingEdited: action.edit };
          } else {
            return entry;
          }
        })
      };
    case SUBMIT_ENTRY_EDITS_SUCCESS:
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
