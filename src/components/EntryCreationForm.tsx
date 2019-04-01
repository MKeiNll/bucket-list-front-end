import * as React from "react";
import "../styles/entryCreationForm.css";

export const EntryCreationForm = () => (
  <div className="entryCreationForm">
    <span className="title">NEW ENTRY</span>
    <form className="entry-form" action="">
      <input className="title-input" type="text" placeholder="Title" />
      <input className="content-input" type="text" placeholder="Content" />
      <input className="entry-submit" type="submit" value="SUBMIT" />
    </form>
  </div>
);
