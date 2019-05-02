import * as React from "react";
import "../styles/error.scss";
import { ErrorProps } from "../types/PropTypes";

export const Error = (props: ErrorProps) => (
  <div className="error-container">
    <div className="error">{props.error.stack}</div>
  </div>
);
