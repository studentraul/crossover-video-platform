import ServerRoutes from '../../config/ServerRoutes'

describe('ServerRoutes functions', () => {
  let routes = new ServerRoutes()
  let actualIp = 'https://crossover-video-platform.herokuapp.com'
  const token = '12341234'
  const videoId = '123123'

  describe('VideoUrl: route Cases', () => {
    it('should throw when do not pass a URL', () => {
      const validationRegx = /url is required/gi

      expect(() => routes.videoUrl()).toThrow(validationRegx)
      expect(() => routes.videoUrl('')).toThrow(validationRegx)
      expect(() => routes.videoUrl(null)).toThrow(validationRegx)
    })

    it(`should return videoUrl when passed an URL`, () => {
      const url = 'video?videoId=123123'

      const route = `${actualIp}/${url}`
      expect(routes.videoUrl(url)).toBe(route)
    })
  })

  describe('doReview: route Cases', () => {

    it('should throw when do not pass args', () => {
      const validationRegx = /usertoken is required/gi

      expect(() => routes.doReview()).toThrow(validationRegx)
      expect(() => routes.doReview('')).toThrow(validationRegx)
      expect(() => routes.doReview(null)).toThrow(validationRegx)
    })

    it(`should return doReview URL when passed a usertoken`, () => {
      const route = `${actualIp}/video/ratings?sessionId=${token}`

      expect(routes.doReview(token)).toBe(route)
    })

  })

  describe('SingleVideo: Route cases', () => {
    it('should throw when do not pass args', () => {
      const validationRegex = /usertoken and videoid is required/gi

      expect(() => routes.singleVideo()).toThrow(validationRegex)
    })

    it('should throw when pass a null videoId', () => {
      const validationRegex = /videoid is required/gi

      expect(() => routes.singleVideo('123123', null)).toThrow(
        validationRegex)
      expect(() => routes.singleVideo('123123', undefined)).toThrow(
        validationRegex)
      expect(() => routes.singleVideo('123123', '')).toThrow(
        validationRegex)
    })

    it('should throw when pass a null userToken', () => {
      const validationRegex = /user token is required/gi

      expect(() => routes.singleVideo(undefined, '123')).toThrow(
        validationRegex)
      expect(() => routes.singleVideo(null, '123')).toThrow(
        validationRegex)
      expect(() => routes.singleVideo('', '123')).toThrow(
        validationRegex)
    })

    it(`should return route to get video by Id`, () => {
      expect(routes.singleVideo(token, videoId)).toBe(
        `${actualIp}/video?sessionId=${token}&videoId=${videoId}`,
      )
    })
  })

  describe('Logout: route cases', () => {

    it('should throw when do not pass args', () => {
      const validationRegx = /usertoken is required/gi

      expect(() => routes.logout()).toThrow(validationRegx)
      expect(() => routes.logout('')).toThrow(validationRegx)
      expect(() => routes.logout(null)).toThrow(validationRegx)
    })

    it(`should return route to logout that receive a token`, () => {
      const url = `${actualIp}/user/logout?sessionId=${token}`

      expect(routes.logout(token)).toBe(url)
    })
  });

  describe('VideoList: Route cases', () => {
    it('should throw then do not pass token to the function', () => {
      const validationRegex = /usertoken is required/gi

      expect(() => routes.videoList()).toThrow(validationRegex)
    })

    it(
      'should return a URL without skip and limit args when not passed',
      () => {
        expect(routes.videoList(token)).toBe(
          `${actualIp}/videos?sessionId=${token}`,
        )
      })

    it(
      'should return a URL without skip and limit args when passed just one of then',
      () => {
        const url = `${actualIp}/videos?sessionId=${token}`

        expect(routes.videoList(token, 1)).toBe(url)
      })

    it('should return a URL with skip and limit params', () => {
      const skip = 1
      const limit = 3
      const url = `${actualIp}/videos?sessionId=${token}&skip=${skip}&limit=${limit}`

      expect(routes.videoList(token, skip, limit)).toBe(url)
    })
  })

  describe('Getters', () => {
    it(`should return the actual IP from the server ${actualIp}`, () => {
      expect(routes.serverIp).toBe(actualIp)
    })

    it(`should return route to auth`, () => {
      expect(routes.auth).toBe(`${actualIp}/user/auth/`)
    })
  })
})
