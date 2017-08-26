import React from 'react'
import ErrorSpan from '../../components/common/ErrorSpan'

import { shallow } from 'enzyme'

describe('<ErrorSpan />', () => {
    it('should render a header component',() => {
        const component = shallow(<ErrorSpan />)
        expect(component).toHaveLength(1)
    })
    
     it('should receive "message" as props',() => {
        const component = shallow(<ErrorSpan message="Error message"/>)
        expect(component.instance().props.message).toBe('Error message')
    })

    it('should have default prop "message" with empty value when is not receive as props',() => {
        const component = shallow(<ErrorSpan/>)
        expect(component.instance().props.message).toBe('')
    })
})
