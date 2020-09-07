import { Patient } from '../../../common/types/entities'
import { Pagination } from '../../../common/types/helper'

export const SET_USERS = 'SET_USERS'
export const SAGA_GET_USERS = 'SAGA_GET_USERS'
export const SAGA_CREATE_USER = 'SAGA_CREATE_USER'
export const SAGA_UPDATE_USER = 'SAGA_UPDATE_USER'
export const SAGA_DELETE_USER = 'SAGA_DELETE_USER'

interface Callback {
  resolve: () => void,
  reject: () => void
}

export interface PatientsDataList {
  data: Array<Patient>,
  pagination: Pagination
}

export interface SagaGetUsers {
  type: typeof SAGA_GET_USERS
  payload: { pagination: Pagination }
}

export interface SagaCreateUser {
  type: typeof SAGA_CREATE_USER
  payload: { form: Patient, callback: Callback }
}

export interface SagaUpdateUser {
  type: typeof SAGA_UPDATE_USER
  payload: { id: number, form: Patient, callback: Callback }
}

export interface SagaDeleteUser {
  type: typeof SAGA_DELETE_USER
  payload: { id: number, callback: Callback }
}

export interface SetUsers {
  type: typeof SET_USERS
  payload: PatientsDataList
}
