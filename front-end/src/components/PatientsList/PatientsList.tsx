import React, { useState, useCallback } from 'react'
import { Paper } from '@material-ui/core'
import { useDispatch, useSelector, shallowEqual as equal } from 'react-redux'
import { RootState } from '../../types/store'
import { sagaGetUsers } from '../../store/user/actions'
import PatientsTable from './PatientsTable'
import PatientsHeader from './PatientsHeader'
import PatientsFooter from './PatientsFooter'

import PatientManageForm from '../PatientManageForm'
import PatientDeleteForm from '../PatientDelete'

import Modal from '../Modal'


const PatientsList: React.FC = () => {
  const dispatch = useDispatch()
  const [dialogs, setDialogStatus] = useState({
    update: { open: false, patient: undefined },
    delete: { open: false, patient: undefined },
    create: { open: false }
  })

  const patients = useSelector((state: RootState) => {
    return state.user.list.data
  }, equal)
  
  const pagination = useSelector((state: RootState) => {
    return state.user.list.pagination
  }, equal)



  const showCreateDialog = useCallback(() => {
    setDialogStatus({ ...dialogs, create: { open: true }})
  }, [])

  const showUpdateDialog = useCallback(patient => {
    setDialogStatus({ ...dialogs, update: { open: true, patient }})
  }, [])

  const showDeleteDialog = useCallback(patient => {
    setDialogStatus({ ...dialogs, delete: { open: true, patient }})
  }, [])



  const hideCreateDialog = useCallback((status: boolean) => {
    setDialogStatus({ ...dialogs, create: { open: false }})

    if (status) {
      dispatch(sagaGetUsers(pagination))
    }
  }, [])

  const hideUpdateDialog = useCallback((status: boolean) => {
    setDialogStatus({ ...dialogs, update: { open: false, patient: undefined }})

    if (status) {
      dispatch(sagaGetUsers(pagination))
    }
  }, [])

  const hideDeleteDialog = useCallback((status: boolean) => {
    setDialogStatus({ ...dialogs, delete: { open: false, patient: undefined }})

    if (status) {
      dispatch(sagaGetUsers(pagination))
    }
  }, [])



  const updatePage = useCallback((page: number) => {
    dispatch(sagaGetUsers({ ...pagination, page: page + 1 }))
  }, [])

  const updateSearchQuery = useCallback((search: string) => {
    dispatch(sagaGetUsers({ ...pagination, search }))
  }, [])

  console.log('render list')

  return (
    <>
      <Paper>
        <PatientsHeader
          query={pagination.search}
          onSearchQueryUpdate={updateSearchQuery}
          onCreatePatient={showCreateDialog}
        />
        <PatientsTable
          patients={patients}
          onDeletePatient={showDeleteDialog}
          onUpdatePatient={showUpdateDialog}
        />
        <PatientsFooter
          page={pagination.page - 1}
          total={pagination.total}
          pageChange={updatePage}
        />
      </Paper>

      <Modal title="Добавить пациента" open={dialogs.create.open}>
        <PatientManageForm onClose={hideCreateDialog}/>
      </Modal>

      <Modal title="Изменить данные пациента" open={dialogs.update.open}>
        <PatientManageForm patient={dialogs.update.patient} onClose={hideUpdateDialog}/>
      </Modal>

      <Modal title="Удалить данные о пациенте" open={dialogs.delete.open}>
        <PatientDeleteForm patient={dialogs.delete.patient} onClose={hideDeleteDialog}/>
      </Modal>
    </>
  )
}

export default PatientsList
