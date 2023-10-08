import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.min.js'; // Import Bootstrap JS

class FeedbackForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      message: '',
      rating: 0,
    };
  }

  // Handle form input changes
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Handle form submission
  handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic to submit the form data (e.g., to an API)
    // You can access form data using this.state
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2>Feedback</h2>
          <div className="col-md-9 col-md-offset-0">
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              {/* Name input */}
              <div className="form-group">
                <label className="col-md-3 control-label" htmlFor="name">
                  Full Name
                </label>
                <div className="col-md-9">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              {/* Email input */}
              <div className="form-group">
                <label className="col-md-3 control-label" htmlFor="email">
                  Your E-mail
                </label>
                <div className="col-md-9">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Your email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              {/* Message body */}
              <div className="form-group">
                <label className="col-md-3 control-label" htmlFor="message">
                  Your message
                </label>
                <div className="col-md-9">
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    placeholder="Please enter your feedback here..."
                    rows="5"
                    value={this.state.message}
                    onChange={this.handleInputChange}
                  ></textarea>
                </div>
              </div>

              {/* Rating */}
              <div className="form-group">
                <label className="col-md-3 control-label" htmlFor="rating">
                  Your rating
                </label>
                <div className="col-md-9">
                  <input
                    id="input-21e"
                    name="rating"
                    value={this.state.rating}
                    type="number"
                    className="rating"
                    min="0"
                    max="5"
                    step="0.5"
                    data-size="xs"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              {/* Form actions */}
              <div className="form-group">
                <div className="col-md-12 text-center">
                  <img
                    src="http://www.gohacking.com/wp-content/uploads/2010/06/captcha-300x171.jpg"
                    height="140px"
                    width="270px"
                    alt="Captcha"
                  />
                  <br />
                  <button type="submit" className="btn btn-primary btn-md">
                    Submit
                  </button>
                  <button
                    type="reset"
                    className="btn btn-default btn-md"
                    onClick={() =>
                      this.setState({
                        name: '',
                        email: '',
                        message: '',
                        rating: 0,
                      })
                    }
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedbackForm;
