import { Component } from 'react'
import { browserHistory } from 'react-router'

export default class Logout extends Component {
  componentWillMount() {
    fetch(
      `http://localhost:3000/user/logout?sessionId=${localStorage.getItem(
        'auth-token',
      )}`,
    )
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('It was not possible to logout')
        }
      })
      .then(success => {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('username')
        browserHistory.push('/login')
      })
      .catch(err => console.log(err.message))
  }

  render() {
    return null
  }
}
