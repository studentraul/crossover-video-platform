import React from 'react'
import InputGroup from '../../components/common/InputGroup'

import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

describe('<InputGroup />', () => {
  it('should render InputGroup element', () => {
    const component = shallow(<InputGroup name="myInput" />)
    expect(component.length).toEqual(1)
  })

  describe('Test props', () => {
    it('should throw error message when try to render a InputGroup component without "name"', () => {
      const stub = sinon.stub(console, 'error')
      const component = mount(<InputGroup />)
      expect(stub.calledWithMatch(/marked as required/)).toBeTruthy()
    })

    it('should assume default Type when it not pass "type" prop', () => {
      const component = shallow(<InputGroup name="my-name" />)
      expect(component.instance().props.type).toBe('text')
    })

    describe('Check if component receives props', () => {
      const component = mount(
        <InputGroup
          name="myInput"
          cssClasses="my-class1 my-class2"
          placeholder="Hello World"
          onChange={() => console.log('Hi there')}
          type="email"
        />,
      )
      it('should has cssClasses and has the same value', () => {
        expect(component.instance().props.cssClasses).toBe(
          'my-class1 my-class2',
        )
        expect(component.find('input').hasClass('my-class1')).toBeTruthy()
        expect(component.find('input').hasClass('my-class2')).toBeTruthy()
      })
      it('should has placeholder', () => {
        expect(component.instance().props.placeholder).toBe('Hello World')
        expect(component.find('input').getDOMNode().placeholder).toBe(
          'Hello World',
        )
      })
      it('should has onChange', () => {
        expect(component.instance().props.onChange).toBeInstanceOf(Function)
      })
      it('should has type', () => {
        expect(component.instance().props.type).toBe('email')
        expect(component.find('input').getDOMNode().type).toBe('email')
      })
    })
  })
})
