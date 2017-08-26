import * as md5 from 'blueimp-md5'
import ServerRoutes from '../config/ServerRoutes.js'

export default class SessionActions {
  constructor() {
    this._tokenField = 'auth-token'
    this._usernameField = 'username'
    this._routes = new ServerRoutes()
  }

  cleanUserSession() {
    localStorage.removeItem(this._tokenField)
    localStorage.removeItem(this._usernameField)
  }

  encryptPassword(password) {
    return md5(password)
  }

  saveUserSession(token, username) {
    localStorage.setItem(this._tokenField, token)
    localStorage.setItem(this._usernameField, username)
  }

  setUser(token, username) {
    try {
      if (!token) throw new Error('Empty Token')
      if (!username) throw new Error('Empty username')

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
        this.cleanUserSession()
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
