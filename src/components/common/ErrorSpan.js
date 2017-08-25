import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './ErrorSpan.css'

export default class ErrorMessage extends Component {
  render() {
    const { message } = this.props
    return (
        <span className="error-login">
          {message}
        </span>
    );
  }
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
  }