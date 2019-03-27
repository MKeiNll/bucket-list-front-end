import * as React from "react";
import { Component } from "react";
import Entry from "./Entry";

export class EntryList extends Component<any, any> {
  render() {
    return (
      <ul className="entry-list">
        <div className="title-container">
          <span className="title"> BUCKET LIST </span>
          <form action="report">
            <input type="submit" className="report-button" value="REPORT" />
          </form>
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
          />
        ))}
      </ul>
    );
  }
}
