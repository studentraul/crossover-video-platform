import React from 'react'
import ReactDOM from 'react-dom'
import './css/reset.css'
import './css/index.css'
import './css/home.css'
import './css/login.css'
import App from './App'
import WatchPage from './components/WatchPage'
import Home from './components/Home'
import Login from './components/Login'
import Logout from './components/Logout'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'

function verifySection(nextState, replace) {
  if (!localStorage.getItem('auth-token'))
    replace('/login?msg=You must have been logged to access this content!')
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/" component={App} onEnter={verifySection}>
      <IndexRoute component={Home} onEnter={verifySection} />
      <Route path="/watch(/:id)" component={WatchPage} onEnter={verifySection} />
    </Route >
  </Router>,
  document.getElementById('root'),
)
