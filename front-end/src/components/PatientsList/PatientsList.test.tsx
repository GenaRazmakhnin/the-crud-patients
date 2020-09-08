import React from 'react'
import { shallow } from "enzyme"
import { useDispatch, useSelector } from 'react-redux'
import PatientsList from './PatientsList'

const mockedPatientsList = { data: [], pagination: { total: 10, limit: 10, search: '' } }

jest.mock("react-redux", () => ({
  useSelector: jest.fn(fn => fn({user: { list: mockedPatientsList }})),
  useDispatch: () => jest.fn()
}))

describe('patients list cases:', () => {
  test('renders without crashing', () => {
    shallow(<PatientsList/>)
  })
})


