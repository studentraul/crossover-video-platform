import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ErrorSpan.css'

export default class ErrorSpan extends Component {
  render() {
    const { message } = this.props
    return (
      <span className="error-login">
        {message}
      </span>
    )
  }
}

ErrorSpan.propTypes = {
  message: PropTypes.string.isRequired,
}

ErrorSpan.defaultProps = {
  message: ''
}
