import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

import { UserIcon, LockIcon } from '../common/Icons'
import InputGroup from '../common/InputGroup'
import {
  encryptPassword,
  setUser,
  signIn,
} from '../../controllers/SectionActions'

import './Login.css'

class ErrorMessage extends Component {
  render() {
    const { message } = this.props

    return (
      <span className="error-login">
        {message}
      </span>
    )
  }
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}

export default class Login extends Component {
  constructor(props) {
    super()
    this.state = {
      error: props.location.query.msg || '',
      password: '',
      username: '',
    }
  }

  login(event) {
    event.preventDefault()
    const { username, password } = this.state

    signIn(username, encryptPassword(password))
      .then(token => {
        setUser(token.sessionId, token.username)
        browserHistory.push('/')
      })
      .catch(err => {
        this.setState({ error: err.message })
      })
  }

  setUsername(e) {
    this.setState({ username: e.target.value })
  }
  setPassword(e) {
    this.setState({ password: e.target.value })
  }

  render() {
    return (
      <main id="Login" ref={form => (this.form = form)}>
        <div className="container">
          <div className="logo">
            <h1 className="logo__text">Crossover Video Platform</h1>
          </div>
          <ErrorMessage message={this.state.error} />

          <form onSubmit={this.login.bind(this)} className="form-login">
            <InputGroup
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.setUsername.bind(this)}
            >
              <UserIcon classList="icon" />
            </InputGroup>

            <InputGroup
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.setPassword.bind(this)}
            >
              <LockIcon classList="icon" />
            </InputGroup>

            <div className="action">
              <button className="button">Login</button>
            </div>
          </form>
        </div>
      </main>
    )
  }
}
