import React from 'react'
import { shallow } from 'enzyme'
import { useDispatch } from 'react-redux'
import PatientDelete from './PatientDelete'

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

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn()
}))

test('renders without crashing', () => {
  shallow(<PatientDelete patient={patient} onClose={(page) => null}/>)
})
