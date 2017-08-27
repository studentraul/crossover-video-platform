import React from 'react'
import Login from '../../../components/login/Login'

import { mount, shallow } from 'enzyme'

import { browserHistory } from 'react-router'

describe('<Login />', () => {
  describe('Rendering...', () => {
    const component = mount(<Login location={{ query: '' }} />)

    it('should render a Login component', () => {
      expect(component).toHaveLength(1)
    })

    it('should contains a input password', () => {
      const inputPassword = component.find('input[name="password"]')
      expect(inputPassword.length).toBe(1)
    })
    it('should contains a input username', () => {
      const inputUserName = component.find('input[name="username"]')
      expect(inputUserName.length).toBe(1)
    })

    it('should contains a ErrorSpan', () => {
      const errorComponent = component.find('.error-login')
      expect(errorComponent.length).toBe(1)
    })
  })
  describe('Check state params', () => {
    const component = shallow(<Login location={{ query: '' }} />)
    describe('Initial State', () => {
      it('should have "password" initial state empty', () => {
        expect(component.instance().state.password).toBe('')
      })
      it('should have "username" initial state empty', () => {
        expect(component.instance().state.username).toBe('')
      })

      it('should have "error" initial state empty', () => {
        expect(component.instance().state.error).toBe('')
      })
    })

    describe('Change state', () => {
      let component
      beforeEach(() => {
        component = mount(<Login location={{ query: '' }} />)
      })
      it('should change "password" state when change field', () => {
        const inputPassword = component.find('input[name="password"]')
        const newPassword = {
          target: {
            value: 'password',
          },
        }

        expect(inputPassword.props().value).toBe('')
        inputPassword.simulate('change', newPassword)

        expect(inputPassword.props().value).toEqual(newPassword.target.value)
      })

      it('should change "username" state when change field', () => {
        const inputUsername = component.find('input[name="username"]')
        const newUsername = {
          target: {
            value: 'my-test',
          },
        }

        expect(inputUsername.props().value).toBe('')
        inputUsername.simulate('change', newUsername)
        expect(inputUsername.props().value).toEqual(newUsername.target.value)
      })
    })

    /* it('should have default prop "username" with value "user" when is not receive as props',() => {
        const component = shallow(<Login/>)
        expect(component.instance().props.username).toBe('user')
      }) */
  })
})
