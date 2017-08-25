import * as md5 from 'blueimp-md5'
import ServerRoutes from '../config/ServerRoutes.js'

const STORAGE_TOKEN_FIELD = 'auth-token'
const STORAGE_USERNAME_FIELD = 'username'
const routes = new ServerRoutes()

export const getUserToken = () => localStorage.getItem(STORAGE_TOKEN_FIELD)
export const getUserName = () => localStorage.getItem(STORAGE_USERNAME_FIELD)

export const setUser = (token, username) => {
  try {
    if (!token) throw new Error('Empty Token')
    if (!username) throw new Error('Empty username')

    localStorage.setItem(STORAGE_TOKEN_FIELD, token)
    localStorage.setItem(STORAGE_USERNAME_FIELD, username)
    return {
      token,
      username,
    }
  } catch (error) {
    throw new Error('')
  }
}

export const signIn = (username, password) => {
  const requestInfo = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: new Headers({ 'Content-type': 'application/json' }),
  }

  return fetch(routes.auth, requestInfo).then(res => {
    if (res.ok) return res.json()
    else throw new Error('User or password invalid! ')
  })
}

export const encryptPassword = (password) => md5(password)