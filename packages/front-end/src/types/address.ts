import { Address } from '@the-patients-crud/common/types/entities'
export const SET_ADDRESSES = 'SET_ADDRESSES'
export const SAGA_GET_ADDRESSES = 'SAGA_GET_ADDRESSES'

export interface AddressesDataList {
  data?: Array<Address>,
  loading?: boolean
}

export interface SagaGetAddresses {
  type: typeof SAGA_GET_ADDRESSES
  payload: { query: string }
}

export interface SetAddresses {
  type: typeof SET_ADDRESSES
  payload: AddressesDataList
}
