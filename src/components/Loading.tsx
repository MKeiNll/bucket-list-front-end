import * as React from "react";
import "../styles/loading.css";
import loading from "../styles/res/loading.gif";

export const Loading = () => (
  <img className="loading" src={loading}></img>
);
