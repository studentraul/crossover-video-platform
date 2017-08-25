import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './InputGroup.css'

export default class InputGroup extends Component {
  render() {
    const { type, name, cssClasses, placeholder, value, onChange } = this.props
    return (
      <div className="InputGroup">
        {this.props.children}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`input ${cssClasses ? cssClasses : ''}`}
        />
      </div>
    )
  }
}

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  cssClasses: PropTypes.string,
}
