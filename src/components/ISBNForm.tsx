import * as React from "react";
import "../styles/isbnForm.scss";

export class ISBNForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModalView = this.showModalView.bind(this);
    this.closeModalView = this.closeModalView.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener("click", this.closeModalView);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(event.target.isbnCode.value);
  }

  showModalView() {
    let modal = document.getElementById("modalView");
    if (modal !== null) {
      modal.style.display = "block";
    }
  }

  closeModalView() {
    let modal = document.getElementById("modalView");
    if (modal !== null) {
      modal.style.display = "none";
    }
  }

  render() {
    let bookImage;
    if (this.props.image != "") {
      bookImage = (
        <img
          onClick={this.showModalView}
          className="isbn-form-image"
          src={"data:image/jpeg;base64," + this.props.image}
        />
      );
    } else {
      bookImage = "";
    }

    return (
      <div className="isbn-form">
        <div className="isbn-form-title">ISBN</div>
        {bookImage}
        <form className="isbn-form-form" onSubmit={this.handleSubmit}>
          <input
            className="isbn-form-input"
            type="text"
            name="isbnCode"
            placeholder="ISBN Code"
            required
          />
          <input
            className="isbn-form-submit-button"
            type="submit"
            value="SUBMIT"
          />
        </form>
        <div id="modalView" className="isbn-form-modal-view">
          <iframe className="isbn-form-iframe" src="iframe" />
        </div>
      </div>
    );
  }
}
