export default class ServerRoutes {
  constructor() {
    this._serverIP = 'http://127.0.0.1:3000'
  }

  doReview(userId) {
    return `${this._serverIP}/video/ratings?sessionId=${userId}`
  }
  get serverIp() {
    return this._serverIP
  }

  get auth() {
    return `${this._serverIP}/user/auth/`
  }
}
