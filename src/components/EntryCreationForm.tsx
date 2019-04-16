import * as React from "react";
import "../styles/entryCreationForm.scss";

interface EntryCreationFormProps {
  createEntry: (title: string, content: string) => void;
}

interface EntryCreationFormElements extends HTMLCollection {
  entryTitle: HTMLInputElement;
  entryContent: HTMLInputElement;
}

export class EntryCreationForm extends React.Component<EntryCreationFormProps> {
  constructor(props: EntryCreationFormProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let formElements = event.currentTarget
      .children as EntryCreationFormElements;
    this.props.createEntry(
      formElements.entryTitle.value,
      formElements.entryContent.value
    );
    formElements.entryTitle.value = "";
    formElements.entryContent.value = "";
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
            required
          />
          <textarea
            className="entry-creation-form-content-input"
            placeholder="Content"
            name="entryContent"
            required
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
