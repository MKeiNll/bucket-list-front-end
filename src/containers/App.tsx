import * as React from "react";
import { Component } from "react";
import EntryList from "../components/EntryList";
import { connect } from "react-redux";
import { fetchData } from "../actions/index";
import { AppState } from "../reducers/index";
import { SystemState } from "../types/index";

interface AppProps {
  system: SystemState;
  update: typeof fetchData;
}

class App extends Component<AppProps> {
  render() {
    if (this.props.system.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.system.isLoading) {
      return <p>Loading…</p>;
    }

    return <EntryList entries={this.props.system.entries} />;
  }

  componentDidMount() {
    console.log(this.props);
    this.props.update();
    console.log(this.props);
  }
}

const mapStateToProps = (state: AppState) => ({
  system: state.system
});

const mapDispatchToProps = dispatch => ({
  update: () => dispatch(fetchData())
});

export default connect<AppProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(App);
