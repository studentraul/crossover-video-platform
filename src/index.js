import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './App'
import WatchVideo from './components/watch-video/WatchVideo'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Logout from './components/logout/Logout'
import SessionActions from './controllers/SessionActions'

import './css/reset.css'
import './Index.css'

async function verifySection(nextState, replace, callback) {
  const session = new SessionActions()

  try {
    const res = await session.isValidUser
    if (session.userToken && !res) throw new Error('Invalid user')
  } catch (error) {
    replace('/login?msg=You must have been logged to access this content!')
  } finally {
    callback()
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/" component={App} onEnter={verifySection}>
      <IndexRoute component={Home} onEnter={verifySection} />
      <Route
        path="/watch(/:id)"
        component={WatchVideo}
        onEnter={verifySection}
      />
    </Route>
  </Router>,
  document.getElementById('root'),
)
