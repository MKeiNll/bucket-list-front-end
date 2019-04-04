import * as React from "react";
import "../styles/serverStatistics.scss";

export const ServerStatistics = () => (
  <form className="report-button-form" action="report">
    <input type="submit" className="report-button" value="SERVER STATISTICS" />
  </form>
);
