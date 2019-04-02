import * as React from "react";
import { Component } from "react";
import { Entry } from "./Entry";
import "../styles/entryList.css";
import { EntryCreationForm } from "./EntryCreationForm";

export class EntryList extends Component<any, any> {
  render() {
    return (
      <ul className="entry-list">
        <div className="title-container">
          <span className="title"> BUCKET LIST </span>
        </div>
        {this.props.entries.map(entry => (
          <Entry
            key={entry.id}
            {...entry}
            onDeleteButtonClick={() => {
              this.props.onDeleteButtonClick(entry.id);
            }}
            onEntryClick={() => {
              this.props.onEntryClick(entry);
            }}
            onEditButtonClick={() => {
              this.props.onEditButtonClick(entry.id);
            }}
            onEditButtonSubmitClick={(title, content) => {
              this.props.onEditButtonSubmitClick(entry, title, content);
            }}
          />
        ))}
        <EntryCreationForm onSubmit={this.props.onSubmitNewEntryClick} />
      </ul>
    );
  }
}
