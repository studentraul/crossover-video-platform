import ServerRoutes from '../config/ServerRoutes.js'
const md5 = require('blueimp-md5')

export default class SessionActions {
  constructor() {
    this._tokenField = 'auth-token'
    this._usernameField = 'username'
    this._routes = new ServerRoutes()
  }

  _cleanUserSession() {
    localStorage.removeItem(this._tokenField)
    localStorage.removeItem(this._usernameField)
  }

  encryptPassword(password) {
    if (!password) throw new Error('Password is required')
    return md5(password)
  }

  saveUserSession(token, username) {
    if (!token) throw new Error('token is required')
    if (!username) throw new Error('username is required')

    localStorage.setItem(this._tokenField, token)
    localStorage.setItem(this._usernameField, username)
  }

  setUser(token, username) {
    try {
      if (!token && !username) throw new Error('Token and Username is required')
      else if (!token) throw new Error('Token is required')
      else if (!username) throw new Error('Username is required')

      this.saveUserSession(token, username)
      return {
        token,
        username,
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  signIn(username, password) {
    if (!username && !password)
      throw new Error('Username and Password is required')
    else if (!username) throw new Error('Username is required')
    else if (!password) throw new Error('Password is required')

    const requestInfo = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        username,
        password: this.encryptPassword(password),
      }),
      headers: new Headers({ 'Content-type': 'application/json' }),
    }

    return fetch(this._routes.auth, requestInfo).then(res => {
      if (res.ok) return res.json()
      else throw new Error('Problem to consult server')
    })
  }

  logout = () => {
    return fetch(this._routes.logout(this.userToken)).then(res => {
      if (res.ok) {
        this._cleanUserSession()
        return res
      } else {
        throw new Error('It was not possible to logout')
      }
    })
  }

  get userToken() {
    return localStorage.getItem(this._tokenField)
  }

  get username() {
    return localStorage.getItem(this._usernameField)
  }

  get isValidUser() {
    return fetch(this._routes.videoList(this.userToken)).then(res => {
      return res.status === 401 ? false : true
    })
  }
}
