import React from 'react'
import ReactDOM from 'react-dom'
import './css/reset.css'
import './Index.css'
import App from './App'
import WatchVideo from './components/watch-page/WatchVideo'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Logout from './components/logout/Logout'

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
      <Route path="/watch(/:id)" component={WatchVideo} onEnter={verifySection} />
    </Route >
  </Router>,
  document.getElementById('root'),
)
