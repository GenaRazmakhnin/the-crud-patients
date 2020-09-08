import React, { useState } from 'react'
import { Patient } from '../../../../common/types/entities'

import { useDispatch } from 'react-redux'
import { sagaDeleteUser } from '../../store/user/actions'

import Button from '@material-ui/core/Button'

import style from './patient-delete.module.scss'

interface Props {
  onClose: (status: boolean) => void,
  patient?: Patient
}

const PatientDelete: React.FC<Props> = ({ onClose, patient }) => {
  const dispatch = useDispatch()
  const [loading, changeLoadingStatus] = useState(false)

  if (!patient) return <span/>

  const onDeleteHandler = async () => {
    changeLoadingStatus(true)
    
    await new Promise((resolve, reject) => {
      dispatch(sagaDeleteUser(patient.id, { resolve, reject }))
    })
    
    changeLoadingStatus(false)
    onClose(true)
  }

  return (
    <div className={style['container']}>
      Вы уверены, что хотите удалить данные о пациенте:<br/>
      <b>{`"${patient.lastname} ${patient.firstname} ${patient.middlename}"?`}</b>

      <div className={style['bottom-buttons']}>
        <Button type="button" variant="contained" onClick={() => onClose(false)}>
          Отменить
        </Button>

        <Button onClick={onDeleteHandler} variant="contained" color="primary">
          {loading ? 'Удаление' : 'Удалить'}
        </Button>
      </div>
    </div>
  )
}

export default PatientDelete
