import {
  EntryCreationFormState,
  EntryCreationFormActionTypes,
  EMPTY_ENTRY_SUBMITTED,
  CREATE_ENTRY_SUCCESS
} from "../types/index";

export const initialState: EntryCreationFormState = {
  emptyEntrySubmitted: false
};

export function entryCreationFormReducer(
  state = initialState,
  action: EntryCreationFormActionTypes
): EntryCreationFormState {
  switch (action.type) {
    case EMPTY_ENTRY_SUBMITTED:
      return { ...state, emptyEntrySubmitted: true };
    case CREATE_ENTRY_SUCCESS:
      return { ...state, emptyEntrySubmitted: false };
    default:
      return state;
  }
}
