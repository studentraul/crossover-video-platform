import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import RelatedVideos from '../../../components/watch-video/RelatedVideos'
import videosData from '../../../mocked-data/_videosList'

describe('<RelatedVideos />', () => {
  const video = {
    name: 'My Video',
    url: 'videos/my-video.mp4',
    ratings: [3, 4, 5, 1, 1],
    description: 'This is my video description to test it',
    _id: '12344321',
  }

  describe('Rendering...', () => {
    it('should render a RelatedVideos component', () => {
      const component = mount(<RelatedVideos video={video} />)
      expect(component).toHaveLength(1)
    })
    it('should render a 3 Video Component inside RelatedVideos', () => {
      const component = mount(
        <RelatedVideos video={video} videos={videosData} />,
      )
      expect(component.children().find('.video').length).toEqual(3)
    })
  })

  describe('Default Props', () => {
    it('should had default prop "videos" equals an empty array', () => {
      const component = shallow(<RelatedVideos video={video} />)
      expect(component.instance().props.videos.length).toEqual(0)
    })
  })
})
