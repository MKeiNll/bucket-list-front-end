import * as React from "react";
import { Component } from "react";
import { EntryDAO, EntryListProps } from "../types/index";
import { Entry } from "./Entry";
import "../styles/entryList.scss";
import { EntryCreationForm } from "./EntryCreationForm";
import { List, arrayMove } from "react-movable";

interface asdState {
  items: JSX.Element[];
}

export class EntryList extends Component<EntryListProps, asdState> {
  loads = 0;

  constructor(props: EntryListProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
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
        discardEmptyEntry={this.props.discardEmptyEntry}
      />
    );
  };

  handleChange = function(meta: { oldIndex: number; newIndex: number }) {
    this.setState(prevState => ({
      items: arrayMove(prevState.items, meta.oldIndex, meta.newIndex)
    }));
  };

  render() {
    if (this.loads < 2) {
      this.state = {
        items: this.props.entries.map(this.mapEntries)
      };
      this.loads++;
    }

    return (
      <ul className="entry-list">
        <div className="entry-list-title"> BUCKET LIST </div>
        <List
          values={this.state.items}
          onChange={this.handleChange}
          renderList={({ children, props }) => <ul {...props}>{children}</ul>}
          renderItem={({ value, props }) => <li {...props}>{value}</li>}
        />
        <EntryCreationForm
          submitEmptyEntry={this.props.submitEmptyEntry}
          emptyEntrySubmitted={this.props.emptyEntrySubmitted}
          createEntry={this.props.createEntry}
        />
      </ul>
    );
  }
}
