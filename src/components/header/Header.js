import React, { Component } from 'react'
import { Link } from 'react-router'
import { UserIcon } from '../common/Icons'

import PropTypes from 'prop-types'

import './Header.css'

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
    const { username } = this.props
    return (
      <div className="user">
        <div className="user__infos">
          <UserIcon classList="user__infos__icon" />
          <p className="user__infos__username">
            {username}
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
          <UserInfo username={this.props.username} />
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  username: PropTypes.string
}

Header.defaultProps = {
  username: 'user'
}
