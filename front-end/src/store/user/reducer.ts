import { SET_USERS, SetUsers, PatientsDataList } from '../../types/user'

interface State {
  list: PatientsDataList,
  form: {}
}

const initialState: State = {
  list: { data: [], pagination: { total: 0, page: 1, limit: 10 } },
  form: {}
}

function userReducer(state = initialState, action: SetUsers) {
  switch (action.type) {
    case SET_USERS: {
      return { ...state, list: { ...state.list, ...action.payload } }
    }

    default:
      return state
  }
}

export default userReducer