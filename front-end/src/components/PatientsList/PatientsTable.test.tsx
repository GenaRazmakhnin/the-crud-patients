import React from 'react'
import { shallow } from 'enzyme'
import PatientsTable from './PatientsTable'

const patient = {
  id: 0,
  firstname: 'firstname',
  lastname: 'lastname',
  middlename: 'middlename',
  number: '0000000000000000',
  address: {
    region: 'region',
    city: 'city',
    street: 'street', 
    house: 'house'
  },
  gender: 'male',
  dob: '5/5/2000',
}

test('renders without crashing', () => {
  shallow(<PatientsTable
    onDeletePatient={() => null}
    onUpdatePatient={() => null}
    patients={[patient]}
  />)
})
