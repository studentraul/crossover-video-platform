import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import VideoWatch from '../../../components/watch-video/VideoWatch'

describe('<VideoWatch />', () => {
  const video = {
    name: 'My Video',
    url: 'videos/my-video.mp4',
    ratings: [3, 4, 5, 1, 1],
    description: 'This is my video description to test it',
    _id: '12344321',
  }

  it('should render a VideoWatch component', () => {
    const component = mount(<VideoWatch video={video} />)
    expect(component).toHaveLength(1)
  })

  test('Default Props', () => {
    const component = shallow(<VideoWatch />)

    it('should had default prop "rating" equals 0', () => {
      expect(component.instance().props.rating).toEqual(0)
    })

    it('should had default prop "video" with empty properties value', () => {
      const video = {
        _id: '',
        name: '',
        url: '',
        description: '',
        ratings: [],
      }

      expect(component.instance().props.video).toEqual(video)
    })

    it('should had default prop "isOpened" equals false', () => {
      expect(component.instance().props.isOpened).toBeFalsy()
    })
  })
})
