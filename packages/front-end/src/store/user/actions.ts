import { Patient } from '@the-patients-crud/common/types/entities'
import { Pagination } from '@the-patients-crud/common/types/helper'
import {
  SAGA_GET_USERS, SAGA_CREATE_USER, SAGA_UPDATE_USER, SAGA_DELETE_USER, SET_USERS,
  SagaGetUsers, SagaCreateUser, SagaUpdateUser, SagaDeleteUser, SetUsers,
  PatientsDataList
} from '../../types/user'

export function sagaGetUsers(payload: Pagination): SagaGetUsers {
  return {
    type: SAGA_GET_USERS,
    payload: { pagination: payload }
  }
}

export function setUsers(payload: PatientsDataList): SetUsers {
  return {
    type: SET_USERS,
    payload
  }
}

export function sagaCreateUser(patient: any, callback: any): SagaCreateUser {
  return {
    type: SAGA_CREATE_USER,
    payload: { form: patient, callback }
  }
}

export function sagaUpdateUser(id: number, patient: any, callback: any): SagaUpdateUser {
  return {
    type: SAGA_UPDATE_USER,
    payload: { id, form: patient, callback }
  }
}

export function sagaDeleteUser(id: number, callback: any): SagaDeleteUser {
  return {
    type: SAGA_DELETE_USER,
    payload: { id, callback }
  }
}