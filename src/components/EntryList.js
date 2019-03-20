import React, { Component } from "react";
import PropTypes from "prop-types";
import Entry from "./Entry";

class EntryList extends Component {
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
