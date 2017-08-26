import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import VideoHome from '../../../components/home/VideoHome'

describe('<VideoHome />', () => {
  const video = {
    //name: 'My Video',
    url: 'videos/my-video.mp4',
    ratings: [3, 4, 5, 1, 1],
    description: 'This is my video description to test it',
    _id: '12344321',
  }

  it('should render a VideoHome component', () => {
    const component = mount(<VideoHome video={video} />)
    expect(component).toHaveLength(1)
  })
  /* 
    it('should receive "username" as props',() => {
        const component = shallow(<VideoHome username="Raul"/>)
        expect(component.instance().props.username).toBe('Raul')
    })

    it('should have default prop "username" with value "user" when is not receive as props',() => {
        const component = shallow(<VideoHome/>)
        expect(component.instance().props.username).toBe('user')
    }) */
})
