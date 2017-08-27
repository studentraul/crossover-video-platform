import React from 'react'
import App from '../App'
import { shallow, mount } from 'enzyme'

import localStorage from 'mock-local-storage'
global.window = {}
window.localStorage = global.localStorage

describe('<App />', () => {
  describe('Rendering...', () => {
    const component = mount(<App> <main>Children</main> </App>)

    it('should rendered APP', () => {
      expect(component.length).toBe(1)
    })

    it('should have 2 children elements',() => {
      expect(component.children().length).toBe(2)
    })

    it('should have main element as a child',() => {
      expect(component.children().find('main').length).toBe(1)
    })
  })
  describe('Check Header', () => {
    it('should render a App component', () => {
      const username = 'testeName'
      window.localStorage.setItem('username', username)
      const component = mount(<App />)

      expect(component.children().props().username).toBe(username)
    })
  })
})
