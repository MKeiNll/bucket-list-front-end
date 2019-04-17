import { combineReducers } from "redux";
import { systemReducer } from "./SystemReducer";
import { entryReducer } from "./EntryReducer";
import { isbnReducer } from "./IsbnReducer";

export const rootReducer = combineReducers({
  systemState: systemReducer,
  entryState: entryReducer,
  isbnState: isbnReducer
});

export type AppState = ReturnType<typeof rootReducer>;
