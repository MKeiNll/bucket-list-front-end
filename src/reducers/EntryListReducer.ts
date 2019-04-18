import {
  EntryListState,
  EntryListActionTypes,
  INITIAL_FETCH_SUCCESS,
  CREATE_ENTRY_SUCCESS,
  DELETE_ENTRY_SUCCESS,
  SELECT_ENTRY_SUCCESS,
  SUBMIT_ENTRY_EDITS_SUCCESS,
  EDIT_ENTRY,
  EMPTY_ENTRY_DISCARDED_SUCCESS
} from "../types/index";

export const initialState: EntryListState = {
  entries: []
};

export function entryListReducer(
  state = initialState,
  action: EntryListActionTypes
): EntryListState {
  switch (action.type) {
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
    case EMPTY_ENTRY_DISCARDED_SUCCESS:
      return { ...state };
    default:
      return state;
  }
}
