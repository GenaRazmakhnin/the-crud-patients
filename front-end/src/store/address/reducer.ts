import { SET_ADDRESSES, SetAddresses, AddressesDataList } from '../../types/address'

interface State {
  list: AddressesDataList
}

const initialState: State = {
  list: { data: [] }
}

function addressReducer(state = initialState, action: SetAddresses) {
  switch (action.type) {
    case SET_ADDRESSES: {
      return { ...state, list: { ...state.list, ...action.payload } }
    }

    default:
      return state
  }
}

export default addressReducer