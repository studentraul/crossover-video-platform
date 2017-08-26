import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { UserIcon, LockIcon } from '../common/Icons'
import InputGroup from '../common/InputGroup'
import ErrorMessage from '../common/ErrorSpan'

import SessionActions from '../../controllers/SessionActions'

import './Login.css'

const session = new SessionActions()

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

    session
      .signIn(username, password)
      .then(response => {
        if(response.status.toLowerCase() === 'error')
          throw new Error(response.error)
        session.setUser(response.sessionId, response.username)
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
