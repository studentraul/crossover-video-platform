export default class ServerRoutes {
  constructor() {
    this._serverIP = 'http://127.0.0.1:3000'
  }

  doReview(userToken) {
    return `${this._serverIP}/video/ratings?sessionId=${userToken}`
  }

  videoList(userToken) {
    return `http://localhost:3000/videos?sessionId=${userToken}`
  }

  get serverIp() {
    return this._serverIP
  }

  get auth() {
    return `${this._serverIP}/user/auth/`
  }
}
