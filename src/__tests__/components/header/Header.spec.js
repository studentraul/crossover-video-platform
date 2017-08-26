import React from 'react'
import Header from '../../../components/header/Header'

import { shallow } from 'enzyme'

describe('<Header />', () => {
    it('should render a header component',() => {
        const component = shallow(<Header />)
        expect(component).toHaveLength(1)
    })
    
    it('should receive "username" as props',() => {
        const component = shallow(<Header username="Raul"/>)
        expect(component.instance().props.username).toBe('Raul')
    })

    it('should have default prop "username" with value "user" when is not receive as props',() => {
        const component = shallow(<Header/>)
        expect(component.instance().props.username).toBe('user')
    })
})
