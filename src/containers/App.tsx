import * as React from "react";
import { Component } from "react";
import { EntryList } from "../components/EntryList";
import { IsbnForm } from "../components/IsbnForm";
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
  emptyEntrySubmitted,
  discardEmptyEntry,
  moveEntry,
  fetchIsbnImage
} from "../actions/index";
import { AppState } from "../reducers/index";
import { AppProps, AppStateProps, AppDispatchProps } from "../types";

class App extends Component<AppProps> {
  render() {
    let loading: JSX.Element = <></>;
    let error: JSX.Element = <></>;

    if (this.props.systemState.error) {
      error = <Error error={this.props.systemState.error} />;
    } else {
      if (this.props.systemState.loading) {
        loading = <Loading />;
      }
    }

    return (
      <div className="root-container">
        {loading}
        {error}
        <EntryList
          entries={this.props.entryListState.entries}
          deleteEntry={this.props.deleteEntry}
          editEntry={this.props.editEntry}
          submitEntryEdits={this.props.submitEntryEdits}
          selectEntry={this.props.selectEntry}
          createEntry={this.props.createEntry}
          submitEmptyEntry={this.props.submitEmptyEntry}
          emptyEntrySubmitted={
            this.props.entryCreationFormState.emptyEntrySubmitted
          }
          discardEmptyEntry={this.props.discardEmptyEntry}
          moveEntry={this.props.moveEntry}
        />
        <IsbnForm
          isbnImage={this.props.isbnState.isbnImage}
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
  systemState: state.systemState,
  entryListState: state.entryListState,
  entryCreationFormState: state.entryCreationFormState,
  isbnState: state.isbnState
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
  submitEmptyEntry: () => dispatch(emptyEntrySubmitted()),
  discardEmptyEntry: (id: number) => dispatch(discardEmptyEntry(id)),
  moveEntry: (
    meta: { oldIndex: number; newIndex: number },
    totalEntries: number
  ) => dispatch(moveEntry(meta, totalEntries)),
  fetchIsbnImage: (image: string) => dispatch(fetchIsbnImage(image))
});

export default connect<AppStateProps, AppDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
