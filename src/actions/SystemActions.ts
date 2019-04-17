import { ERROR, LOADING } from "../types/index";
import { Action, ActionCreator } from "redux";

export const error: ActionCreator<Action> = () => ({
  type: ERROR
});

export const loading: ActionCreator<Action> = (loading: boolean) => ({
  type: LOADING,
  loading: loading
});
