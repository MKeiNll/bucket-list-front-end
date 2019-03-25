import * as React from "react";
import { Component } from "react";
import Entry from "./Entry";

class EntryList extends Component<any, any> {
  render() {
    return (
      <ul className="entry-list">
        <span className="title"> BUCKET LIST </span> <br />
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
          />
        ))}
      </ul>
    );
  }
}

export default EntryList;
