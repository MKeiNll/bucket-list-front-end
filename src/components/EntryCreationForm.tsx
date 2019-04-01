import * as React from "react";
import "../styles/entryCreationForm.css";

export class EntryCreationForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(event.target.title.value, event.target.content.value);
  }

  render() {
    let bookImage;
    if (this.props.image != "") {
      bookImage = <img className="bookImage" src={this.props.image} />;
    } else {
      bookImage = "";
    }

    return (
      <div className="entryCreationForm">
        <span className="title">NEW ENTRY</span>
        <form className="entry-form" onSubmit={this.handleSubmit}>
          <input
            className="title-input"
            type="text"
            placeholder="Title"
            name="title"
            required
          />
          <textarea
            className="content-input"
            placeholder="Content"
            name="content"
            required
          />
          <input className="entry-submit" type="submit" value="SUBMIT" />
        </form>
      </div>
    );
  }
}
