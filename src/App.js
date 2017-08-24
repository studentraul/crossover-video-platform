import React, { Component } from 'react'
import Header from './components/header/Header'
import './App.css'

class App extends Component {
  render() {
    return (
      <div id="App">
        <Header />
        
          {this.props.children}
      </div>
    )
  }
}

export default App
