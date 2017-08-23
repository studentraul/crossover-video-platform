import React, { Component } from 'react'
import * as md5 from 'blueimp-md5'
import {browserHistory} from 'react-router'
import '../css/login.css'

export default class Login extends Component {
  constructor(props) {
    super()
    this.state = { error: props.location.query.msg ||'' }
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
        console.log(token)
        localStorage.setItem('auth-token',token.sessionId)
        localStorage.setItem('username',token.userName)
        browserHistory.push('/')
      })
      .catch(err => this.setState({ error: err.message }))
    console.log(requestInfo)
  }

  render() {
    return (
      <div id="Login">
        <form onSubmit={this.login.bind(this)} className="form-login" action="">
          <header className="form-login__header">
            <h1 className="form-login__header__title">
              Crossover Video Platform
            </h1>
            <span className="form-login__header__error">
              {this.state.error}
            </span>
          </header>
          <div className="input-content">
            <label htmlFor="">User</label>
            <input
              name="username"
              type="text"
              ref={input => (this.username = input)}
            />
          </div>

          <div className="input-content">
            <label htmlFor="">Password</label>
            <input
              name="passowrd"
              type="password"
              ref={input => (this.password = input)}
            />
          </div>
          <button className="form-login__btn-login"> Login</button>
        </form>
      </div>
    )
  }
}
