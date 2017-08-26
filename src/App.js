import React, { Component } from 'react'
import Header from './components/header/Header'
import './App.css'

import SessionActions from './controllers/SessionActions'
const session = new SessionActions()

class App extends Component {
  render() {
    return (
      <div id="App">
        <Header username={session.username}/>
        {this.props.children}
      </div>
    )
  }
}

export default App
