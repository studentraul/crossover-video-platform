import { SERVER_IP } from '../config/server-address.js'

const STORAGE_TOKEN_FIELD = 'auth-token'
const STORAGE_USERNAME_FIELD = 'username'

export const getUserToken = () => localStorage.getItem(STORAGE_TOKEN_FIELD)
export const getUserName = () => localStorage.getItem(STORAGE_USERNAME_FIELD)

export const setUser = (token, username) => {
  try {
    console.log('Estamos aqui?',token,username)
    if (!token) throw { msg: 'Empty Token' }
    if (!username) throw { msg: 'Empty username' }

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

  return fetch(SERVER_IP + 'user/auth/', requestInfo).then(res => {
    if (res.ok) return res.json()
    else throw new Error('User or password invalid! ')
  })
}
