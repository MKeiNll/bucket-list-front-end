import * as React from "react";
import "../styles/entry.css";

const Entry = ({
  selected,
  title,
  content,
  onDeleteButtonClick,
  onEntryClick
}) => (
  <li
    className="entry"
    style={{
      background: selected ? "silver" : "whitesmoke"
    }}
    onClick={e => {
      e.stopPropagation();
      onEntryClick();
    }}
  >
    <span className="entry-title">{title}</span>
    <span className="entry-content">{content}</span>
    <button
      className="delete-button"
      onClick={e => {
        e.stopPropagation();
        onDeleteButtonClick();
      }}
    />
  </li>
);

export default Entry;
