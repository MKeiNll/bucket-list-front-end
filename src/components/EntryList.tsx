import * as React from "react";
import { Component } from "react";
import Entry from "./Entry";

class EntryList extends Component<any, any> {
  render() {
    return (
      <ul>
        {this.props.entries.map(entry => (
          <Entry key={entry.id} {...entry} />
        ))}
      </ul>
    );
  }
}

export default EntryList;
