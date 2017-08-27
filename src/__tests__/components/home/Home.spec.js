import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import Home from '../../../components/home/Home'

describe('<Home />', () => {
  it('should render a VideoHome component', () => {
    const component = shallow(<Home/>)
    expect(component.length).toBe(1)
  })
})
