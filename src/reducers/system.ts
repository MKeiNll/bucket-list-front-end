import update from "immutability-helper";
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
      return update(state, { hasErrored: { $set: action.hasErrored } });
    case APP_IS_LOADING:
      return update(state, { isLoading: { $set: action.isLoading } });
    case ENTRY_FETCH_SUCCESS:
      return update(state, { entries: { $set: action.entries } });
    case CREATE_ENTRY_SUCCESS:
      return update(state, {
        entries: { $set: update(state.entries, { $push: [action.entry] }) }
      });
    case DELETE_ENTRY_SUCCESS:
      return update(state, {
        entries: {
          $set: state.entries.filter(entry => {
            return entry.id !== action.id;
          })
        }
      });
    case SELECT_ENTRY_SUCCESS:
      console.log("entries: ");
      console.log(state.entries);
      const selectedEntry = state.entries.find(entry => {
        return entry.id === action.id;
      });
      console.log("selected: ");
      console.log(selectedEntry);
      const updatedEntry = update(selectedEntry, {
        selected: { $set: !selectedEntry!.selected }
      });
      console.log("updated: ");
      console.log(updatedEntry);

      const entries = update(state.entries, {
        $push: updatedEntry
      });
      console.log("entries: ");
      console.log(entries);

      // return update(state, {
      //   entries: {
      //     $set: entries
      //   }
      // });
      // if (selectedEntry !== undefined) {
      //   return Object.assign({}, state, {
      //     entries: Object.assign(
      //       state.entries,
      //       Object.assign(selectedEntry, {
      //         selected: !selectedEntry.selected
      //       })
      //     )
      //   });
      // }
      return Object.assign({}, state, { hasErrored: true });
    case ISBN_IMAGE_FETCH_SUCCESS:
      return Object.assign({}, state, { isbnImage: action.image });
    case ENTRY_BEING_EDITED:
      const entryBeingEdited = state.entries.find(entry => {
        return entry.id === action.id;
      });
      if (entryBeingEdited !== undefined) {
        let updatedEntries = [...state.entries];
        updatedEntries[
          updatedEntries.indexOf(entryBeingEdited)
        ] = Object.assign(entryBeingEdited, {
          beingEdited: !entryBeingEdited.beingEdited
        });
        return Object.assign({}, state, {
          entries: updatedEntries
        });
      }
      return Object.assign({}, state, { hasErrored: true });
    default:
      return state;
  }
}
