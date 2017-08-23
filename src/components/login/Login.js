import React, { Component } from 'react'
import * as md5 from 'blueimp-md5'
import { browserHistory } from 'react-router'
import './Login.css'

import UserIcon from '../icons/UserIcon'
import LockIcon from '../icons/LockIcon'

export default class Login extends Component {
  constructor(props) {
    super()
    this.state = { error: props.location.query.msg || '' }
  }
  login(event) {
    event.preventDefault()
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({
        username: this.username.value,
        password: md5(this.password.value),
      }),
      headers: new Headers({ 'Content-type': 'application/json' }),
    }

    fetch('http://localhost:3000/user/auth/', requestInfo)
      .then(res => {
        if (res.ok) return res.json()
        else throw new Error('User or password invalid! ')
      })
      .then(token => {
        localStorage.setItem('auth-token', token.sessionId)
        localStorage.setItem('username', token.userName)
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
