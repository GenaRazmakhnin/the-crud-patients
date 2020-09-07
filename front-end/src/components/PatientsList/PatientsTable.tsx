import React, { memo } from 'react'
import {
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow
} from '@material-ui/core'

import { Patient, Address } from '../../../../common/types/entities'

import styles from './patients-list.module.scss'

interface Props {
  onDeletePatient: (patient: Patient) => void,
  onUpdatePatient: (patient: Patient) => void,
  patients: Array<Patient>
}

const PatientsTable: React.FC<Props> = ({ patients, onDeletePatient, onUpdatePatient }) => {
  const updatePatient = (patient: Patient) => {
    onUpdatePatient(patient)
  }

  const deletePatient = (patient: Patient) => {
    onDeletePatient(patient)
  }

  console.log('rendering table')

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Номер полиса ОМС</TableCell>
            <TableCell>Фамилия</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Отчество</TableCell>
            <TableCell>Адрес</TableCell>
            <TableCell>Дата рождения</TableCell>
            <TableCell/>
          </TableRow>
        </TableHead>

        <TableBody>
          {patients.map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>{(patient.number.match(/.{1,4}/g) || []).join(' ')}</TableCell>
              <TableCell>{patient.lastname}</TableCell>
              <TableCell>{patient.firstname}</TableCell>
              <TableCell>{patient.middlename}</TableCell>
              <TableCell>
                {(['region', 'city', 'street', 'house'] as Array<keyof Address>)
                  .map(key => patient.address[key]).join(', ')}
              </TableCell>
              <TableCell>
                {`${patient.dob} (${patient.gender === 'male' ? 'муж.' : 'жен.'})`}
              </TableCell>
              <TableCell>
                <div className={styles['row-actions']}>
                  <a className={styles['single-action']} onClick={() => updatePatient(patient)}>ред.</a>
                  <a className={styles['single-action']} onClick={() => deletePatient(patient)}>удалить</a>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


function equalitySensor(
  prev: Readonly<React.PropsWithChildren<Props>>,
  next: Readonly<React.PropsWithChildren<Props>>
): boolean {
  console.log('default', prev===next)
  console.log('patients', prev.patients === next.patients)
  console.log('onDeletePatient', prev.onDeletePatient === next.onDeletePatient)
  console.log('onUpdatePatient', prev.onUpdatePatient === next.onUpdatePatient)

  return false
}

export default memo(PatientsTable)