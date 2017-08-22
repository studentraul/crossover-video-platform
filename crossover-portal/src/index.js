import React from 'react'
import ReactDOM from 'react-dom'
import './css/reset.css'
import './css/index.css'
import './css/home.css'
import './css/login.css'
import Home from './Home'
import Login from './components/Login'
import Logout from './components/Logout'

import { Router, Route, browserHistory } from 'react-router'

function verifySection(nextState, replace) {
  if (!localStorage.getItem('auth-token'))
    replace('/?msg=You must have been logged to access this content!')
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/home" component={Home} onEnter={verifySection} />
    <Route path="/" component={Login} />
    <Route path="/logout" component={Logout} />
  </Router>,
  document.getElementById('root'),
)
