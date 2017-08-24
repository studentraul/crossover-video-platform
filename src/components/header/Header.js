import React, { Component } from 'react'
import { Link } from 'react-router'
import UserIcon from '../icons/UserIcon'
import './Header.css'

import {getUserName}  from '../../controllers/SectionActions'

export default class Header extends Component {
  render() {
    return (
      <header id="Header">
        <div className="container">
          <div className="logo">
            <h1>
              <Link className="logo__link" to="/">Crossover Video Platform
              </Link>
            </h1>
          </div>
          <div className="user">
            <div className="user__infos">
              <UserIcon classList="user__infos__icon"/>
              <p className="user__infos__username">{getUserName()}</p>
            </div>
            <Link to="/logout" className="user__logout">
              Logout
            </Link>
          </div>
        </div>
      </header>
    )
  }
}
