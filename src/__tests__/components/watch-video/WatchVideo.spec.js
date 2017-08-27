import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import WatchVideo from '../../../components/watch-video/WatchVideo'
import videosData from '../../../mocked-data/_videosList'

import localStorage from 'mock-local-storage'
global.window = {}
window.localStorage = global.localStorage

describe.skip('<WatchVideo />', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((url, requestInfo) => {
      //const {username,password} = JSON.parse(requestInfo.body)

      return new Promise((resolve, reject) => {
        resolve({
          ok: true,
          Id: '123',
          json: function() {
            return {
              name: 'My Video',
              url: 'videos/my-video.mp4',
              ratings: [3, 4, 5, 1, 1],
              description: 'This is my video description to test it',
              _id: '12344321',
            }
          },
        })
      })
    })
  })
  const video = {
    name: 'My Video',
    url: 'videos/my-video.mp4',
    ratings: [3, 4, 5, 1, 1],
    description: 'This is my video description to test it',
    _id: '12344321',
  }
  window.localStorage.setItem('auth-token', '1312131')
  window.localStorage.setItem('username', 'testUser')

  describe('Rendering...', () => {
    it('should render a WatchVideo component', () => {
      const component = mount(
        <WatchVideo params={{ id: '111' }} video={video} videos={videosData} />,
      )
      expect(component).toHaveLength(1)
    })
    /* it('should render RelatedVideos Child', () => {
      const component = mount(
        <WatchVideo video={video}  />,
      )
      component.setState({videosList})
      expect(component.children().find('#RelatedVideo').length).toEqual(1)
    }) */
  })

  /*   describe('Default Props', () => {
    it('should had default prop "videos" equals an empty array', () => {
      const component = shallow(<WatchVideo video={video} />)
      expect(component.instance().props.videos.length).toEqual(0)
    })
  })
 */
})
