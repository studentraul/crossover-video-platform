import React from 'react'
import Logout from '../../../components/logout/Logout'

import { mount } from 'enzyme'
import localStorage from 'mock-local-storage'
global.window = {}
window.localStorage = global.localStorage

window.localStorage.setItem('auth-token', '123123')

describe('<Logout />', () => {
  describe('Rendering...', () => {
    beforeAll(() => {
      global.fetch = jest.fn().mockImplementation((url, requestInfo) => {
        return new Promise((resolve, reject) => {
          resolve({
            ok: true,
            Id: '123',
            json: function() {
              return {
                status: 'success',
              }
            },
          })
        })
      })
    })

    const component = mount(<Logout />)

    it('should NOT render a Logout component', () => {
      expect(component.instance().render()).toBeNull()
    })
  })
})
