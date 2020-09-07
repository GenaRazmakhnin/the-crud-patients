import React from 'react';
import { render } from '@testing-library/react';
import PatientsFooter from './PatientsFooter';

test('renders learn react link', () => {
  const { getByText } = render(<PatientsFooter total={10} page={1} pageChange={(page) => null}/>)
  const linkElement = getByText(/10/i)
  expect(linkElement).toBeInTheDocument()
})