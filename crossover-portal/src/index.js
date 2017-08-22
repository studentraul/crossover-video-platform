import React from 'react'
import ReactDOM from 'react-dom'
import './css/reset.css'
import './css/index.css'
import './css/home.css'
import './css/login.css'
import Home from './Home'
import Login from './components/Login'

import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/home" component={Home}/>
    <Route path="/login" component={Login}/>
    <Route path="" component=""/>
  </Router>
), document.getElementById('root'))
