import * as React from "react";
import "../styles/isbnForm.css";

export class ISBNForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(event.target.value);
  }

  render() {
    let bookImage;
    if (this.props.image != "") {
      bookImage = <img className="bookImage" src={this.props.image} />;
    } else {
      bookImage = "";
    }

    return (
      <div className="isbnForm">
        <span className="isbn-title">ISBN</span>
        {bookImage}
        <form className="isbn-form" onSubmit={this.handleSubmit}>
          <input
            className="isbn-input"
            type="text"
            name="isbnCode"
            placeholder="ISBN Code"
            required
          />
          <input className="isbn-submit" type="submit" value="SUBMIT" />
        </form>
      </div>
    );
  }
}
