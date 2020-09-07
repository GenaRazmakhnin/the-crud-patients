import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { RootState } from '../../types/store'
import { sagaGetUsers } from '../../store/user/actions'
import PatientsList from '../../components/patients-list'
import style from './patient-list-page.module.scss'
import Modal from '../../components/Modal'

import { Patient } from '@the-patients-crud/common/types/entities'

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