import {
  EntryListState,
  EntryListActionTypes,
  INITIAL_FETCH_SUCCESS,
  CREATE_ENTRY_SUCCESS,
  DELETE_ENTRY_SUCCESS,
  SELECT_ENTRY_SUCCESS,
  SUBMIT_ENTRY_EDITS_SUCCESS,
  EDIT_ENTRY,
  EMPTY_ENTRY_DISCARDED_SUCCESS,
  ENTRY_MOVED_SUCCESS,
  EntryDAO
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
    case ENTRY_MOVED_SUCCESS:
    case DELETE_ENTRY_SUCCESS:
    case EMPTY_ENTRY_DISCARDED_SUCCESS:
      return {
        ...state,
        entries: sortEntries(action.entries)
      };
    case CREATE_ENTRY_SUCCESS:
      return {
        ...state,
        entries: sortEntries([...state.entries, action.entry])
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
    default:
      return state;
  }
}

const sortEntries = function(entries: Array<EntryDAO>) {
  return entries.sort(function(a, b) {
    return b.index - a.index;
  });
};
