import {
  SystemState,
  ActionTypes,
  APP_HAS_ERRORED,
  APP_IS_LOADING,
  ENTRY_FETCH_SUCCESS,
  CREATE_ENTRY_SUCCESS,
  DELETE_ENTRY_SUCCESS,
  SELECT_ENTRY_SUCCESS,
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
    case CREATE_ENTRY_SUCCESS:
      return Object.assign({}, state, {
        entries: Object.assign([], [...state.entries, action.entry])
      });
    case DELETE_ENTRY_SUCCESS:
      const newEntries = state.entries.filter(entry => {
        return entry.id !== action.id;
      });
      return Object.assign({}, state, {
        entries: newEntries
      });
    case SELECT_ENTRY_SUCCESS:
      const selectedEntry = state.entries.find(entry => {
        return entry.id === action.id;
      });
      if (selectedEntry !== undefined) {
        // IF I COMMENT THIS LOG, IT STOPS WORKING
        // console.log(
        //   Object.assign({}, state, {
        //     entries: Object.assign(
        //       state.entries,
        //       Object.assign(selectedEntry, {
        //         selected: !selectedEntry.selected
        //       })
        //     )
        //   })
        // );
        return Object.assign({}, state, {
          entries: Object.assign(
            state.entries,
            Object.assign(selectedEntry, {
              selected: !selectedEntry.selected
            })
          )
        });
      }
      return Object.assign({}, state, { hasErrored: true });
    case ISBN_IMAGE_FETCH_SUCCESS:
      return Object.assign({}, state, { isbnImage: action.image });
    case ENTRY_BEING_EDITED:
      const entryBeingEdited = state.entries.find(entry => {
        return entry.id === action.id;
      });
      if (entryBeingEdited !== undefined) {
        // let updatedEntries = [...state.entries];
        // updatedEntries[
        //   updatedEntries.indexOf(entryBeingEdited)
        // ] = Object.assign(entryBeingEdited, {
        //   beingEdited: !entryBeingEdited.beingEdited
        // });
        // return Object.assign({}, state, {
        //   entries: newEntries
        // });
      }
      return Object.assign({}, state, { hasErrored: true });
    default:
      return state;
  }
}
