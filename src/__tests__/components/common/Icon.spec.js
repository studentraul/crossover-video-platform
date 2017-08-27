import React from 'react'
import { UserIcon, LockIcon } from '../../../components/common/Icons'

import { shallow, mount } from 'enzyme'

describe('<UserIcon />', () => {
  it('should render a UserIcon component', () => {
    const component = shallow(<UserIcon />)
    expect(component).toHaveLength(1)
  })

  it('should render a SVG element', () => {
    const component = mount(<UserIcon />)
    expect(component.find('svg').exists()).toBeTruthy()
  })

  it('should possible to pass class', () => {
    const component = mount(<UserIcon classList="my-personal-class" />)
    expect(component.props().classList).toBe('my-personal-class')
  })

  it('should insert class into SVG', () => {
    const component = mount(<UserIcon classList="my-personal-class" />)
    expect(component.hasClass('my-personal-class')).toBeTruthy()
  })
})

describe('<LockIcon />', () => {
  it('should render a LockIcon component', () => {
    const component = shallow(<LockIcon />)
    expect(component).toHaveLength(1)
  })

  it('should render a SVG element', () => {
    const component = mount(<LockIcon />)
    expect(component.find('svg').exists()).toBeTruthy()
  })

  it('should possible to pass class', () => {
    const component = mount(<LockIcon classList="my-personal-class" />)
    expect(component.props().classList).toBe('my-personal-class')
  })

  it('should insert class into SVG', () => {
    const component = mount(<LockIcon classList="my-personal-class" />)
    expect(component.hasClass('my-personal-class')).toBeTruthy()
  })
})
