import React, { Component } from "react";
import EntryList from "../components/EntryList";
import { connect } from "react-redux";
import { fetchData } from "../actions/index";

class AsyncApp extends Component {
  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    return <EntryList entries={this.props.entries} />;
  }

  componentDidMount() {
    this.props.update();
  }
}

const mapStateToProps = state => {
  return {
    entries: state.entries,
    isLoading: state.loading,
    hasErrored: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: () => dispatch(fetchData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AsyncApp);
