import * as React from "react";
import { Component } from "react";
import { EntryDAO } from "../types/index";
import { Entry } from "./Entry";
import "../styles/entryList.scss";
import { EntryCreationForm } from "./EntryCreationForm";
import { editEntry } from "../actions/index";

interface EntryListProps {
  entries: Array<EntryDAO>;
  deleteEntry: (id: number) => void;
  editEntry: typeof editEntry;
  submitEntryEdits: (id: number, title: string, content: string) => void;
  selectEntry: (id: number) => void;
  createEntry: (title: string, content: string) => void;
}

export class EntryList extends Component<EntryListProps> {
  render() {
    return (
      <ul className="entry-list">
        <div className="entry-list-title"> BUCKET LIST </div>
        {this.props.entries.map(this.mapEntries)}
        <EntryCreationForm createEntry={this.props.createEntry} />
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
