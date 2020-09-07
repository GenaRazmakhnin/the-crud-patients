import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Token 641314a85ef50504629047889c57fcea57ff1a1b'
  }
})

interface SagaGetAddresses {
  type: 'SAGA_GET_ADDRESSES_LIST'
  payload: { query: string }
}

async function getDadataSuggestions(query: string) {
  const rangeFrom = { value: 'region' }
  const rangeTo = { value: 'house' }

  try {
    const { data } = await axiosInstance.post(
      'suggest/address',
      { query: query, count: 3, from_bound: rangeFrom, to_bound: rangeTo }
    )

    return data.suggestions.map((address: any) => ({
      region: address.data.region_with_type,
      city: address.data.city,
      street: address.data.street_with_type || address.data.settlement_with_type,
      house: address.data.house
    }))
  }
  catch (error) {
    console.warn(error)

    return []
  }
}

function* getAddresses({ payload }: SagaGetAddresses) {
  console.log("SAGA RUN", payload)

  yield put({ type: 'SET_ADDRESSES', payload: { loading: true } })

  const suggestions = yield call(getDadataSuggestions, payload.query)

  yield put({ type: 'SET_ADDRESSES', payload: { data: suggestions, loading: false } })

}

function* getAddressesWatcher() {
  yield takeEvery('SAGA_GET_ADDRESSES', getAddresses)
}



export default getAddressesWatcher