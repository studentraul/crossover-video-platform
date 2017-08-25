import { Component } from 'react'
import { browserHistory } from 'react-router'
import SessionActions from '../../controllers/SessionActions'
const session = new SessionActions()

export default class Logout extends Component {
  componentWillMount() {
    session.logout()
      .then(success => {
        browserHistory.push('/login')
      })
      .catch(err => console.log(err.message))
  }

  render() {
    return null
  }
}
