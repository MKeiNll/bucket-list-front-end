import * as React from "react";
import { Component } from "react";
import { EntryDAO, EntryListProps } from "../types/index";
import { Entry } from "./Entry";
import "../styles/entryList.scss";
import { EntryCreationForm } from "./EntryCreationForm";

export class EntryList extends Component<EntryListProps> {
  render() {
    return (
      <ul className="entry-list">
        <div className="entry-list-title"> BUCKET LIST </div>
        {this.props.entries.map(this.mapEntries)}
        <EntryCreationForm
          submitEmptyEntry={this.props.submitEmptyEntry}
          emptyEntrySubmitted={this.props.emptyEntrySubmitted}
          createEntry={this.props.createEntry}
        />
      </ul>
    );
  }

  mapEntries = (entry: EntryDAO) => {
    return (
      <Entry
        key={entry.id}
        {...entry}
        id={entry.id}
        deleteEntry={this.props.deleteEntry}
        selectEntry={this.props.selectEntry}
        editEntry={this.props.editEntry}
        submitEntryEdits={this.props.submitEntryEdits}
      />
    );
  };
}
