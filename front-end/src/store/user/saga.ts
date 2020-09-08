import { all, call, put, takeEvery } from 'redux-saga/effects'
import { SagaGetUsers, SagaCreateUser, SagaUpdateUser, SagaDeleteUser } from '../../types/user'
import apiInstance from '../../api'

export function* getUsers({ payload }: SagaGetUsers, api:any = apiInstance) {
  const { pagination } = payload

  const query = [
    pagination.search && `search=${pagination.search}`,
    pagination.limit && `limit=${pagination.limit}`,
    pagination.page && `page=${pagination.page}`
  ]

  yield put({ type: 'SET_USERS', payload: { pagination } })

  const { data, pagination: incomingPagination } = yield call(
    api.get, `/patients?${query.filter(i => i).join('&')}`
  )

  yield put({ type: 'SET_USERS', payload: {
    data,
    pagination: { ...pagination, ...incomingPagination }
  }})
}

function* getUsersWatcher() {
  yield takeEvery('SAGA_GET_USERS', getUsers)
}



function* postUser({ payload }: SagaCreateUser, api:any = apiInstance) {
  const { form, callback } = payload

  yield call(api.post, '/patients', form)

  callback.resolve()
}

function* postUserWatcher() {
  yield takeEvery('SAGA_CREATE_USER', postUser)
}



function* putUser({ payload }: SagaUpdateUser, api:any = apiInstance) {
  const { form, id, callback } = payload

  yield call(api.patch, `/patients/${id}`, form)
  
  callback.resolve()
}

function* putUserWatcher() {
  yield takeEvery('SAGA_UPDATE_USER', putUser)
}



function* deleteUser({ payload }: SagaDeleteUser, api:any = apiInstance) {
  const { id, callback } = payload

  yield call(api.del, `/patients/${id}`)

  callback.resolve()
}

function* deleteUserWatcher() {
  yield takeEvery('SAGA_DELETE_USER', deleteUser)
}



function* rootWatcher() {
  yield all([
    putUserWatcher(),
    getUsersWatcher(),
    postUserWatcher(),
    deleteUserWatcher()
  ])
}



export default rootWatcher