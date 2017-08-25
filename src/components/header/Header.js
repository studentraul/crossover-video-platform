import React, { Component } from 'react'
import { Link } from 'react-router'

import SessionActions from '../../controllers/SessionActions'
import { UserIcon } from '../common/Icons'

import './Header.css'

const session = new SessionActions()

class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <h1>
          <Link className="logo__link" to="/">
            Crossover Video Platform
          </Link>
        </h1>
      </div>
    )
  }
}

class UserInfo extends Component {
  render() {
    return (
      <div className="user">
        <div className="user__infos">
          <UserIcon classList="user__infos__icon" />
          <p className="user__infos__username">
            {session.userName}
          </p>
        </div>
        <Link to="/logout" className="user__logout">
          Logout
        </Link>
      </div>
    )
  }
}

export default class Header extends Component {
  render() {
    return (
      <header id="Header">
        <div className="container">
          <Logo />
          <UserInfo />
        </div>
      </header>
    )
  }
}
