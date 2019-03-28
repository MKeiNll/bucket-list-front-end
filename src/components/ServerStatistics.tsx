import * as React from "react";
import "../styles/serverStatistics.css";

export const ServerStatistics = () => (
  <form action="report" className="report-button-container">
    <input type="submit" className="report-button" value="SERVER STATISTICS" />
  </form>
);
