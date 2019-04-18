import { combineReducers } from "redux";
import { systemReducer } from "./SystemReducer";
import { entryListReducer } from "./EntryListReducer";
import { entryCreationFormReducer } from "./EntryCreationFormReducer";
import { isbnReducer } from "./IsbnReducer";

export const rootReducer = combineReducers({
  systemState: systemReducer,
  entryListState: entryListReducer,
  entryCreationFormState: entryCreationFormReducer,
  isbnState: isbnReducer
});

export type AppState = ReturnType<typeof rootReducer>;
