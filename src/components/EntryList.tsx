import * as React from "react";
import { Component } from "react";
import { Entry } from "./Entry";
import "../styles/entryList.scss";
import { EntryCreationForm } from "./EntryCreationForm";

export class EntryList extends Component<any, any> {
  render() {
    return (
      <ul className="entry-list">
        <div className="entry-list-title"> BUCKET LIST </div>
        {this.props.entries.map(entry => (
          <Entry
            key={entry.id}
            {...entry}
            deleteEntry={() => {
              this.props.deleteEntry(entry.id);
            }}
            selectEntry={() => {
              this.props.selectEntry(entry.id);
            }}
            editEntry={edit => {
              this.props.editEntry(entry.id, edit);
            }}
            submitEntryEdits={(title, content) => {
              this.props.submitEntryEdits(entry.id, title, content);
            }}
          />
        ))}
        <EntryCreationForm onSubmit={this.props.createEntry} />
      </ul>
    );
  }
}
