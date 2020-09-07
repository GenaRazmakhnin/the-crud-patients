import React from 'react'
import { useDispatch } from 'react-redux'
import { sagaGetUsers } from '../../store/user/actions'
import PatientsList from '../../components/PatientsList'
import style from './patient-list-page.module.scss'

const PatientsPage: React.FC = () => {
  const dispatch = useDispatch()

  dispatch(sagaGetUsers({ limit: 10, page: 1 }))

  console.log('render page')

  return (
    <div className={style['container']}>
      <div className={style['patients-table']}>
        <PatientsList/>
      </div>
    </div>
  )
}

export default PatientsPage