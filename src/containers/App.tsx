import * as React from "react";
import { Component } from "react";
import { EntryList } from "../components/EntryList";
import { ISBNForm } from "../components/ISBNForm";
import { ServerStatistics } from "../components/ServerStatistics";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import {
  initialFetch,
  deleteEntry,
  editEntry,
  createEntry,
  selectEntry,
  submitEntryEdits,
  fetchIsbnImage
} from "../actions/index";
import { AppState } from "../reducers/index";
import { SystemState } from "../types/index";

interface AppProps {
  systemState: SystemState;
  initialFetch: () => void;
  deleteEntry: (id: number) => void;
  selectEntry: (id: number) => void;
  createEntry: (title: string, content: string) => void;
  editEntry: typeof editEntry;
  submitEntryEdits: (id: number, title: string, content: string) => void;
  fetchIsbnImage: (image: string) => void;
}

interface AppStateProps {
  systemState: SystemState;
}

interface AppDispatchProps {
  initialFetch: () => void;
  deleteEntry: (id: number) => void;
  selectEntry: (id: number) => void;
  createEntry: (title: string, content: string) => void;
  editEntry: typeof editEntry;
  submitEntryEdits: (id: number, title: string, content: string) => void;
  fetchIsbnImage: (image: string) => void;
}

interface AppOwnProps {
  systemState: SystemState;
}

class App extends Component<AppProps> {
  render() {
    let loading: JSX.Element;
    let error: JSX.Element;

    if (this.props.systemState.error) {
      error = <Error />;
    } else {
      error = <></>;
    }

    if (this.props.systemState.loading) {
      loading = <Loading />;
    } else {
      loading = <></>;
    }

    return (
      <div className="root-container">
        {loading}
        {error}
        <EntryList
          entries={this.props.systemState.entries}
          deleteEntry={this.props.deleteEntry}
          editEntry={this.props.editEntry}
          submitEntryEdits={this.props.submitEntryEdits}
          selectEntry={this.props.selectEntry}
          createEntry={this.props.createEntry}
        />
        <ISBNForm
          image={this.props.systemState.isbnImage}
          fetchIsbnImage={this.props.fetchIsbnImage}
        />
        <ServerStatistics />
      </div>
    );
  }

  componentDidMount() {
    this.props.initialFetch();
  }
}

const mapStateToProps = (state: AppState): AppStateProps => ({
  systemState: state.system
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, {}, Action>
): AppDispatchProps => ({
  initialFetch: () => dispatch(initialFetch()),
  deleteEntry: (id: number) => dispatch(deleteEntry(id)),
  selectEntry: (id: number) => dispatch(selectEntry(id)),
  createEntry: (title: string, content: string) =>
    dispatch(createEntry(title, content)),
  editEntry: (id: number, edit: boolean) => dispatch(editEntry(id, edit)),
  submitEntryEdits: (id: number, title: string, content: string) =>
    dispatch(submitEntryEdits(id, title, content)),
  fetchIsbnImage: (image: string) => dispatch(fetchIsbnImage(image))
});

export default connect<AppStateProps, AppDispatchProps, AppOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
