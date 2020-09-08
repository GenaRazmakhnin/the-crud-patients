import React from 'react'
import { shallow } from 'enzyme'
import PatientsHeader from './PatientsHeader'

test('renders without crashing', () => {
  shallow(<PatientsHeader
    query=""
    onCreatePatient={() => null}
    onSearchQueryUpdate={() => null}
  />)
})
