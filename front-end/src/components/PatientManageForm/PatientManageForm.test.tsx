import React from 'react'
import { shallow } from "enzyme"
import { useDispatch } from 'react-redux'
import PatientManageForm from './PatientManageForm'

jest.mock("react-redux", () => ({
  useSelector: jest.fn(fn => fn({ address: { list: [] }})),
  useDispatch: () => jest.fn()
}))

test('renders without crashing', () => {
  shallow(<PatientManageForm onClose={() => null}/>)
})
