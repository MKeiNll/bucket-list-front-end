import * as React from "react";
import { Component } from "react";
import "../styles/entry.css";

export class Entry extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { title: this.props.title, content: this.props.content };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);

    // this.titleInput = React.createRef();
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleContentChange(e) {
    this.setState({ content: e.target.value });
  }

  render() {
    let entryContent;
    let editButton;
    if (this.props.beingEdited) {
      entryContent = (
        <div className="entry-content-container">
          <input
            // ref={this.titleInput}
            className="entry-title-edit-form"
            style={{
              background: this.props.selected ? "silver" : "whitesmoke"
            }}
            onClick={e => {
              e.stopPropagation();
            }}
            defaultValue={this.props.title}
            onChange={this.handleTitleChange}
            required
          />
          <textarea
            // ref="contentInput"
            className="entry-content-edit-form"
            style={{
              background: this.props.selected ? "silver" : "whitesmoke"
            }}
            defaultValue={this.props.content}
            onChange={this.handleContentChange}
            onClick={e => {
              e.stopPropagation();
            }}
            required
          />
        </div>
      );
      editButton = (
        <button
          className="edit-button-submit"
          onClick={e => {
            e.stopPropagation();
            // console.log(this.refs.titleInput.value);
            this.props.onEditButtonSubmitClick(
              this.state.title,
              this.state.content
              // this.refs.titleInput.value,
              // this.refs.contentInput.value
            );
          }}
        />
      );
    } else {
      entryContent = (
        <div className="entry-content-container">
          <div className="entry-title">{this.props.title}</div>
          <div className="entry-content">{this.props.content}</div>
        </div>
      );
      editButton = (
        <button
          className="edit-button"
          onClick={e => {
            e.stopPropagation();
            this.props.onEditButtonClick();
          }}
        />
      );
    }
    return (
      <li
        className="entry"
        style={{
          background: this.props.selected ? "silver" : "whitesmoke"
        }}
        onClick={e => {
          e.stopPropagation();
          if (!this.props.beingEdited) {
            this.props.onEntryClick();
          }
        }}
      >
        <div className="entry-container">
          {entryContent}
          <div className="entry-button-container">
            <button
              className="delete-button"
              onClick={e => {
                e.stopPropagation();
                this.props.onDeleteButtonClick();
              }}
            />
            {editButton}
          </div>
        </div>
      </li>
    );
  }
}
