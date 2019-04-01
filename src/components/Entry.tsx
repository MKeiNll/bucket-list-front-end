import * as React from "react";
import "../styles/entry.css";

const Entry = ({
  selected,
  beingEdited,
  title,
  content,
  onDeleteButtonClick,
  onEditButtonClick,
  onEntryClick
}) => (
  <li
    className="entry"
    style={{
      background: selected ? "silver" : "whitesmoke",
      color: beingEdited ? "red" : "black"
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
    <button
      className="edit-button"
      onClick={e => {
        e.stopPropagation();
        onEditButtonClick();
      }}
    />
  </li>
);

export default Entry;
