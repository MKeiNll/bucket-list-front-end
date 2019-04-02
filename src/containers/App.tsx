import * as React from "react";
import { Component } from "react";
import { EntryList } from "../components/EntryList";
import { ISBNForm } from "../components/ISBNForm";
import { ServerStatistics } from "../components/ServerStatistics";
import { Loading } from "../components/Loading";
import { connect } from "react-redux";
import {
  fetchEntries,
  deleteEntry,
  entryBeingEdited,
  createEntry,
  selectEntry,
  editEntry,
  fetchIsbnImage
} from "../actions/index";
import { AppState } from "../reducers/index";
import { SystemState, Entry } from "../types/index";

interface AppProps {
  system: SystemState;
  updateEntries: typeof fetchEntries;
  deleteEntry: typeof deleteEntry;
  selectEntry: typeof selectEntry;
  createEntry: typeof createEntry;
  startEditingEntry: typeof entryBeingEdited;
  submitEditingEntry: typeof editEntry;
  getImage: typeof fetchIsbnImage;
}

interface AppStateProps {
  system: SystemState;
}

interface AppDispatchProps {
  updateEntries: typeof fetchEntries;
  deleteEntry: typeof deleteEntry;
  selectEntry: typeof selectEntry;
  createEntry: typeof createEntry;
  startEditingEntry: typeof entryBeingEdited;
  submitEditingEntry: typeof editEntry;
  getImage: typeof fetchIsbnImage;
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
    } else {
      loading = "";
    }

    return (
      <div className="rootContainer">
        {loading}
        <EntryList
          entries={this.props.system.entries}
          onDeleteButtonClick={this.props.deleteEntry}
          onEditButtonClick={this.props.startEditingEntry}
          onEditButtonSubmitClick={this.props.submitEditingEntry}
          onEntryClick={this.props.selectEntry}
          onSubmitNewEntryClick={this.props.createEntry}
        />
        <ISBNForm
          image={this.props.system.isbnImage}
          onSubmit={this.props.getImage}
        />
        <ServerStatistics />
      </div>
    );
  }

  componentDidMount() {
    this.props.updateEntries();
  }
}

const mapStateToProps = (state: AppState): AppStateProps => ({
  system: state.system
});

const mapDispatchToProps = (dispatch): AppDispatchProps => ({
  updateEntries: () => dispatch(fetchEntries()),
  deleteEntry: (id: number) => dispatch(deleteEntry(id)),
  selectEntry: (entry: Entry) => dispatch(selectEntry(entry)),
  createEntry: (title: string, content: string) =>
    dispatch(createEntry(title, content)),
  startEditingEntry: (id: number) => dispatch(entryBeingEdited(id)),
  submitEditingEntry: (entry: Entry, title: string, content: string) =>
    dispatch(editEntry(entry, title, content)),
  getImage: (image: string) => dispatch(fetchIsbnImage(image))
});

export default connect<AppStateProps, AppDispatchProps, AppOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
