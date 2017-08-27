export default class ServerRoutes {
  constructor() {
    this._serverIP = 'https://crossover-video-platform.herokuapp.com'
  }

  videoUrl(url) {
    if (!url) throw new Error('Url is required')
    return `${this._serverIP}/${url}`
  }

  doReview(userToken) {
    if (!userToken) throw new Error('userToken is required')
    return `${this._serverIP}/video/ratings?sessionId=${userToken}`
  }

  videoList(userToken, skip, limit) {
    if (!userToken) throw new Error('userToken is required')
    return skip && limit ?
      `${this
      ._serverIP}/videos?sessionId=${userToken}&skip=${skip}&limit=${limit}` :
      `${this._serverIP}/videos?sessionId=${userToken}`
  }

  logout(userToken) {
    if (!userToken) throw new Error('userToken is required')
    return `${this._serverIP}/user/logout?sessionId=${userToken}`
  }

  singleVideo(userToken, videoId) {
    if (!userToken && !videoId)
      throw new Error('Usertoken and videoId is required')
    else if (!userToken) throw new Error('User token is required')
    else if (!videoId) throw new Error('VideoID is required')

    return `${this._serverIP}/video?sessionId=${userToken}&videoId=${videoId}`
  }

  get serverIp() {
    return this._serverIP
  }

  get auth() {
    return `${this._serverIP}/user/auth/`
  }
}
