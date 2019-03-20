import React from "react";
import PropTypes from "prop-types";

const Entry = ({ selected, title, content }) => (
  <li
    style={{
      color: selected ? "blue" : "black"
    }}
  >
    {" "}
    {title} <br /> {content}{" "}
  </li>
);

export default Entry;
