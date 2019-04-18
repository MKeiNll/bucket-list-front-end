import * as React from "react";
import { Component } from "react";
import "../styles/entry.scss";
import { EntryProps } from "../types/index";

export class Entry extends Component<EntryProps> {
  private titleInput: React.RefObject<HTMLInputElement>;
  private contentInput: React.RefObject<HTMLTextAreaElement>;
  constructor(props: EntryProps) {
    super(props);
    this.titleInput = React.createRef();
    this.contentInput = React.createRef();
  }

  render() {
    let entryContent: JSX.Element;
    let editButton: JSX.Element;
    if (this.props.beingEdited) {
      entryContent = (
        <div className="entry-content-container">
          <input
            ref={this.titleInput}
            className="entry-title-edit-form"
            style={{
              background: this.props.selected ? "silver" : "whitesmoke"
            }}
            onClick={e => {
              e.stopPropagation();
            }}
            defaultValue={this.props.title}
            required
          />
          <textarea
            ref={this.contentInput}
            className="entry-content-edit-form"
            style={{
              background: this.props.selected ? "silver" : "whitesmoke"
            }}
            defaultValue={this.props.content}
            onClick={e => {
              e.stopPropagation();
            }}
            required
          />
        </div>
      );
      editButton = (
        <button
          className="entry-submit-button"
          onClick={e => {
            e.stopPropagation();
            let titleValue = this.titleInput.current!.value;
            let contentValue = this.contentInput.current!.value;
            if (!titleValue && !contentValue) {
              this.props.discardEmptyEntry(this.props.id);
            } else {
              if (
                this.props.title !== titleValue ||
                this.props.content !== contentValue
              ) {
                this.props.submitEntryEdits(
                  this.props.id,
                  titleValue,
                  contentValue
                );
              }
              this.props.editEntry(this.props.id, false);
            }
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
          className="entry-edit-button"
          onClick={e => {
            e.stopPropagation();
            this.props.editEntry(this.props.id, true);
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
            this.props.selectEntry(this.props.id);
          }
        }}
      >
        <div className="entry-container">
          {entryContent}
          <div className="entry-button-container">
            <button
              className="entry-delete-button"
              onClick={e => {
                e.stopPropagation();
                this.props.deleteEntry(this.props.id);
              }}
            />
            {editButton}
          </div>
        </div>
      </li>
    );
  }
}
