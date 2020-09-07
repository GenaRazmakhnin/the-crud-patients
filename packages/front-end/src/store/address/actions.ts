import { SagaGetAddresses, SAGA_GET_ADDRESSES } from '../../types/address'

export function sagaGetAddressesList(payload: string): SagaGetAddresses {
  return {
    type: SAGA_GET_ADDRESSES,
    payload: { query: payload }
  }
}
