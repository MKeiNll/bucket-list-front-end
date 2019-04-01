import * as React from "react";
import "../styles/entryCreationForm.css";

export const EntryCreationForm = ({ onSubmit }) => (
  <div className="entryCreationForm">
    <span className="title">NEW ENTRY</span>
    <form
      className="entry-form"
      onSubmit={e => {
        console.log(e.target);
        e.preventDefault();
        onSubmit(e.target.title.value, e.target.content.value);
      }}
    >
      <input
        className="title-input"
        type="text"
        placeholder="Title"
        name="title"
        required
      />
      <input
        className="content-input"
        type="text"
        placeholder="Content"
        name="content"
        required
      />
      <input className="entry-submit" type="submit" value="SUBMIT" />
    </form>
  </div>
);
