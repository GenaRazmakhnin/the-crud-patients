import { expectSaga } from 'redux-saga-test-plan'
import { sagaGetUsers } from './actions'
import { getUsers } from './saga'

test('saga get users list', () => {
  const params = {limit: 10, page: 1}
  const response = { data: [], pagination: {...params, total: 0}}
  const api = { get: () => response }

  const query = [
    params.search && `search=${params.search}`,
    params.limit && `limit=${params.limit}`,
    params.page && `page=${params.page}`
  ]

  return expectSaga(getUsers, sagaGetUsers(params), api)
    .put({ type: 'SET_USERS', payload: { pagination: params } })
    .call(api.get, `/patients?${query.filter(i => i).join('&')}`)
    .put({ type: 'SET_USERS', payload: {
      data: response.data,
      pagination: response.pagination
    }})
    .run()
})
