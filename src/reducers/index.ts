import { combineReducers } from "redux";
import { error, loading, entries } from "./entries";

export default combineReducers({
  error,
  loading,
  entries
});
