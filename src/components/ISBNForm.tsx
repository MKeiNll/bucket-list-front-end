import * as React from "react";
import "../styles/isbnForm.css";

export class ISBNForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { isbnCode: "", imageData: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
  this.setState({isbnCode: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let init = { method: "GET" };
    fetch("/api/data?isbnCode=" + this.state.isbnCode, init)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => this.setState({imageData: response.imageData}));
      // .then(() => dispatch(appIsLoading(false)))
      // .catch(() => dispatch(appHasErrored(true)));
  }

  render() {
    let bookImage;
    if (this.state.imageData != "") {
      bookImage = <img className="bookImage" src={this.state.imageData}/>;
    } else {
      bookImage = "";
    }

    return(
      <div className="isbnForm">
      <span className="isbn-title">ISBN</span>
      {bookImage}
      <form className="isbn-form" onSubmit={this.handleSubmit}>
        <input className="isbn-input" onChange={this.handleChange} type="text" name="isbnCode" placeholder="ISBN Code" required />
        <input className="isbn-submit" type="submit" value="SUBMIT" />
      </form>
      </div>
    );
  }
}
