import * as React from "react";

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
