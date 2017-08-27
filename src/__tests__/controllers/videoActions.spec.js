import { calculateRating, getVideoUrl } from '../../controllers/VideoActions'

describe('Test Video Actions methods', () => {
  const actualIp = 'https://crossover-video-platform.herokuapp.com'
  describe('Calculate Rating function', () => {
    test('should return 2 when passed [2,2,2]', () => {
      expect(calculateRating([2, 2, 2])).toBe(2)
    })

    test('should return 0 when passed no args', () => {
      expect(calculateRating([0])).toBe(0)
    })
  })

  describe('get URL video', () => {
    test(`should return '${actualIp}/videos/How_does_Node.js_work.mp4' when passed 'videos/How_does_Node.js_work.mp4'`, () => {
      expect(getVideoUrl('videos/How_does_Node.js_work.mp4')).toBe(
        `${actualIp}/videos/How_does_Node.js_work.mp4`,
      )
    })
    test('should throw when passed any args', () => {
      function callFunction() {
        getVideoUrl()
      }
      expect(callFunction).toThrowError(/valid/)
    })
  })
})
