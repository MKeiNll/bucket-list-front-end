import * as React from "react";
import "../styles/entryCreationForm.scss";

export class EntryCreationForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(event.target.title.value, event.target.content.value);
    event.target.title.value = "";
    event.target.content.value = "";
  }

  render() {
    let bookImage;
    if (this.props.image != "") {
      bookImage = <img className="bookImage" src={this.props.image} />;
    } else {
      bookImage = "";
    }

    return (
      <div className="entry-creation-form">
        <div className="entry-creation-form-title">NEW ENTRY</div>
        <form onSubmit={this.handleSubmit}>
          <input
            className="entry-creation-form-title-input"
            type="text"
            placeholder="Title"
            name="title"
            required
          />
          <textarea
            className="entry-creation-form-content-input"
            placeholder="Content"
            name="content"
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
