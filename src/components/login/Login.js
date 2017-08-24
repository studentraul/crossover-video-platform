import React, { Component } from 'react'
import * as md5 from 'blueimp-md5'
import { browserHistory } from 'react-router'
import './Login.css'

import UserIcon from '../icons/UserIcon'
import LockIcon from '../icons/LockIcon'

import { setUser, signIn } from '../../controllers/SectionActions'

export default class Login extends Component {
  constructor(props) {
    super()
    this.state = { error: props.location.query.msg || '' }
  }

  login(event) {
    event.preventDefault()

    signIn(this.username.value, md5(this.password.value))
      .then(token => {
        setUser(token.sessionId, token.username)
        browserHistory.push('/')
      })
      .catch(err => this.setState({ error: err.message }))
  }

  render() {
    return (
      <main id="Login">
        <div className="container">
          <div className="logo">
            <h1 className="logo__text">Crossover Video Platform</h1>
          </div>
          <span className="error-login">
            {this.state.error}
          </span>
          <form onSubmit={this.login.bind(this)} className="form-login">
            <div className="input-group">
              <UserIcon classList="icon" />
              <input
                name="username"
                type="text"
                className="input"
                ref={input => (this.username = input)}
              />
            </div>
            <div className="input-group">
              <LockIcon classList="icon" />
              <input
                name="password"
                type="password"
                className="input"
                ref={input => (this.password = input)}
              />
            </div>
            <div className="action">
              <button className="button">Login</button>
            </div>
          </form>
        </div>
      </main>
    )
  }
}
