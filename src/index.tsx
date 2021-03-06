import * as React from "react";
import thunkMiddleware from "redux-thunk";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import App from "./containers/App";
import "./styles/main.scss";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState())); // State logging

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
