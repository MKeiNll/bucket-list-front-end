import * as React from "react";
import { Component } from "react";
import { EntryList } from "../components/EntryList";
import { ISBNForm } from "../components/ISBNForm";
import { ServerStatistics } from "../components/ServerStatistics";
import { Loading } from "../components/Loading";
import { connect } from "react-redux";
import { fetchData, deleteEntry, selectEntry } from "../actions/index";
import { AppState } from "../reducers/index";
import { SystemState, Entry } from "../types/index";

interface AppProps {
  system: SystemState;
  update: typeof fetchData;
  delete: typeof deleteEntry;
  select: typeof selectEntry;
}

interface AppStateProps {
  system: SystemState;
}

interface AppDispatchProps {
  update: typeof fetchData;
  delete: typeof deleteEntry;
  select: typeof selectEntry;
}

interface AppOwnProps {
  system: SystemState;
}

class App extends Component<AppProps, {}> {
  render() {
    let loading;

    if (this.props.system.hasErrored) {
      return <p>Sorry! There was an error loading the items </p>;
    }

    if (this.props.system.isLoading) {
      loading = <Loading />;
    }
    else {
      loading = "";
    }

    return (
      <div className = "rootContainer">
      {loading}
      <EntryList
        entries={this.props.system.entries}
        onDeleteButtonClick={this.props.delete}
        onEntryClick={this.props.select}
      /><ISBNForm />
      <ServerStatistics />
      </div>
    );
  }

  componentDidMount() {
    this.props.update();
  }
}

const mapStateToProps = (state: AppState): AppStateProps => ({
  system: state.system
});

const mapDispatchToProps = (dispatch): AppDispatchProps => ({
  update: () => dispatch(fetchData()),
  delete: (id: number) => dispatch(deleteEntry(id)),
  select: (entry: Entry) => dispatch(selectEntry(entry))
});

export default connect <AppStateProps, AppDispatchProps, AppOwnProps>
  (mapStateToProps, mapDispatchToProps)(App);
