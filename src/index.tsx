import * as React from "react";
import thunkMiddleware from "redux-thunk";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import AsyncApp from "./containers/AsyncApp";
import "./styles/main.css";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

render(
  <Provider store={store}>
    <AsyncApp />
  </Provider>,
  document.getElementById("root")
);
