import React from 'react'
import { shallow } from 'enzyme'
import PatientsFooter from './PatientsFooter'

test('renders without crashing', () => {
  shallow(<PatientsFooter total={10} page={1} pageChange={(page) => null}/>)
})
