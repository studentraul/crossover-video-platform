export default class ServerRoutes {
  constructor() {
    this._serverIP = 'http://127.0.0.1:3000'
  }

  doReview(userToken) {
    return `${this._serverIP}/video/ratings?sessionId=${userToken}`
  }

  videoList(userToken, skip, limit) {
    return skip && limit
      ? `${this
          ._serverIP}/videos?sessionId=${userToken}&skip=${skip}&limit=${limit}`
      : `http://localhost:3000/videos?sessionId=${userToken}`
  }

  logout(userToken) {
    return `${this._serverIP}/user/logout?sessionId=${userToken}`
  }

  singleVideo(userToken, videoId) {
    return `${this._serverIP}/video?sessionId=${userToken}&videoId=${videoId}`
  }

  get serverIp() {
    return this._serverIP
  }

  get auth() {
    return `${this._serverIP}/user/auth/`
  }
}
