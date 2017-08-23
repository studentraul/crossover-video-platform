import React, { Component } from 'react'
import {Link} from 'react-router'
import '../css/header.css'

export default class Header extends Component {
  render() {
    return (
      <header className="header-bar">
        <h1>
          <Link className="link" to="/">
            Crossover Portal Video
          </Link>
        </h1>
      </header>
    )
  }
}
