import * as React from "react";
import "../styles/entryCreationForm.scss";
import { EntryCreationFormProps, EntryCreationFormElements } from "../types";

export class EntryCreationForm extends React.Component<EntryCreationFormProps> {
  constructor(props: EntryCreationFormProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let formElements = event.currentTarget
      .children as EntryCreationFormElements;
    let titleValue = formElements.entryTitle.value;
    let contentValue = formElements.entryContent.value;
    if (!titleValue && !contentValue) {
      console.log("at least one field required");
    } else {
      this.props.createEntry(
        formElements.entryTitle.value,
        formElements.entryContent.value
      );
      formElements.entryTitle.value = "";
      formElements.entryContent.value = "";
    }
  }

  render() {
    return (
      <div className="entry-creation-form">
        <div className="entry-creation-form-title">NEW ENTRY</div>
        <form onSubmit={this.handleSubmit}>
          <input
            className="entry-creation-form-title-input"
            type="text"
            placeholder="Title"
            name="entryTitle"
          />
          <textarea
            className="entry-creation-form-content-input"
            placeholder="Content"
            name="entryContent"
          />
          <br />
          <input
            className="entry-creation-form-submit-button"
            type="submit"
            value="SUBMIT"
          />
        </form>
      </div>
    );
  }
}
