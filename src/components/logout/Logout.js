import { Component } from 'react'
import { browserHistory } from 'react-router'
import { logout } from '../../controllers/SectionActions'

export default class Logout extends Component {
  componentWillMount() {
    logout()
      .then(success => {
        browserHistory.push('/login')
      })
      .catch(err => console.log(err.message))
  }

  render() {
    return null
  }
}
